import * as actions from './../actions/actionTypes';
import { cloneDeep } from 'lodash';

const initialState = {
    user: {},
    isLoggedIn: false
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case actions.SET_USER_STATUS:
            let clonedState = cloneDeep(state);
            clonedState.isLoggedIn = action.status;
            return clonedState;
        default: return state;
    }
}

export default reducer;
