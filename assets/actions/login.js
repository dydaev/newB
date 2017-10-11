import REDUCERS from '../consts'
import Axios from 'axios';

const actionLogin = response  => {
  console.log(response);
    return {
        type: REDUCERS.AUTH.LOGIN ,
        payload: response
    }
}
export const login = (data) => dispatch => {
  // return Axios.post('/login/auth', JSON.parse(data))
  return Axios({
  method: 'post',
  url: '/login/auth',
  data: data
})
    .then ( response => dispatch( actionLogin(response.data)))
    .catch( error => console.log('An error login fatch. ', error))
}
