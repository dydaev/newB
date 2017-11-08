import * as config from '../grover.config';
import * as pars from './parser';

var fs = require('fs');
var path = require('path');

const getPath = constName => {
  const fileName = constName.split('_')[0].toLowerCase();
  return config.mainPath + config.reducersPath + config.dirSeparator + fileName + '.js';
};

export const deleteReducer = (constName, stateName) => {
  let grover = pars.getGrover(getPath(constName));
  let initObj = pars.getObject(grover, 'initialState');
  let updateObj = pars.getObject(grover, 'update');

  if (pars.getObjectHeaderPosition(initObj, stateName) >= 0) {
    initObj = pars.clearObjectInGrover(initObj, stateName);
    grover = pars.update(grover, 'initialState', initObj);
  }
  if (pars.getObjectHeaderPosition(updateObj, constName) >= 0) {
    updateObj = pars.clearObjectInGrover(updateObj, constName);
    grover = pars.update(grover, 'update', updateObj);
  }
  // console.log(grover);
  pars.setToFile(getPath(constName), grover);
};

export const createReducer = (constName, stateName) => {
  //TODO check if file empty, inpet in his initialState and mathod update with switch.

  let grover = pars.getGrover(getPath(constName));
  let initObj = pars.getObject(grover, 'initialState');
  let updateObj = pars.getObject(grover, 'update');

  const reducerArr = [
    `case REDUCER.${constName}:`,
    '  return Object.assign({}, state, {',
    `    ${stateName}: true,`,
    '  });',
  ];

  const initialConst = stateName + ': false,';

  updateObj = pars.update(updateObj, constName, reducerArr);
  initObj = pars.update(initObj, stateName, initialConst);
  grover = pars.update(grover, 'initialState', initObj);
  grover = pars.update(grover, 'update', updateObj);

  pars.setToFile(getPath(constName), grover);
};
