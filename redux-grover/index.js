var constManager = require('./src/constMaker');
var routManager = require('./src/routMaker');
var reducerMaker = require('./src/reducerMaker');
import * as config from './grover.config';

// constManager.readFolder();

// const constName  = 'STAFF_DELETE_NEW_ROLE';
// const route = '/api?role=update';
// const stateName = 'isRoleDelete';
if (process.argv.length === 6) {
  const action = process.argv[2];
  const constName  = process.argv[3];
  const stateName = process.argv[4];
  const route = process.argv[5];

  console.log(process.argv[2]);
  if (action === 'UPDATE') {
    if (constName && route) routManager.createRoute(constName, route);
    if (constName) constManager.createConst(constName);
    if (constName && stateName) reducerMaker.createReducer(constName, stateName);
  } else if (action === 'DELETE') {
    if (constName && route) routManager.deleteRoute(constName);
    if (constName) constManager.deleteConst(constName);
    if (constName && stateName) reducerMaker.deleteReducer(constName, stateName);
    console.log('in process writing)');
  }
} else if (process.argv.length === 3) {
  if (process.argv[2] == '-h' ||
  process.argv[2] == '-help' ||
  process.argv[2] == '--h' ||
  process.argv[2] == '--help') {
    console.log("[UPDATE | DELETE] constName storeSelector route");
  }
} else {
  console.log('Not params, for example: UPDATE STAFF_UPDATE_ROLE isStaffUpdated /api?staff=update_role');
}

//TODO generate dispatch(action)
//TODO generate shortcut command for symfony controller generator
// console.log(data);

// var consts = require('../assets/consts/index.js');
// import REDUCER from '../assets/consts/index';
// console.log(REDUCER);

// Object.keys(consts).forEach(val => console.log(val));
