"use strict";

const parsingModule = require("../index");
const path = require("path");

const fileAbsolutepath = path.resolve(__dirname, "data/TechCrunchcontinentalUSA.csv");

parsingModule.parseFile.parseFile(fileAbsolutepath).then((data) => {
    console.log("data : ", data);
})