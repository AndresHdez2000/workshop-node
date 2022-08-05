const puppeteer = require("puppeteer");
const fs = require("fs")

let results = {}




fs.writeFile("results.json", results, "utf8")