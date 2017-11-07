var constManager = require('./src/constMaker');
var routManager = require('./src/routMaker');
var reducerMaker = require('./src/reducerMaker');
import * as config from './grover.config';

// constManager.readFolder();

const constName  = 'STAFF_DELETE_NEW_ROLE';
const route = '/api?role=update';
const stateName = 'isRoleDelete';

if (constName && route) routManager.createRoute(constName, route);
if (constName) constManager.createConst(constName);
if (constName && stateName) reducerMaker.createReducer(constName, stateName);

//TODO generate dispatch(action)
//TODO generate shortcut command for symfony controller generator
// console.log(data);

// var consts = require('../assets/consts/index.js');
// import REDUCER from '../assets/consts/index';
// console.log(REDUCER);

// Object.keys(consts).forEach(val => console.log(val));
