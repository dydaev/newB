import * as folder from '../grover.config';

var fs = require('fs');
var path = require('path');
const constNameChar  = process.platform === 'win32' ? '\r\n' : '\n';
const dirSeparator = process.platform === 'win32' ? '\\' : '/';

export const getGrover = fileName => {
  if (fs.existsSync(fileName)) {
    const file = fs.readFileSync(fileName, 'utf8');
    return file.split(constNameChar);
  }

  return false;
};

export const getObjectHeaderPosition = (grover, objectName) => {
  const headObjectPosition = grover.findIndex(lm =>
    new RegExp(`(\\s|\.)${objectName}(\\s|\=|\\(|\:)`).test(lm)
  );
  return headObjectPosition >= 0 ? headObjectPosition + 1 : false;
};

export const getObject = (grover, objectName) =>
  grover.slice(
    getObjectHeaderPosition(grover, objectName) - 1,
    getObjectEndPosition(grover, objectName)
  );

export const differentOfChar = (line, startChar, endChar) =>
  (line.split(startChar).length - 1) -
  (line.split(endChar).length - 1);

export const getObjectEndPosition = (grover, objectName) => {
  const objectHead = getObjectHeaderPosition(grover, objectName);
  let diffSimb = 0;
  let inObj = false;
  for (let ind = objectHead - 1; ind < grover.length; ind++) {
    diffSimb = diffSimb + differentOfChar(grover[ind], '{', '}');
    inObj = inObj ? inObj : diffSimb > 0;
    if (inObj && diffSimb == 0) return ind + 1;
  }
  return false;
};
