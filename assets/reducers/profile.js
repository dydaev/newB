import REDUCER from '../consts';

const initialState = {
  user_id: 0,
  user: [],
};

export default function update(state = initialState, action) {

  switch (action.type) {
    case REDUCER.PROFILE_SET_USER_ID:
      return Object.assign({}, state, {
        user_id: action.payload,
      });
    case REDUCER.GET_PROFILE_USER:
      return Object.assign({}, state, {
        user: action.payload.user,
      });

    default:
      return { ...state };
  }
}
