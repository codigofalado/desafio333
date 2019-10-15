
"use strict";

const arg = require("arg");
const scrape = require("../lib/scrape.js");
const util = require("util"); // Usado pela função util.inspect para depurar.
const fs = require("fs");


const args = arg({
	'--help':    Boolean,
	'--url':     String,
	'--file':    String,
	'--mode':    String,
	'--output':  String,
	'--no-time':    Boolean,

	// Aliases
	'-u':        '--url',
	'-f':        '--file',
	'-m':        '--mode',
	'-o':        '--output',
    }, {
    argv: process.argv.slice(2),
    permissive: false
    });

const mode = args["--mode"];
const output = args["--output"];

function doScrape(s, url) {
    if (output === "rawHtml") {
        console.log(s);
        return;
    }
    const startAt = new Date();
    let results;
    if (mode === "loose") {
        results = scrape.scrapeLoose(s, url);
    } else if (mode === "parse5") {
        results = scrape.scrape(s, url);
    } else {
        results = scrape.cheerioScrape(s, url);
    }
    const ms = new Date() - startAt;
    
    if (output === "json") {
        console.log(JSON.stringify(results));
    } else {
        console.log(util.inspect(results));
    }

    if (!args["--no-time"]) {
        console.log(`Elapsed: ${ms} ms`);
    }
}

if (mode && mode !== "parse5" && mode !== "cheerio" && 
    mode !== "loose") {
    console.error(`Error! Unknown mode "${mode}". Try running node ` +
        "bin/scrape.js --help to see the available modes.");
    process.exit(1);
} else if (output && output !== "debug" && output !== "json" && 
    output !== "rawHtml") {
    console.error(`Error! Unknown output "${output}". Try running node ` +
        "bin/scrape.js --help to see the available outputs.");
    process.exit(1);
}

function printHelp() {
    console.log(`
Usage: node bin/scrape.js [--url <http://abc.com> | --file <sample/Pudim.html>]
Options:
    * --help : This help.
    * --url  | -u  <url> : url pointing to html page to be scraped.
    * --file | -f <file> : file pointing to html page to be scraped.
    * --mode | -m <parse5|cheerio|loose>: parse5 is the default mode.
    *               The cheerio mode is slowest but has the nicest code.
    *               The loose mode uses htmlparser2 but doesn't pay too
    *               much attetion to the HTML structure and it's fastest.
    * --output | -o <debug|json|rawHtml>: debug is the default mode.
    * --no-time : Omit the elapsed time from the output.
    `);
}

if (args["--help"]) {
    printHelp();
} else if (args["--file"]) {
    let f = args["--file"];
    if (fs.existsSync(f)) {
        const s = fs.readFileSync(f, "utf8");
        doScrape(s, f);
    }
} else if (args["--url"]) {
    const request = require('request');
    // Normalize the URL so that it includes a trailing slash (/) at least.
    // E.g. from http://pudim.com.br to http://pudim.com.br/
    // This is used when normalizing image src that includes joining paths.
    const url = new URL(args["--url"]).toString(); 

    request(url, 
        (err, res, body) => {
        if (err) { 
            console.error(err);
            process.exit(1);
        } else if (res.statusCode === 200) {
            doScrape(body, url);
        } else {
            console.error("Error. Could not process the server response with " +
                `a status code of "${res.statusCode}"`);
            process.exit(1);
        }
      });
} else {
    printHelp()
}


