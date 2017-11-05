import * as folder from '../grover.config';

var fs = require('fs');
var path = require('path');
const ext = '.js';

export const createRoute = (route, routeConst) => {
  const routsPath = folder.mainPath + folder.constsPath + '/routes.js';

  fs.exists(routsPath, (exists) => {
    if (exists) {
      console.log('Open routs ' + routsPath);

      const newLineChar = process.platform === 'win32' ? '\r\n' : '\n';
      const file = fs.readFileSync(routsPath, 'utf8');
      const fileArr = file.split(newLineChar);
      let headConstPosition = fileArr.findIndex(lm => new RegExp('\\s' + folder.routsName + '(\\s|\=)').test(lm));
      const firstObjectPosition = fileArr.findIndex(lm => new RegExp('{').test(lm));
      let position = firstObjectPosition;

      if (headConstPosition < 0) {
        fileArr.splice(
          firstObjectPosition > 0 ? firstObjectPosition - 1 : 0,
          0,
          '',
          `const ${folder.routsName} = {`,
          '};',
          `export default ${folder.routsName};`,
          ''
        );
        position = firstObjectPosition > 0 ? firstObjectPosition : firstObjectPosition + 1;
      } else {
        const res = fileArr.reduce((acc, lm, ind) => {
          let difference = routeConst.split('_').filter(word => new RegExp(word).test(lm));
          if (difference.length > acc) {
            acc = difference.length;
            position = difference.length > 1 ? ind : ind - 1;
          }

          return acc;
        }, 0);
      }

      if (position >= 0) {
        fileArr.splice(position + 1, 0, `  ${routeConst}: '${route}',`);
      }

      console.log(fileArr);
    } else {
      console.log('No file exist ' + routsPath);
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
