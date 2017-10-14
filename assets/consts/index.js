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
        IS_VALID_EMAIL: 'IS_VALID_EMAIL',
        ADD_NEW_USER: 'ADD_NEW_USER',
        LOGOUT: 'LOGOUT',
        LOGIN_SUCCESS: 'LOGIN_SUCCESS',
        LOGIN_FAILURE: 'LOGIN_FAILURE',
        CHANGE_HEAD_COLOR: 'CHANGE_HEAD_COLOR',
        MESSAGE: 'MESSAGE',
    },
    STAFF: {
        GET_USER: 'GET_USER',
        GET_USERS_LIST: 'GET_USERS_LIST'
    }
};
export const INCREASE = 'INCREASE';
export const DECREASE = 'DECREASE';
export default REDUCERS;
