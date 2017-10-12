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
  return Axios.get('/login/check')
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
