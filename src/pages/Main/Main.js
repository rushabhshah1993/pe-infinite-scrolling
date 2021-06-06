import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router';

import Navbar from './../../components/Navbar/Navbar';
import Home from './../Home/Home';
import Login from './../Login/Login';

const Main = () => {
    const [userLoggedIn, setUserLoginStatus] = useState(false);

    useEffect(() => {
        let userInfo = localStorage.getItem('user');
        setUserLoginStatus(!!userInfo);
    }, [])

    return (
        <div>
            <Navbar />
            <Switch>
                <Route path={'/login'} exact component={Login} />
                <Route path={'/'} exact>
                    {
                        userLoggedIn ?
                        <Redirect to={'/home'} /> :
                        <Login />
                    }
                </Route>
                <Route path={'/home'} exact>
                    {
                        userLoggedIn ?
                        <Home /> :
                        <Redirect to={'/login'} />
                    }
                </Route>
            </Switch>
        </div>
    )
}

export default Main;
