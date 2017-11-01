import REDUCERS from '../consts'
import ActionProto from './fatch';

export const change_head_color = ( colorClass ) => dispatch => {
  dispatch( ActionProto.getBody(
    REDUCERS.AUTH_CHANGE_HEAD_COLOR,
    colorClass
  ))
}
