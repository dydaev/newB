import CONST from '../consts';

const initialState = [];

export default function weathe(state = initialState, action) {
    if (action.type === CONST.WEATHE.CHANGE_CITY) {
        return [
            ...state,
            action.payload
        ];
    }
    return state;
}