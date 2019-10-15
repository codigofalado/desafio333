
"use strict";

const arg = require("arg");
const util = require("util"); // Usado pela função util.inspect para depurar.
const request = require('request');


const args = arg({
	'--help':       Boolean,
	'--url':        String,
	'--server_url': String,
	'--mode':       String,
	'--output':     String,
	'--post_type':  String,

	// Aliases
	'-u':        '--url',
	'-s':        '--server_url',
	'-m':        '--mode',
	'-o':        '--output',
    }, {
    argv: process.argv.slice(2),
    permissive: false
    });

const post_type = args["--post_type"];
const mode = args["--mode"];
const output = args["--output"];
const url = args["--url"];
const server_url = args["--server_url"];


if (mode && mode !== "parse5" && mode !== "cheerio" && 
    mode !== "loose") {
    console.error(`Error! Unknown mode "${mode}". Try running node ` +
        "bin/scrape.js --help to see the available modes.");
    process.exit(1);
} else if (output && output !== "debug" && output !== "json") {
    console.error(`Error! Unknown output "${output}". Try running node ` +
        "bin/scrape.js --help to see the available outputs.");
    process.exit(1);
} else if ((url && !server_url) || (!url && server_url)) {
    console.error("Error! Both the url and server url need to be supplied at " +
        "the same time. Check the --help for more.");
    process.exit(1);
} else if (post_type && post_type !== "json" &&  post_type !== "form") {
    console.error(`Error! Unknown post_type "${post_type}". Try running node ` +
        "bin/scrape.js --help to see the available options.");
    process.exit(1);
}

function printHelp() {
    console.log(`
Usage: node bin/scrape.js --server_url http://xyz.com/scrape --url <http://abc.com>
Options:
    * --help : This help.
    * --url  | -u  <url>: url pointing to html page to be scraped.
    * --server_url | -s  <server url>: url that will receive the post request.
    *               It will receive the url and mode as parameters.
    * --mode | -m <parse5|cheerio|loose>: parse5 is the default mode.
    *               The cheerio mode is slowest but has the nicest code.
    *               The loose mode uses htmlparser2 but doesn't pay too
    *               much attetion to the HTML structure and it's fastest.
    * --output | -o <debug|json>: debug is the default mode.
    * --post_type <json|form>: The type of the post request. json or form, with
    *               form being a standard HTML form with the response body
    *               being a string. Whereas json returns a json object straight
    *               away.
    `);
}

function requestCallback(err, res, body) {
    if (err) { 
        console.error(err);
        process.exit(1);
    } else if (res.statusCode === 200) {
        let o = body;
        if (typeof o === "string") {
            o = JSON.parse(o);
        }
        if (output === "json") {
            console.log(JSON.stringify(o));
        } else {
            console.log(util.inspect(o));
        }
    } else {
        console.error("Error. Could not process the server response with " +
            `a status code of "${res.statusCode}"`);
        process.exit(1);
    }
}

if (args["--help"]) {
    printHelp();
} else if (server_url) {
    let params = {url: url};
    if (mode) {
        params["mode"] = mode;
    }
    if (post_type === "form") {
        request.post({url: server_url, form: params}, requestCallback);
    } else {
        request.post({url: server_url, json: params}, requestCallback);
    }
} else {
    printHelp()
}


