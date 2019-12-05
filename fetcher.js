/**
 * Dec 4, 2019
 * Frederick Lee
 */

const request = require('request');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


// prince file download and save message
const printSaveMsg = (err) => {
  if (!err) {
    fs.stat(localFile, (err, stats) => {
      const fileSizeInBytes = stats.size;
      console.log(`Downloaded and saved ${fileSizeInBytes} bytes to ${localFile}`);
    });
  }
};

// prompts user to save if exists, else save
const promptSave = (notExists, htmlBody) => {
  // console.log("promtSave:", notExists, htmlBody);
  if(!notExists) {
    rl.question(`The file ${localFile} exist. Do you want to overwrite it? (Y/N)`, ans => {
      if (ans.toUpperCase() === 'Y') {
        fs.writeFile(localFile, htmlBody, printSaveMsg);
      } else if (ans.toUpperCase() === 'N') {
        rl.close();
      } else {
        promptSave(exists);
      }
    });
  }

};

const saveWebsiteToFile = (err, httpResponse, htmlBody) => {
  fs.access(localFile, fs.constants.W_OK, (err) => promptSave(err, htmlBody));
};



// START EXECUTION
const cliArgs = process.argv.slice(2);

const url = cliArgs[0];
const localFile = cliArgs[1];

request(url, saveWebsiteToFile);