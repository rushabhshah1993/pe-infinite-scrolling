import axios from 'axios';
import store from './../store';


import * as actions from './actionTypes';

let counter = 0, pageRequested;

export const fetchConnections = pageNo => {
    // console.log("Store value in action:   ", store.getState().connections.currentPage);
    let storeCurrentPage = store.getState().connections.currentPage;
    // console.log("Actions argument:  ", pageNo);
    counter += 1;
    pageRequested = pageNo;
    console.log("Actions counter:  ", counter, pageNo, pageRequested, pageRequested === pageNo);
    return dispatch => {
        if(counter > 1 && pageNo === pageRequested) return;
        else {
            axios.get(`https://randomuser.me/api/?page=${pageNo}&results=20&seed=abc`)
                .then(response => {
                    dispatch(listConnections(response.data.results, pageNo));
                    counter = 0;
                })
                .catch(error => {
                    console.log(error);
                })
        }
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

