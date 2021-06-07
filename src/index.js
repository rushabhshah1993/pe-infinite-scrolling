import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { 
    faSignOutAlt, faEnvelope, faPhoneAlt,
    faMobile, faHouseUser, faAddressBook,
    faUserCircle
} from '@fortawesome/free-solid-svg-icons';

import Main from './pages/Main/Main';

import './index.scss';

import store from './store/store';

library.add(
    faSignOutAlt, faEnvelope, faPhoneAlt, 
    faMobile, faHouseUser, faAddressBook,
    faUserCircle
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Main />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
