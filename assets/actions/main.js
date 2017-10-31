import REDUCERS from '../consts';
import Axios from 'axios';

const action = ( type, payload ) => {
console.log('Pushing Main action: ', type , ', -> ', payload);
    return {
        type: type,
        payload: payload
    }
}

export const getSections = () => dispatch => {
  return Axios.get('/api/main/get=sections')
  .then ( ({data, status})  => {
    if (status === 200 && data.sections) {
      dispatch( action(
        REDUCERS.MAIN.UPDATE_SECTIONS,
        data.sections
      ))
    } else {
      dispatch( action(
        REDUCERS.MAIN.SET_MAIN_ERR,
        "Getting sections failed!!!"
      ))
    }
  })
}
export const closeErr = () => dispatch => {
    dispatch( action(
      REDUCERS.MAIN.CLOSE_MAIN_ERR,
      false
    ))
}
