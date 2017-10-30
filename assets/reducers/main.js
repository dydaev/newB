import REDUCERS from '../consts';

const initialState = {
    roles:{
      admin: 'Editor sections roles for users',
      publisher: 'Editior themes for sections',
      writer: 'Editor papers for sections',
      user: 'Reade all'
    },
    sections: {}
}

export default function update(state = initialState, action) {

  console.log(`Try reduce Main action ${action.type} to `, action.payload, " state:", state);

  switch (action.type) {
    case REDUCERS.MAIN.UPDATE_SECTIONS:
      return Object.assign({}, ...state, {
          sections: action.payload
      })

    default:
      return {...state};
  }
}
