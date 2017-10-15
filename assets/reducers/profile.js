import REDUCERS from '../consts';

const initialState = {
  profile:{
    user_id: 0,
    user: []
  }
}

export default function update(state = initialState, action) {

  console.log(`Try reduce profile action ${action.type} to `, action.payload);
  switch (action.type) {

    case REDUCERS.PROFILE.SET_USER_ID:
      return Object.assign({}, state, {
        profile:{
          user_id: action.payload
        }
      })
    case REDUCERS.PROFILE.SUCCESS_USER_PROFILE:
      return Object.assign({}, state, {
        profile:{
          user: action.payload
        }
      })

    default:
      return {...state};
  }
}
