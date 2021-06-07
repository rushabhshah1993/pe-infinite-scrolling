import axios from 'axios';

import * as actions from './actionTypes';

export const fetchConnections = pageNo => {
    return dispatch => {
        axios.get(`https://randomuser.me/api/?page=${pageNo}&results=20&seed=abc`)
            .then(response => {
                dispatch(listConnections(response.data.results, pageNo));
            })
            .catch(error => {
                console.log(error);
            })
    }
}

export const listConnections = (list, pageNo) => {
    return {
        type: actions.LIST_CONNECTIONS,
        payload: {
            list: list,
            pageNo: pageNo
        }
    }
}

