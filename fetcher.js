const request = require('request');
const fs = require('fs');

const url = process.argv[2];
const filePath = process.argv[3];

const fetcher = (url, filePath) => {
  request(url, (error, response, body) => {
    if (error) {
      console.error('Error:' error);
      return;
    }
    if (response.statusCode !== 200) {
      console.error('Invalid response:', response.statusCode);
      return;
    }

    fs.writeFile(filePath, body, (error) => {
      if (error) {
        console.error('Error writing file:', error);
        return;
      }

      fs.stat(filePath, (error, stats) => {
        if (error) {
          console.error('Error getting file size:', error);
          return;
        }

        console.log(`Downloaded and saved ${stats.size} bytes to ${filePath}`);
      });
    });
  });
};

fetcher(url, filePath);