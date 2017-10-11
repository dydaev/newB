import REDUCERS from '../consts'
import Axios from 'axios';

const actionLogin = ( type, payload ) => {
  console.log(response);
    return {
        type: type ,
        payload: payload
    }
}

export const login = (data) => dispatch => {
  // return Axios.post('/login/auth', JSON.parse(data))
  return Axios({
    method: 'post',
    url: '/login/auth',
    data: data
  })
    .then ( response => {
      switch (response.data.type) {
        case 'name':
            dispatch( actionLogin(
              REDUCERS.AUTH.LOGIN_SUCCESS,
              response.data.name
            ))
          break;
        case 'isNotLogged':
            dispatch( actionLogin(
              REDUCERS.AUTH.LOGIN_FAILURE,
              response.data.name
            ))
          break;
        case 'message':
            dispatch( actionLogin(
              REDUCERS.AUTH.MESSAGE,
              response.data.message
            ))
          break;
      }
    })
    .catch( error => console.log('An error login fatch. ', error))
}
