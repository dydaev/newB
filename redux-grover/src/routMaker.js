import * as config from '../grover.config';
import * as pars from './parser';

var fs = require('fs');
var path = require('path');

export const createRoute = (constName, route) => {
  const routePath = config.mainPath + config.constsPath + config.dirSeparator + 'routes.js';

  //TODO check if file empty, inpet in his initialState and mathod update with switch.

  let routeFile = pars.getGrover(routePath);
  let routeObj = pars.getObject(routeFile, config.routsName);

  const routeLine = constName + ': \'' + route + '\',';

  routeFile = pars.update(routeObj, constName, routeLine);

  pars.setToFile(routePath, routeFile);
};
