import REDUCER from '../consts';
import ActionProto from './fatch';

export const closeMessage = () => dispatch => {
  dispatch(ActionProto.getBody(
    REDUCER.MAIN_CLOSE_MESSAGE,
    false
  ));
};

export const setMessage = ( message, color ) => dispatch => {
  dispatch( ActionProto.getBody(
    REDUCER.MAIN_SET_MESSAGE,
    {
      type: 'message',
      message: message,
      color: color
    }
  ))
};
