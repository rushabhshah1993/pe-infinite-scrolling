import * as actions from './../actions/actionTypes';

import { cloneDeep } from 'lodash';

const initialState = {
    connections: []
}

const reducer = (state=initialState, action) => {
    let clonedState = cloneDeep(state);
    switch(action.type) {
        case actions.LIST_CONNECTIONS:
            if(clonedState.connections.length === 0) {
                clonedState.connections = action.list;
            } else {
                clonedState.connections.push(...actions.list);
                console.log(clonedState);
            }
            return clonedState;
        default: return state;
    }
}

export default reducer;
