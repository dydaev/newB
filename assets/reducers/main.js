import REDUCER from '../consts';

const initialState = {
    roles:{
      admin: 'Editor sections roles for users',
      publisher: 'Editior themes for sections',
      writer: 'Editor papers for sections',
      user: 'Reade all'
    },
    sections: {},
    isMessage: false,
    message: {
      color: '',
      message: ''
    }
}

export default function update(state = initialState, action) {

  switch (action.type) {
    case REDUCER.MAIN_GET_SECTIONS:
      return Object.assign({}, state, {
          sections: action.payload.sections
      })

    case REDUCER.MAIN_SET_MESSAGE:
      if(action.payload.type === 'message') {
        return Object.assign({}, state, {
          isMessage: true,
          message: { ...action.payload }
        })
      }
    case REDUCER.MAIN_CLOSE_MESSAGE:
      return Object.assign({}, state, {
          isMessage: false,
          message: {
            color: '',
            message: ''
          }
      })


    default:
      return {...state};
  }
}
