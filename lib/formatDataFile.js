/**
 * project JSDoc description
 * @module {Object} module name
 * @version 1.0.0
 * @author author name
 * @requires dependency 1
 * @requires dependency 2
 * ...
 */

"use strict";

//================================================================================
// dependencies
//================================================================================
const Promise = global.Promise = require("bluebird");
const parser = require("@fast-csv/parse");
const fs = require("fs-extra");
const { resolve, reject } = require("bluebird");
//================================================================================
// config
//================================================================================
/** import here configurations */

//================================================================================
// aliases
//================================================================================
/** declare here local variables aliasing some of often used imports / conf options */

//================================================================================
// module
//================================================================================
module.exports.parseFile = function parseFile(fileAbsolutePath) {
    return new Promise((resolve, reject) => {
        return Promise.try(() => {
            const allRows = [];
            const fileStream = fs.createReadStream(fileAbsolutePath);
            parser.parseStream(fileStream, {headers: true,})
                .on("error", (error) => { throw error; })
                .on("data", (row) => {allRows.push(row);})
                .on("end", () => {
                    return Promise.all(allRows).then((data) => {
                        return resolve(data);
                    });
                });
        });
    });
    
};