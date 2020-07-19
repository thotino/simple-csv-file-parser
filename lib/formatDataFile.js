/**
 * project JSDoc description
 * @module {Object} module name
 * @version 1.0.0
 * @author Thotino GOBIN-GANSOU
 * @requires bluebird
 * @requires fast-csv/parse
 * @requires fs-extra
 */

"use strict";

//================================================================================
// dependencies
//================================================================================
const Promise = global.Promise = require("bluebird");
const parser = require("@fast-csv/parse");
const fs = require("fs-extra");

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
/**
 * @function parseFile
 * @description Read a file as a stream, parse and returns an array of objects
 * @param {String} fileAbsolutePath
 * @param {String} columnsSeparator
 * @returns {*} - a promise of array of objects
 */
module.exports.parseFile = function parseFile(fileAbsolutePath, columnsSeparator = ";") {
  return new Promise((resolve, reject) => {
    return Promise.try(() => {
      const allRows = [];
      const fileStream = fs.createReadStream(fileAbsolutePath);
      parser.parseStream(fileStream, {headers: true, delimiter: columnsSeparator})
        .on("error", (error) => { throw error; })
        .on("data", (row) => { allRows.push(row); })
        .on("end", () => {
          return Promise.all(allRows).then((data) => {
            return resolve(data);
          });
        });
    });
  });
};
