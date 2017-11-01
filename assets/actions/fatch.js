import REDUCERS from '../consts';
import { ROUTES } from '../consts/routes';

import Axios from 'axios';

export const actionBody = (type, payload) =>
{
  return {
    type: type,
    payload: payload,
  };
};

export const getBackend = (type, uri, request = null) => {
  const method = request ?
  {
    method: 'post',
    url: uri,
    data: request,
  } : {
    method: 'get',
    url: uri,
  };

  //return Axios.get(uri)
  return Axios(method)
  .then(({ data, status }) => {
    if (status === 200 && data && data.type !== 'message') {
      return actionBody(type, data);
    } else if (status === 200 && data && data.type === 'message') {
      return actionBody(
        REDUCERS.MAIN_SET_MESSAGE,
        data
      );
    } else {
      return actionBody(
        REDUCERS.MAIN_SET_MESSAGE,
        {
          type: 'message',
          color: 'warning',
          message: 'What want wrong in ' + type + '!',
        }
      );
    }
  })
  .catch(error => {
    return actionBody(
      REDUCERS.MAIN_SET_MESSAGE,
      {
        type: 'message',
        color: 'danger',
        message: 'An error in ' + type + ':' + error,
      }
    );
  });
};

/**
*@param where string, CONSTANT or othen type action
*@param request multi, if where is in ROUTES request send to backend to ROUTES
* if routes is~nt request is payload for reducer.
*
*/
export const update = (where, request = null) => dispatch => {
  if (where in ROUTES) {
    getBackend(
      where,
      ROUTES[where],
      request
    ) .then(action => dispatch(action));
  } else {
    dispatch(actionBody(where, request));
  }
};
