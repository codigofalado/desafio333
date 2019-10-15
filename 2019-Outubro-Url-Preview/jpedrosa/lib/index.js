
const scrape = require("./scrape.js");
const util = require("util"); // Usado pela função util.inspect para depurar.
const fs = require("fs");
const path = require("path");


// const sample = "Pudim.html";
// const sample = "Pudim2.html";
// const sample = "Pudim3.html";
// const sample = "Pudim4.html";
// const sample = "desc.html";
// const sample = "desc_fake.html";
// const sample = "og_galore.html";
// const sample = "og_galore2.html";
const sample = "Challenge_Stats-Desafio333-CodigoFalado.html";
// const sample = "nada.html";
// const sample = "empty_body.html";
// const sample = "empty_meta_content.html";
// const sample = "empty_image_src.html";
const fp = path.join(__dirname, `../sample/${sample}`);
let b = fs.readFileSync(fp, "utf8");
const startAt = new Date();
const results = scrape.scrapeLoose(fs.readFileSync(fp));
// const results = scrape.scrape(b);
// const results = scrape.cheerioScrape(b);


console.log(util.inspect(results));
console.log(`Elapsed: ${new Date() - startAt} ms`);

