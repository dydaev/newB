const REDUCERS = {
    NEWS: {
        ADD: 'ADD_NEWS',
        DELETE: 'DELETE_NEWS'
    },
    WEATHE: {
        CHANGE_CITY: 'CHANGE_CITY'
    },
    AUTH: {
        IS_LOGGED: 'IS_LOGGED',
        NOT_LOGGED: 'NOT_LOGGED',
        LOGOUT: 'LOGOUT',
        LOGIN_SUCCESS: 'LOGIN_SUCCESS',
        LOGIN_FAILURE: 'LOGIN_FAILURE',
        CHANGE_HEAD_COLOR: 'CHANGE_HEAD_COLOR',
        MESSAGE: 'MESSAGE',
    }
};
export const INCREASE = 'INCREASE';
export const DECREASE = 'DECREASE';
export default REDUCERS;
