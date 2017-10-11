import REDUCERS from '../consts'
import Axios from 'axios';

const action = ( type, payload ) => {
console.log('Auth action: ', type , ', -> ', payload);
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
export const fatch_login = (data) => dispatch => {
  // return Axios.post('/login/auth', JSON.parse(data))
  return Axios({
    method: 'post',
    url: '/login/auth',
    data: data
  })
    .then ( response => {
      switch (response.data.type) {
        case 'name':
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
