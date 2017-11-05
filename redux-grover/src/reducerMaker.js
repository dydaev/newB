import * as folder from '../grover.config';
import * as parserJSFile from './parser';

var fs = require('fs');
var path = require('path');

const constNameChar  = process.platform === 'win32' ? '\r\n' : '\n';
const dirSeparator = process.platform === 'win32' ? '\\' : '/';

export const createReducer = (constName, stateSelector) => {
  const fileName = constName.split('_')[0].toLowerCase();
  const constsPath = folder.mainPath + folder.reducersPath + dirSeparator + fileName + '.js';

  //TODO make scan dir for all reducers or read index file.
  const grover = parserJSFile.getGrover(constsPath);
  console.log('Open file ' + constsPath);
  const asa = 'initialState';
  console.log('start=', parserJSFile.getObjectHeaderPosition(grover, asa));
  console.log('end=', parserJSFile.getObjectEndPosition(grover, asa));
  console.log('object=', parserJSFile.getObject(grover, asa));

  // if (fs.existsSync(fileName)) {
  //   if (getObjectHeaderPosition(constsPath, 'update')) {
  //     if (!getObjectHeaderPosition(constsPath, 'STAFF_CHECKED_ADDING_ROLE')) {
  //
  //     }
  //   } else {
  //     console.log('no function update');
  //   }
  // }

  fs.exists(constsPath, (exists) => {
    if (exists) {
      console.log('Open file ' + constsPath);

      const file = fs.readFileSync(constsPath, 'utf8');
      const fileArr = file.split(constNameChar);
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
          let difference = constName.split('_').filter((word, i) => {
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
        fileArr.splice(position + 1, 0, `  ${constName}: '${constName}',`);
      }

      console.log(fileArr);
    } else {
      console.log('No file exist ' + constsPath);
      return false;
    }
  });
};
