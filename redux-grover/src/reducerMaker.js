import * as folder from '../grover.config';
import * as pars from './parser';

var fs = require('fs');
var path = require('path');

const constNameChar  = process.platform === 'win32' ? '\r\n' : '\n';
const dirSeparator = process.platform === 'win32' ? '\\' : '/';

export const createReducer = (constName, stateSelector) => {
  const fileName = constName.split('_')[0].toLowerCase();
  const constsPath = folder.mainPath + folder.reducersPath + dirSeparator + fileName + '.js';

  const grover = pars.getGrover(constsPath);
  const obj = 'update';
  console.log('Open file ' + constsPath + 'with object ' + obj);
  //console.log('start=', pars.getObjectHeaderPosition(grover, obj));
  //console.log('end=', pars.getObjectEndPosition(grover, obj));

  let initState = pars.getObject(grover, obj);
  console.log(initState);

  initState = pars.update(initState, 'STAFF_GET_USER', ['NEW---LINE)','CINIMA']);
  console.log(initState);
};
