import CONST from '../consts';

const initialState = {
    isAuthenticated: false
}

export default function authReducer(state = initialState , action)
{
    switch (action.type) {
        case CONST.AUTH.SUCCESS:
            return Object.assign({}, ...state, {
                isAuthenticated: true
            });
        case CONST.AUTH.FAIL:
            return Object.assign({}, ...state, {
                isAuthenticated: false
            });
        default:
            return state;
    }
}
