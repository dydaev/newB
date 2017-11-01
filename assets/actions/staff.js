import REDUCER from '../consts'
import ActionProto from './fatch';

export const change_head_color = ( colorClass ) => dispatch => {
  dispatch( ActionProto.getBody(
    REDUCER.AUTH.CHANGE_HEAD_COLOR,
    colorClass
  ))
}
