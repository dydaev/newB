import * as config from '../grover.config';
import * as pars from './parser';

var fs = require('fs');
var path = require('path');

export const createConst = (constName) => {
  const constsPath = config.mainPath + config.constsPath + config.dirSeparator + 'index.js';

  //TODO check if file empty, inpet in his initialState and mathod update with switch.

  let constFile = pars.getGrover(constsPath);
  let reducerObj = pars.getObject(constFile, constName);

  const constLine = constName + ': \'' + constName + '\',';

  constFile = pars.update(constFile, constName, constLine);

  pars.setToFile(constsPath, constFile);
};
