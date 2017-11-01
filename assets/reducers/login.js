import REDUCERS from '../consts';

const initialState = {
    isLogin: false,
    newMessage: false,
    isUserAdded: false,
    headColor: '',
    message: '',
    login: '',
    pass: '',
    isEmailValid: false
}

export default function update(state = initialState, action) {
  let color;
  switch (action.type) {
    case REDUCERS.AUTH_IS_VALID_EMAIL:
      if(action.payload.type === 'isValidEmail') {
        return Object.assign({}, state, {
          isEmailValid: true,
          message: ''
        });
      } else {
        return Object.assign({}, state, {
          isEmailValid: false,
          message: action.payload.text
        });
      }

    case REDUCERS.AUTH_ADD_NEW_USER:
      if (!action.payload.result) {
        color = 'head_color_red';
      } else {
        color = 'head_color_green';
      }
      return Object.assign({}, state, {
          headColor: color,
          isUserAdded: action.payload.result,
          message: action.payload.message || ''
      })
    case REDUCERS.AUTH_IS_LOGGED:
      if(action.payload.type === 'isLogged' && action.payload.name) {
        return Object.assign({}, state, {
            isLogin: true,
            name: action.payload.name
        })
      }
    case REDUCERS.AUTH_NOT_LOGGED:
      return Object.assign({}, state, {
          isLogin: false,
          name: ''
      })
    case REDUCERS.AUTH_LOGOUT:
      return Object.assign({}, state, {
          isLogin: false,
          name: ''
      })
    case REDUCERS.AUTH_LOGINING:
      switch (action.payload.type) {
        case 'isLogged':
          return Object.assign({}, state, {
              isLogin: true,
              name: action.payload.name
          })
          break;
        case 'isNotLogged':
          return Object.assign({}, state, {
              isLogin: false,
              name: ''
          })
          break;
        case 'message':
          if (action.payload === 'Wrong email or password!') {
            color = 'head_color_red';
          } else if (action.payload === 'Please enter email') {
            color = 'head_color_orange';
          }
          return Object.assign({}, state, {
              headColor: color,
              newMessage: true,
              message: action.payload
          })
      }

    case REDUCERS.AUTH_MESSAGE:
      if (action.payload === 'Wrong email or password!') {
        color = 'head_color_red';
      } else if (action.payload === 'Please enter email') {
        color = 'head_color_orange';
      }
      return Object.assign({}, state, {
          headColor: color,
          newMessage: true,
          message: action.payload
      })
    case REDUCERS.AUTH_CHANGE_HEAD_COLOR:
      return Object.assign({}, state, {
          headColor: action.payload
      })

    default:
      return {...state};
  }
}
