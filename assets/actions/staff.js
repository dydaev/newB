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
      if(data.type === 'users') {
        dispatch( action(
          REDUCERS.STAFF.GET_USERS_LIST,
          data.users
        ))
      }
    } else {
      console.log("What want wrong with getting users list.")
    }
  })
  .catch( error => {
    dispatch( action(
      REDUCERS.MAIN.SET_MAIN_ERR,
      'An error staff ' + error
    ))
  })
}
export const updateRoles = (data) => dispatch => {
  console.log(data);
  return Axios({
    method: 'post',
    url: '/staff/updateRoles',
    data: data
  })
  .then ( ({data, status})  => {
    if(status === 200){
      if(data.type === 'user') {
        dispatch(action(
          REDUCERS.STAFF.GET_USER_TO_LIST,
          data.user
        ))
      } else if (data.type === 'message') {
        console.log('Action staff message: ', data.message);
      }
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
      if(data.type === 'user') {
        dispatch( action(
          REDUCERS.STAFF.GET_USER,
          data.users
        ))
      } else if (data.type === 'message') {
        console.log("Not user, :", data.message);
      }
    } else {
      console.log("What want wrong with getting user.")
    }
  })
  .catch( error => console.log('An error staff . ', error))
}
