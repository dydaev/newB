import REDUCERS from '../consts';

const initialState = {
  users_list: [],
  user: [],
};

export default function update(state = initialState, action) {
  switch (action.type) {
    case REDUCERS.STAFF_GET_USERS_LIST:
      return Object.assign({}, state, {
        users_list: action.payload.users,
      });
    case REDUCERS.STAFF_GET_USER:
      return Object.assign({}, state, {
        user: action.payload.user,
      });
    case REDUCERS.STAFF_GET_USER_TO_LIST:
      return Object.assign({}, state, {
        users_list: state.staff.users_list.map(user => {
          return user.id !== action.payload.id ?
          user : action.payload.user;
        }),
      });
    default:
      return { ...state };
  }
}
