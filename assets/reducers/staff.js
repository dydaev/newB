import REDUCER from '../consts';

const initialState = {
  users_list: [],
  user: [],
  checkAddingRole: false,
};

export default function update(state = initialState, action) {
  switch (action.type) {
    case REDUCER.STAFF_CHECKED_ADDING_ROLE:
      return Object.assign({}, state, {
        checkAddingRole: false,
      });
    case REDUCER.STAFF_CHECK_ADDING_ROLE:
      return Object.assign({}, state, {
        checkAddingRole: action.payload.type,
      });
    case REDUCER.STAFF_GET_USERS_LIST:
      return Object.assign({}, state, {
        users_list: action.payload.users,
      });
    case REDUCER.STAFF_GET_USER:
      return Object.assign({}, state, {
        user: action.payload.user,
      });
    case REDUCER.STAFF_GET_USER_TO_LIST:
      return Object.assign({}, state, {
        users_list: state.users_list.map(user =>
          user.id !== action.payload.user.id ?
          user : Object.assign({}, action.payload.user, { roles:  action.payload.user.Roles }),
        ),
      });
    default:
      return { ...state };
  }
}
