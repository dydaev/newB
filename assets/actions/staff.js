import REDUCERS from '../consts'
import Axios from 'axios';

const action = ( type, payload ) => {
console.log('Pushing staff action: ', type , ', -> ', payload);
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
export const getUsersList = () => dispatch => {
  return Axios.get('/staff/getUsersList')
  .then ( ({data, status})  => {
    if (status === 200) {
      console.log("users list_", data);
      // dispatch( action(
      //   REDUCERS.AUTH.LOGOUT,
      //   true
      // ))
    } else {
      console.log("What want wrong with getting users list.")
    }
  })
  .catch( error => console.log('An error staff . ', error))
}
export const getUser = (userId) => dispatch => {
  return Axios({
    method: 'post',
    url: '/staff/getUser',
    data: userId
  })
  .then ( ({data, status})  => {
    if (status === 200) {
      console.log("users list_", data);
      // dispatch( action(
      //   REDUCERS.AUTH.LOGOUT,
      //   true
      // ))
    } else {
      console.log("What want wrong with getting user.")
    }
  })
  .catch( error => console.log('An error staff . ', error))
}
