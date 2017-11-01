import REDUCER from '../consts';
import ActionProto from './fatch';

export const setUserId = ( id ) => dispatch => {
  dispatch( ActionProto.getBody(
    REDUCER.PROFILE_SET_USER_ID,
    id
  ))
}
