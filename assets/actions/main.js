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
      console.log("Getting sections failed!!!")
    }
  })
}
