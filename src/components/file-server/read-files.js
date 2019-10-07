
const path = require('path');
const fs = require('fs');

const directoryPath = path.join(__dirname, 'Documents');
fs.readdir(directoryPath, (err, files) => { // eslint-disable-line
  if (err) {
    return console.log(`Unable to scan directory: ${err}`); // eslint-disable-line
  }

  files.forEach((file) => {
    return file;
  });
});
