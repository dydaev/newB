const initialState = {
  Main:{
    roles:{
      admin: 'Editor sections roles for users',
      publisher: 'Editior themes for sections',
      writer: 'Editor papers for sections',
      user: 'Reade all'
    },
    sections: [
      'world',
      'sport',
      'tech',
      'busines',
      'movies',
      'culture',
      'books',
      'beauty',
      'blogs'
    ]
  }
}

export default function update(state = initialState, action) {
  return {...state};
}
