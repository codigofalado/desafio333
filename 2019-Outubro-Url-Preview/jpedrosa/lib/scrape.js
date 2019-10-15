
"use strict";

const htmlparser2 = require("htmlparser2");
const parse5 = require("parse5");
const cheerio = require("cheerio");
const util = require("util"); // Usado pela função util.inspect para depurar.
const path = require("path"); // Usado pela função util.inspect para depurar.

// RegEx para checar o início do URL.
// Serve para testar se começa com http:// https:// file:///
const reURLStart = new RegExp("^([hH][tT][tT][pP][sS]?://|[fF][iI][lL][eE]:///)");

// Se o URL apontar para um arquivo, isto é, sem terminar com um slash (/),
// então esta função retornaria o diretório do arquivo.
function uriDir(url) {
    return url.endsWith("/") ? url : path.dirname(url);
}

// Une dois fragmentos de URL de forma a preservar ao máximo a estrutura
// restante.
function joinUri(a, b) {
    return (a.endsWith("/") || b.startsWith("/")) ? `${a}${b}` : `${a}/${b}`;
}

function doNormalizeSrc(src, url) {
    if (!url || reURLStart.test(src)) {
        return src;
    } else {
        return joinUri(url, src); //path.posix.join(url, src);
    }
}

// As imagens às vezes usam um caminho relativo, assim: ../dir/pict.png
// Na hora de usar realmente o link das imagens como no caso do thumbnail
// gerado a partir da primeira imagem, se faz necessário unir o caminho da URL
// ao fragmento do caminho da imagem. Por exemplo, no site pudim.com.br, a
// única imagem só tem um caminho "pudim.png". Na hora de colocar essa imagem
// no meu site de scraper o caminho ficaria quebrado. Assim que identifiquei
// o problema.
// 
// Esta função ajuda com o problema, produzindo o caminho mais completo das
// imagens. No caso do pudim.com.br ficaria http://pudim.com.br/pudim.png
function normalizeSrc(images, url) {
    if (url) {
        url = uriDir(url);
    } else {
        return;
    }
    for (let i = 0, len = images.length; i < len; i++) {
        images[i] = doNormalizeSrc(images[i], url);
    }
}

/**
 *  Esta função baseada na biblioteca Cheerio é semelhante a API de uma
 * biblioteca muito famosa chamada jQuery. Enquanto ela economiza no código
 * baseado em seletores de CSS, essas abstrações extras fazem com que ela
 * seja a mais lenta das apresentadas aqui.
 *
 * https://github.com/cheeriojs/cheerio
 *
 * @param {string} s - HTML string.
 * @param {string} url - URL string.
 */
function cheerioScrape(s, url) {
    let results = {};
    let images = [];
    let $ = cheerio.load(s);
    let me = $("title");
    if (me.length > 0) {
        results["title"] = me.text();
    }
    const pairs = [
        "meta[name=description]", "description",
        "meta[name=keywords]", "keywords",
        "meta[name=author]", "author",
        'meta[property="og:title"]', "og:title",
        'meta[property="og:description"]', "og:description",
        'meta[property="og:site_name"]', "og:site_name",
        'meta[property="og:image"]', "og:image"
        ];
    for (let i = 0; i < pairs.length; i += 2) {
        me = $(pairs[i]);
        if (me.length > 0) {
            results[pairs[i + 1]] = me.attr("content");
        }
    }
    $("img").each((_, e) => {
        if (e.attribs.src) {
            images.push(e.attribs.src);
        }
    });
    normalizeSrc(images, url);
    estampaThumbnail(results, images);
    return results;
}


/// Procura por elementos de imagem espalhados pelo body. Usa recursão para
/// isso.
function searchBody(el, images) {
    for (let childEl of el.childNodes) {
        if (childEl.tagName === "img") {
            for (let attr of childEl.attrs) {
                if (attr.name === "src") {
                    if (attr.value !== undefined) {
                        images.push(attr.value);
                    }
                }
            }
        } else if (childEl.childNodes !== undefined) {
            searchBody(childEl, images);
        }
    }
}


