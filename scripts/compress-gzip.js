const zlib = require('zlib');
const fs = require('fs');
const path = require('path');

const compressGzip = (srcPath, destPath) => {
  const fileContents = fs.createReadStream(srcPath);
  const writeStream = fs.createWriteStream(destPath);
  const zip = zlib.createGzip();

  fileContents.pipe(zip).pipe(writeStream);
};

const compressDirectory = (dir) => {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    const gzPath = `${filePath}.gz`;

    if (fs.statSync(filePath).isDirectory()) {
      compressDirectory(filePath);
    } else {
      compressGzip(filePath, gzPath);
    }
  });
};

const buildDir = path.resolve(__dirname, '../dist');
compressDirectory(buildDir);

console.log('Gzip compression completed.');
