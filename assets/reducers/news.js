import CONST from '../consts';

const initialState = [];

export default function news(state = initialState, action) {
    if (action.type === CONST.NEWS.ADD) {
        return [
            ...state,
            action.payload
        ];
    } else if (action.type === CONST.NEWS.DELETE) {
        return state;
    }
    return state;
}