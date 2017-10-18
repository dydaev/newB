import REDUCERS from '../consts';

const initialState = {
  staff:{
    users_list: [],
    user: []
  }
}

export default function update(state = initialState, action) {

  console.log(`Try reduce staff action ${action.type} to `, action.payload);
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
    case REDUCERS.STAFF.GET_USER_TO_LIST:
      return Object.assign({}, state, {
        staff:{
          users_list: state.staff.users_list.map( user => {
            return user.id !== action.payload.id ?
            user :
            action.payload
          })
        }
      })

    default:
      return {...state};
  }
}
