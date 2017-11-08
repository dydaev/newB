import * as config from '../grover.config';
import * as pars from './parser';

var fs = require('fs');
var path = require('path');

const getPath = () =>
  config.mainPath + config.constsPath + config.dirSeparator + 'routes.js'

export const deleteRoute = name => {
  let grover = pars.getGrover(getPath());
  let routeObj = pars.getObject(grover, config.routsName);

  if (pars.getObjectHeaderPosition(routeObj, name) >= 0) {
    routeObj = pars.clearObjectInGrover(routeObj, name);
    grover = pars.update(grover, config.routsName, routeObj);
    pars.setToFile(getPath(), grover);
  }
};

export const createRoute = (constName, route) => {
  //TODO check if file empty, inpet in his initialState and mathod update with switch.

  let routeFile = pars.getGrover(getPath());
  let routeObj = pars.getObject(routeFile, config.routsName);

  const routeLine = constName + ': \'' + route + '\',';

  routeFile = pars.update(routeObj, constName, routeLine);

  pars.setToFile(getPath(), routeFile);
};
