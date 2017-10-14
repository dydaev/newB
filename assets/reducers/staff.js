import REDUCERS from '../consts';

const initialState = {
  staff:{
    users_list: []
  }
}

export default function update(state = initialState, action) {

  console.log(`Try updating staff action ${action.type} to `, action.payload);
  switch (action.type) {

    case REDUCERS.STAFF.GET_USERS_LIST:
      return Object.assign({}, state, {
        staff:{
          users_list: action.payload
        }
      })
    case REDUCERS.AUTH.GET_USER:
      return Object.assign({}, state, {
        staff:{
          user: action.payload
        }
      })

    default:
      return {...state};
  }
}
