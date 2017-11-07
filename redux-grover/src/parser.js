import * as config from '../grover.config.js';

var fs = require('fs');
var path = require('path');
export const newLineChar  = process.platform === 'win32' ? '\r\n' : '\n';
export const dirSeparator = process.platform === 'win32' ? '\\' : '/';

export const setToFile = grover => {
  const str = grover.join(newLineChar);
  console.log(str);
  return false;
};

export const getGrover = fileName => {
  if (fs.existsSync(fileName)) {
    const file = fs.readFileSync(fileName, 'utf8');
    return file.split(newLineChar);
  }

  return false;
};

export const getObjectHeaderPosition = (grover, objectName) => {
  const headObjectPosition = grover.findIndex(lm =>
    new RegExp(`(\\s|\.)${objectName}(\\s|\=|\\(|\:)`).test(lm)
  );
  return headObjectPosition >= 0 ? headObjectPosition + 1 : false;
};

export const groverLength = (grover, groverName) =>
getObjectEndPosition(grover, groverName) - getObjectHeaderPosition(grover, groverName) + 1;

export const clearObjectInGrover = (grover, groverName) => {
  const _position = getObjectHeaderPosition(grover, groverName) - 1;
  const _length = groverLength(grover, groverName);
  if (_position >= 0 && _length >= 1) {
    grover.splice(_position, _length);
  }

  return grover;
};

export const preLineSpices = (grover, position) =>
  grover[position].match(/(^[\s]*)/g).toString();

export const update = (grover, objectName, objectBody) => {
  let positionUpdateObject = getObjectHeaderPosition(grover, objectName) - 1;
  if (positionUpdateObject >= 0) {
    grover = clearObjectInGrover(grover, objectName);
  } else {
    positionUpdateObject = nameAnalitic(grover, objectName);
  }

  const spices = preLineSpices(grover, positionUpdateObject);

  if (!Array.isArray(objectBody)) objectBody = [objectBody];

  objectBody.reverse();
  objectBody.forEach(newLine => grover.splice(positionUpdateObject, 0, spices + newLine));

  return grover;
};

export const getObject = (grover, objectName) =>
  grover.slice(
    getObjectHeaderPosition(grover, objectName) - 1,
    getObjectEndPosition(grover, objectName)
  );

const bordersOfObject  = [
  { type: 'ob1', face: '\\s+function\\s+[a-z0-9]+(\\s)*\\(', _start: '{', _end: '}' },
  { type: 'ob2', face: '\\s+const\\s+[a-z]+\\s*\\=\\s', _start: '{', _end: '}' },
  { type: 'ob3', face: '\\s+case\\s', _start: '(', _end: ')' },
  { type: 'arr1', face: '\\[', _start: '[', _end: ']' },
  { type: 'default', face: '', _start: '{', _end: '}' },
];

export const differentOfChar = (line, objectType) =>
(line.split(objectType._start).length - 1) -
(line.split(objectType._end).length - 1);

export const getObjectEndPosition = (grover, objectName) => {
  const objectHead = (getObjectHeaderPosition(grover, objectName) - 1);
  if (objectHead < 0) {
    console.log('did`nt find object name ', objectName);
    return false;
  }

  const objectType = bordersOfObject.find(({ face }) =>
    new RegExp(face, 'i').test(grover[objectHead])
  );

  // console.log(objectType.type);
  let diffSimb = 0;
  let inObj = (grover[objectHead].split(objectType._start).length === 2
  && grover[objectHead].split(objectType._end).length === 2);

  for (let ind = objectHead; ind < grover.length; ind++) {
    diffSimb = diffSimb + differentOfChar(grover[ind], objectType);
    inObj = inObj ? inObj : diffSimb > 0;
    if (inObj && diffSimb == 0)
      return ind + 1;
  }

  return false;
};

export const nameAnalitic = (grover, objectName) => {
  let position = 1;
  const res = grover.reduce((acc, lm, ind) => {
    let isFirstWord = false;
    const difference = objectName.split('_').filter((word, i) => {

      if (new RegExp('(\\s|_|\.)' + word + '(_|\\s|\:)').test(lm)) {
        isFirstWord = isFirstWord ? true : i === 0;
        return true;
      } else return false;
    });

    if (difference.length > acc && isFirstWord) {
      acc = difference.length;
      position = ind;
    }

    return acc;
  }, 0);
  return position;
};
