import * as config from '../grover.config';
import * as pars from './parser';

var fs = require('fs');
var path = require('path');

const getPath = () =>
  config.mainPath + config.constsPath + config.dirSeparator + 'index.js'

export const deleteConst = name => {
  let grover = pars.getGrover(getPath());
  let constObj = pars.getObject(grover, config.constsName);

  if (pars.getObjectHeaderPosition(constObj, name) >= 0) {
    constObj = pars.clearObjectInGrover(constObj, name);
    grover = pars.update(grover, config.constsName, constObj);
    pars.setToFile(getPath(), grover);
  }
};

export const createConst = (constName) => {
  //TODO check if file empty, inpet in his initialState and mathod update with switch.

  let constFile = pars.getGrover(getPath());
  let reducerObj = pars.getObject(constFile, constName);

  const constLine = constName + ': \'' + constName + '\',';

  constFile = pars.update(constFile, constName, constLine);

  pars.setToFile(getPath(), constFile);
};
