import * as actions from './../actions/actionTypes';

import { cloneDeep } from 'lodash';

const initialState = {
    list: [],
    currentPage: 1
}

const reducer = (state=initialState, action) => {
    let clonedState = cloneDeep(state);
    switch(action.type) {
        case actions.LIST_CONNECTIONS:
            if(clonedState.list.length === 0) {
                clonedState.list = action.payload.list;
            } else {
                let newList = [...clonedState.list, ...action.payload.list];
                clonedState.list = newList;
            }
            clonedState.currentPage = action.payload.pageNo;
            return clonedState;
        default: return state;
    }
}

export default reducer;
