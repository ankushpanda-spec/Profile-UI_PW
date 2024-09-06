/* eslint-disable @typescript-eslint/no-require-imports */
const {createGzip} = require('zlib');
const {
  createReadStream,
  createWriteStream,
  readdirSync,
  statSync,
} = require('fs');
const {join, resolve} = require('path');

const compressGzip = (srcPath, destPath) => {
  const fileContents = createReadStream(srcPath);
  const writeStream = createWriteStream(destPath);
  const zip = createGzip();

  fileContents.pipe(zip).pipe(writeStream);
};

const compressDirectory = dir => {
  readdirSync(dir).forEach(file => {
    const filePath = join(dir, file);
    const gzPath = `${filePath}.gz`;

    if (statSync(filePath).isDirectory()) {
      compressDirectory(filePath);
    } else {
      compressGzip(filePath, gzPath);
    }
  });
};

const buildDir = resolve(__dirname, '../dist');
compressDirectory(buildDir);

console.log('Gzip compression completed.');
