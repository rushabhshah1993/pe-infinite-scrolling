import * as actions from './actionTypes';

export const setUserLoginStatus = status => {
    return {
        type: actions.SET_USER_STATUS,
        status: status
    }
}

export const login = (username, password) => {
    return dispatch => {
        if(username === 'foo' && password === 'bar') {
            let user = {
                username: 'foo',
                firstName: 'John',
                lastName: 'Doe'
            };
            localStorage.setItem('user', JSON.stringify(user));
            dispatch(loginSuccess(user));
        } else {
            dispatch(loginFail());
        }
    }
}

export const loginSuccess = user => {
    return { 
        type: actions.LOGIN_SUCCESS,
        user: user
    }
}

export const loginFail = () => {
    return { type: actions.LOGIN_FAIL }
}

export const checkUserLogin = () => {
    let userInfo = !!localStorage.getItem('user'); 
    return dispatch => {
        dispatch(setUserLoginStatus(userInfo));
    }   
}

export const logout = () => {
    localStorage.removeItem('user');
    return {
        type: actions.LOGOUT
    }
}
