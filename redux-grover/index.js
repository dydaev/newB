var constManager = require('./src/constMaker');
var routManager = require('./src/routMaker');
var reducerMaker = require('./src/reducerMaker');
import * as config from './grover.config';

// constManager.readFolder();

const reducer  = 'STAFF_ADD_NEW_ROLE';
//constManager.createConst(reducer);
//routManager.createRoute('/weathe?cyty=', reducer);
reducerMaker.createReducer(reducer, 'isRoleAdded');

//TODO generate shortcut command for symfony controller generator
// console.log(data);

// var consts = require('../assets/consts/index.js');
// import REDUCER from '../assets/consts/index';
// console.log(REDUCER);

// Object.keys(consts).forEach(val => console.log(val));
