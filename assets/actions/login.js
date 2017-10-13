import REDUCERS from '../consts'
import Axios from 'axios';

const action = ( type, payload ) => {
console.log('Pushing auth action: ', type , ', -> ', payload);
    return {
        type: type,
        payload: payload
    }
}

export const change_head_color = ( colorClass ) => dispatch => {
  dispatch( action(
    REDUCERS.AUTH.CHANGE_HEAD_COLOR,
    colorClass
  ))
}
export const logout = () => dispatch => {
  return Axios.get('/logout')
  .then ( ({status})  => {
    if (status === 200) {
      dispatch( action(
        REDUCERS.AUTH.LOGOUT,
        true
      ))
    } else {
      console.log("logout failed!!!")
    }
  })
}
export const logged_check = () => dispatch => {
  return Axios.get('/login/check/authorize')
  .then ( ({ data })  => {
    if (data.type === 'isLogged' && data.name ) {
      dispatch( action(
        REDUCERS.AUTH.IS_LOGGED,
        data.name
      ))
    } else if (data.type = 'isNotLogged') {
      dispatch( action(
        REDUCERS.AUTH.NOT_LOGGED,
        false
      ))
    } else {
      console.log("Logged fail, what want wrong(");
    }
  })
}
export const add_new_user = (data) => dispatch => {
  return Axios({
    method: 'post',
    url: '/login/add_user',
    data: data
  })
  .then ( ({ data })  => {
    if (data.result) {
      dispatch( action(
        REDUCERS.AUTH.ADD_NEW_USER,
        {
          result: data.result,
          message: data.message
        }
      ))
    } else {
      console.log("Add new user fail, what want wrong(. Result:", data);
    }
  })
  .catch( error => console.log('An error user add. ', error))
}
export const fatch_login = (data) => dispatch => {
  // return Axios.post('/login/auth', JSON.parse(data))
  return Axios({
    method: 'post',
    url: '/login/auth',
    data: data
  })
    .then ( response => {
      switch (response.data.type) {
        case 'isLogged':
        dispatch( action(
          REDUCERS.AUTH.LOGIN_SUCCESS,
          response.data.name
        ))
        break;
        case 'isNotLogged':
        dispatch( action(
          REDUCERS.AUTH.LOGIN_FAILURE,
          response.data.name
        ))
        break;
        case 'message':
        dispatch( action(
          REDUCERS.AUTH.MESSAGE,
          response.data.message
        ))
        break;

      }
    })
    .catch( error => console.log('An error login fatch. ', error))
}
export const validateEmail = (data) => dispatch => {
  return Axios({
    method: 'post',
    url: '/login/check/email',
    data: data
  })
    .then ( response => {
      if (response.data.type === 'message') {
        dispatch( action(
          REDUCERS.AUTH.IS_VALID_EMAIL, {
            isEmailValid: false,
            message: response.data.message
          }
        ))
      } else if (response.data.type === 'isValidEmail') {
        dispatch( action(
          REDUCERS.AUTH.IS_VALID_EMAIL, {
            isEmailValid: true
          }
        ))
      }
    })
    .catch( error => console.log('An error vlidation email. ', error))
}
