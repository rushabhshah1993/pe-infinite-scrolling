import axios from 'axios';

import * as actions from './actionTypes';

export const fetchConnections = pageNo => {
    return dispatch => {
        axios.get(`https://randomuser.me/api/?page=${pageNo}&results=10&seed=abc`)
            .then(response => {
                dispatch(listConnections(response.data.results));
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const listConnections = list => {
    return {
        type: actions.LIST_CONNECTIONS,
        list: list
    }
}