/**
 *  Esta função valida mais a árvore do HTML ao extair os dados, usando para
 * isso a biblioteca parse5. Ela chega a ser quase duas vezes mais lenta que
 * a função scrapeLoose que usa htmlparse5.
 *
 * https://github.com/inikulin/parse5/
 *
 * @param {string} s - HTML string.
 * @param {string} url - URL string.
 */
function scrape(s, url) {
    let results = {};
    let images = [];
    const tree = parse5.parse(s);
    // console.log(`tree ${util.inspect(tree)}`);
    for (let rootEl of tree.childNodes) {
        if (rootEl.tagName === "html") {
            for (let sectionEl of rootEl.childNodes) {
                if (sectionEl.tagName === "head") {
                    for (let el of sectionEl.childNodes) {
                        if (el.tagName === "title") {
                            if (el.childNodes.length > 0) {
                                results["title"] = el.childNodes[0].value;
                            }
                        } else if (el.tagName === "meta") {
                            let n;
                            let c;
                            let p;
                            for (let attr of el.attrs) {
                                if (attr.name === "name") {
                                    n = attr.value;
                                } else if (attr.name === "content") {
                                    c = attr.value;
                                } else if (attr.name === "property") {
                                    p = attr.value;
                                }
                            }
                            if (c !== undefined) {
                                if (n !== undefined) {
                                    if (n === "description" ||
                                        n === "keywords" ||
                                        n === "author") {
                                        results[n] = c;
                                    }
                                } else if (p !== undefined) {
                                    if (p === "og:title" ||
                                        p === "og:site_name" ||
                                        p === "og:description" ||
                                        p === "og:image") {
                                        results[p] = c;
                                    }
                                }
                            }
                        }
                    }

                } else if (sectionEl.tagName === "body") {
                    searchBody(sectionEl, images);
                }
            }
        }
    }

    normalizeSrc(images, url);
    estampaThumbnail(results, images);
    return results;
}

/**
 *  Esta função não se importa com a posição dos elementos no arquivo ou se
 * a árvore do HTML está bem formada. Ela é mais rápida assim.
 *
 * https://github.com/fb55/htmlparser2
 *
 * @param {bytes[]|string} s - HTML bytes ou string.
 * @param {string} url - URL string.
 */
function scrapeLoose(s, url) {
    let collectText = "";
    let results = {};
    let images = [];
    let openTitle = false;
    
    const parser = new htmlparser2.Parser({
        onopentag(name, attribs) {
            collectText = "";
            openTitle = false;
            if (name === "title") {
                openTitle = true;
            } else if (name === "meta") {
                const c = attribs.content;
                if (c !== undefined) {
                    const n = attribs.name;
                    const p = attribs.property;
                    if (n !== undefined) {
                        if (n === "description" || n === "keywords" ||
                            n === "author") {
                            results[n] = c;
                        }
                    } else if (p !== undefined) {
                        if (p === "og:title" || p === "og:site_name" ||
                            p === "og:description" || p === "og:image") {
                            results[p] = c;
                        }
                    }
                }
            } else if (name === "img") {
                if (attribs.src !== undefined) {
                    images.push(attribs.src);
                }
            }
        },
        ontext(text) {
            if (openTitle) {
                collectText += text;
            }
        },
        onclosetag(tagname) {
            if (openTitle) {
                results["title"] = collectText;
                openTitle = false;
            }
        }
        },
        { decodeEntities: true }
    );

    parser.write(s);
    parser.end();

    normalizeSrc(images, url);
    estampaThumbnail(results, images);
    return results;
}


/**
 *  Uma alternativa à imagem de thumbnail. Se og:image não existir, usa
 * a primeira imagem encontrada no body como thumbnail.
 *
 * @param {hashmap} results - Resultado do scrape em um hashmap.
 * @param {array} images - Imagens.
 */
function estampaThumbnail(results, images) {
    const ogimg = results["og:image"];
    if (ogimg) {
        results["thumbnail"] = ogimg;
    } else if (images.length > 0) {
        results["thumbnail"] = images[0];
    }
    if (images.length > 0) {
        results["images"] = images;
    }
}

module.exports.cheerioScrape = cheerioScrape;
module.exports.scrape = scrape;
module.exports.scrapeLoose = scrapeLoose;

