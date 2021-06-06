import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Main from './pages/Main/Main';

import './index.scss';

import store from './store/store';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Main />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
