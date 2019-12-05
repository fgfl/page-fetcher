/**
 * Dec 4, 2019
 * Frederick Lee
 */

const request = require('request');
const fs = require('fs');

const cliArgs = process.argv.slice(2);

const url = cliArgs[0];
const localFile = cliArgs[1];

console.log(cliArgs);

request(url, (error, response, body) => {
  fs.writeFile(localFile, body, (err) => {
    if (!err) {
      fs.stat('index.html', (err, stats) => {
        const fileSizeInBytes = stats.size;
        console.log(`Downloaded and saved ${fileSizeInBytes} bytes to ${localFile}`);
      });
    }
    
  });
});
