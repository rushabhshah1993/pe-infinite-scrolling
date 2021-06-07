import * as actions from './../actions/actionTypes';
import { cloneDeep } from 'lodash';

const initialState = {
    user: {},
    isLoggedIn: false,
    loginError: null
}

const reducer = (state=initialState, action) => {
    let clonedState = cloneDeep(state);
    switch(action.type) {
        case actions.LOGIN_SUCCESS:
            clonedState.isLoggedIn = true;
            clonedState.loginError = false;
            clonedState.user = action.user;
            return clonedState;
            case actions.LOGIN_FAIL:
                clonedState.user = {};
                clonedState.isLoggedIn = false;
                clonedState.loginError = 'Incorrect username/password';
                return clonedState;
            case actions.LOGOUT:
                clonedState.user = {};
                clonedState.isLoggedIn = false;
                clonedState.loginError = null;
                return clonedState;
            case actions.SET_USER_DATA:
                clonedState.user = action.user;
                return clonedState;
            case actions.SET_USER_STATUS:
                clonedState.isLoggedIn = action.status;
                return clonedState;
        default: return state;
    }
}

export default reducer;
