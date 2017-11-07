import * as config from '../grover.config';
import * as pars from './parser';

var fs = require('fs');
var path = require('path');

export const createReducer = (constName, stateName) => {
  const fileName = constName.split('_')[0].toLowerCase();
  const reducerPath = config.mainPath + config.reducersPath + config.dirSeparator + fileName + '.js';

  //TODO check if file empty, inpet in his initialState and mathod update with switch.

  let grover = pars.getGrover(reducerPath);
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

  pars.setToFile(reducerPath, grover);
};
