import REDUCERS from '../consts'
import Axios from 'axios';

const action = ( type, payload ) => {
console.log('Pushing profile action: ', type , ', -> ', payload);
    return {
        type: type,
        payload: payload
    }
}

export const setUserId = ( id ) => dispatch => {
  dispatch( action(
    REDUCERS.PROFILE.SET_USER_ID,
    id
  ))
}
export const example = (a) => dispatch => {
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
  .catch( error => console.log('An error profile . ', error))
}
export const getUser = ( userId = null ) => dispatch => {
  return Axios({
    method: userId !== null ? 'post' : 'get',
    url: '/staff/getUser',
    data: {userId: userId}
  })
  .then ( ({data, status})  => {
    if (status === 200) {
      console.log("profile request data: ",data);
      if(data.type === 'user') {
        dispatch( action(
          REDUCERS.PROFILE.SUCCESS_USER_PROFILE,
          data.user
        ))
      } else if (data.type === 'message') {
        console.log("Not user, :", data.message);
      }
    } else {
      console.log("What want wrong with getting user.")
    }
  })
  .catch( error => console.log('An error profile . ', error))
}
