import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { connect } from 'react-redux';

import Home from './../Home/Home';
import Login from './../Login/Login';
import Navbar from './../../components/Navbar/Navbar';

import {
    checkUserLogin
} from './../../store/actions/userActions';
import {
    fetchConnections
} from './../../store/actions/connectionActions';

const Main = props => {
    useEffect(() => {
        props.checkUserLogin();
        props.fetchConnections(1);
    }, [])

    return (
        <div> 
            <Navbar />
            <Switch>
                <Route path={'/'} exact>
                    {
                        props.user.isLoggedIn ?
                        <Redirect to={'/home'} /> :
                        <Login />
                    }
                </Route>
                <Route path={'/home'} exact>
                    {
                        props.user.isLoggedIn ?
                        <Home /> :
                        <Redirect to={'/login'} />
                    }
                </Route>
                <Route path={'/login'} exact>
                    {
                        props.user.isLoggedIn ?
                        <Redirect to={'/home'} /> :
                        <Redirect to={'/login'} />
                    }
                </Route>
            </Switch>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        checkUserLogin: () => dispatch(checkUserLogin()),
        fetchConnections: pageNo => dispatch(fetchConnections(pageNo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
