import * as actions from './actionTypes';

export const setUserLoginStatus = status => {
    return {
        type: actions.SET_USER_STATUS,
        status: status
    }
}
