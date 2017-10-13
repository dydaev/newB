import REDUCERS from '../consts';

const initialState = {
  login:{
    isLogin: false,
    newMessage: false,
    isUserAdded: false,
    headColor: 'head_color_blue',
    message: '',
    login: '',
    pass: '',
    isEmailValid: false
  }
}

export default function update(state = initialState, action) {
  let color;
  console.log(`Try updating action ${action.type} to `, action.payload);
  switch (action.type) {
    case REDUCERS.AUTH.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        login:{
          isLogin: true,
          name: action.payload
        }
      })
    case REDUCERS.AUTH.IS_VALID_EMAIL:
      return Object.assign({}, state, {
        login:{
          isEmailValid: action.payload.isEmailValid,
          message: action.payload.message || ''
        }
      })
    case REDUCERS.AUTH.ADD_NEW_USER:
      if (!action.payload.result) {
        color = 'head_color_red';
      } else {
        color = 'head_color_green';
      }
      return Object.assign({}, state, {
        login:{
          headColor: color,
          isUserAdded: action.payload.result,
          message: action.payload.message || ''
        }
      })
    case REDUCERS.AUTH.IS_LOGGED:
      return Object.assign({}, state, {
        login:{
          isLogin: true,
          name: action.payload
        }
      })
    case REDUCERS.AUTH.NOT_LOGGED:
      return Object.assign({}, state, {
        login:{
          isLogin: false,
          name: ''
        }
      })
    case REDUCERS.AUTH.LOGOUT:
      return Object.assign({}, state, {
        login:{
          isLogin: false,
          name: ''
        }
      })
    case REDUCERS.AUTH.LOGIN_FAILURE:
      return Object.assign({}, state, {
        login:{
          isLogin: false,
          name: ''
        }
      })
    case REDUCERS.AUTH.MESSAGE:
      if (action.payload === 'Wrong email or password!') {
        color = 'head_color_red';
      } else if (action.payload === 'Please enter email') {
        color = 'head_color_orange';
      }
      return Object.assign({}, state, {
        login:{
          headColor: color,
          newMessage: true,
          message: action.payload
        }
      })
    case REDUCERS.AUTH.CHANGE_HEAD_COLOR:
      return Object.assign({}, state, {
        login:{
          headColor: action.payload
        }
      })

    default:
      return {...state};
  }
}
