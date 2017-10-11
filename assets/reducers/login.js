import REDUCERS from '../consts';

const initialState = {
  login:{
    isLogin: false,
    newMessage: false,
    headColor: 'head_color_blue',
    message: '',
    login: '',
    pass: ''
  }
}

export default function update(state = initialState, action) {
  switch (action.type) {
    case REDUCERS.AUTH.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        login:{
          isLogin: true,
          name: action.payload
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
      let color;
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
