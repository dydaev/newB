import REDUCER from '../consts';

const initialState = {
  TTTTTTT: false,
  elements: [],
  selectedElement: {},
  users_list: [],
  user: [],
  checkAddingRole: false,
};

export default function update(state = initialState, action) {
  switch (action.type) {
    case REDUCER.STAFF_SET_ELEMENT_DESCRIPTION:
      return Object.assign({}, state, {
        selectedElement: {
          ...state.section,
          description: action.payload,
        },
      });
    case REDUCER.STAFF_SET_ELEMENT_NAME:
      return Object.assign({}, state, {
        selectedElement: {
          ...state.section,
          name: action.payload,
        },
      });
    case REDUCER.STAFF_UPDATE_THEME:
      return Object.assign({}, state, {
        elements: action.payload,
      });
    case REDUCER.STAFF_UPDATE_SECTION:
      return Object.assign({}, state, {
        elements: action.payload,
      });
    case REDUCER.STAFF_GET_ELEMENTS:
      return Object.assign({}, state, {
        elements: action.payload,
      });
    case REDUCER.STAFF_GET_SELECTED_THEME:
      return Object.assign({}, state, {
        selectedElement: action.payload,
      });
    case REDUCER.STAFF_GET_SELECTED_ELEMENT:
      return Object.assign({}, state, {
        selectedElement: action.payload,
      });
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
          user : action.payload.user,
        ),
      });
    default:
      return { ...state };
  }
}
