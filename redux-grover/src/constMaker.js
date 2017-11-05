import * as folder from '../grover.config';

var fs = require('fs');
var path = require('path');
const ext = '.js';

export const createConst = newLine => {
  const constsPath = folder.mainPath + folder.constsPath + '/index.js';

  fs.exists(constsPath, (exists) => {
    if (exists) {
      console.log('Open file ' + constsPath);

      const newLineChar = process.platform === 'win32' ? '\r\n' : '\n';
      const file = fs.readFileSync(constsPath, 'utf8');
      const fileArr = file.split(newLineChar);
      const headConstPosition = fileArr.findIndex(lm => {
        return new RegExp('\\s' + folder.constsName + '(\\s|\=)').test(lm);
      });
      const firstObjectPosition = fileArr.findIndex(lm => new RegExp('{').test(lm));
      let position = headConstPosition >= 0 ? headConstPosition : firstObjectPosition;

      if (headConstPosition < 0) {
        fileArr.splice(
          firstObjectPosition - 1,
          0,
          '',
          `const ${folder.constsName} = {`,
          '};',
          `export default ${folder.constsName};`,
          ''
        );
        position = firstObjectPosition;
      } else {
        const res = fileArr.reduce((acc, lm, ind) => {
          let isFirstWord = false;
          let difference = newLine.split('_').filter((word, i) => {
            if (new RegExp('(\\s|_)' + word + '(_|\\s|\:)').test(lm)) {
              isFirstWord = isFirstWord ? true : i === 0;
              return true;
            }
            return false;
          });
          if (difference.length > acc && isFirstWord) {
            acc = difference.length;
            position = ind - 1;
          }
          return acc;
        }, 0);
      }
      if (position >= 0) {
        fileArr.splice(position + 1, 0, `  ${newLine}: '${newLine}',`);
      }

      console.log(fileArr);
    } else {
      console.log('No file exist ' + constsPath);
      return false;
    }
  });
};

export function readFolder() {
  fs.readdir(folder.mainPath, function (err, files) {
    if (err) return console.error(err);

    files.forEach(function (file) {
      if (path.extname(file) === ext) {
        console.log(file);
      }
    });
  });
}
