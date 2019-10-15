
"use strict";

const fastify = require('fastify')()
const scrape = require('./scrape')
const request = require('request')
const path = require('path')
const util = require('util')

// O Heroku configura a porta pela variável de ambiente PORT.
const PORT = process.env.PORT || 8333


// Plugin que habilita o sistema de template EJS.
fastify.register(require('point-of-view'), {
    engine: {
      ejs: require('ejs')
    }
});

// Plugin que lida com conteúdo de HTML form em serviços de método post.
fastify.register(require('fastify-formbody'));

fastify.post('/scrape', (req, reply) => {
    const b = req.body;
    if (b && b["url"]) {
        // Normalize the URL so that it includes a trailing slash (/) at least.
        // E.g. from http://pudim.com.br to http://pudim.com.br/
        // This is used when normalizing image src that includes joining paths.
        const url = new URL(b["url"]).toString(); 
        request(url, 
        (err, res, body) => {
        if (err) { 
            throw err;
            // console.error(err);
            // process.exit(1);
        } else if (res.statusCode === 200) {
            const mode = b["mode"];
            if (mode && mode !== "parse5" && mode !== "cheerio" && 
                mode !== "loose") {
                return; // Unknown mode. So just return.
            }
            if (mode === "loose") {
                reply.send(scrape.scrapeLoose(body, url));
            } else if (mode === "cheerio") {
                reply.send(scrape.cheerioScrape(body, url));
            } else {
                reply.send(scrape.scrape(body, url));
            }
        } else {
            throw "Error. Could not process the server response with " +
                `a status code of "${res.statusCode}"`;
            // console.error("Error. Could not process the server response with " +
            //     `a status code of "${res.statusCode}"`);
            // process.exit(1);
        }
      });

    }
});
  
// Página inicial.
fastify.get('/index.html', (req, reply) => {
    reply.view('/templates/index.html.ejs')
});

fastify.get('/', (req, reply) => {
    reply.view('/templates/index.html.ejs')
});


// Página de interface simples para o serviço de scraper.
fastify.get('/scrape', (req, reply) => {
    reply.view('/templates/scrape.ejs')
});

// Página de exemplo com imagens.
fastify.get('/frutas', (req, reply) => {
    const frutas = [
        "Banana", "banana_150.png",
        "Melancia", "melancia_150.png",
        "Uva", "uva_150.png",
    ];
    reply.view('/templates/frutas.ejs', { frutas: frutas })
});

// Plugin que lida com arquivos estáticos como favicon.ico automaticamente.
fastify.register(require('fastify-static'), {
    root: path.join(__dirname, '../static')
});

// Função de exemplo. Responde com uma string.
fastify.get("/string", (req, reply) => {
  reply.send("string goes here.");
});

// Função de exemplo. Responde com um objeto JSON.
fastify.get("/json", (req, reply) => {
    reply.send({JSON: 123, params: req.params, name: req.params["name"], headers: req.headers, what: "what", query: req.query});
  });
  
// Em alguns exemplos, o IP "0.0.0.0" é omitido. Por padrão, o Fastify usa
// o IP "127.0.0.1". Isso porque é mais seguro por não abrir o IP para a
// Internet toda. Mas quando a gente manda o servidor para um serviço
// remoto como o Heroku, se não "abrir" o IP colocando o "0.0.0.0" ou o que
// seja, não vai funcionar.
fastify.listen(PORT, "0.0.0.0", err => {
    if (err) {
        throw err;
    }
    console.log(`Server listening on ${fastify.server.address().port}`);
  })

