import REDUCERS from '../consts';

const initialState = {
  login:{
    isLogin: false,
    login: '',
    pass: ''
  }
}

export default function update(state = initialState, action) {
  switch (action.type) {

    case REDUCERS.AUTH.LOGIN:
      return {...state, login: { ...action.payload}}
      // return Object.assign({}, {...state}, login: { ...action.payload})

    default:
      return {...state};
  }
}
