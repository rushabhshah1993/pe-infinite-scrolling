import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import styles from './login.scss';

import {
    login
} from './../../store/actions/userActions';

const Login = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);
    const [activeLogin, toggleActiveLogin] = useState(false);

    const loginUser = () => {
        if(username.length === 0 || password.length === 0) {
            setErrorMsg(`
                Username and/or password is missing. 
                Kindly add in the required details before attempting to login.
            `);
        } else {
            setErrorMsg(null);
            props.onLogin(username, password);
        }
    }

    const userInput = (event) => {
        setUsername(event.target.value);
        checkDetailsEntered(event.target.value, password);
        setErrorMsg(null);
    }

    const passwordInput = (event) => {
        setPassword(event.target.value);
        checkDetailsEntered(username, event.target.value);
        setErrorMsg(null);
    }
    
    const checkDetailsEntered = (user, pword) => {
        if(user.length > 0 && pword.length > 0) {
            toggleActiveLogin(true);
        } else toggleActiveLogin(false);
    }

    useEffect(() => {
        if(props.user.loginError !== errorMsg) 
            setErrorMsg(props.user.loginError);
    }, [props.user.loginError])

    const loginClasses = [styles.loginBtn];
    if(activeLogin) loginClasses.push(styles.activeLoginBtn);

    return (
        <div className={styles.loginWrapper}>
            <div className={styles.welcomeImg}>
                <img src="https://image.freepik.com/free-vector/young-people-illustration-concept_23-2148457572.jpg" />
            </div>
            <div className={styles.loginContainer}>
                <div className={styles.brandName}>Connect Club</div>
                <div className={styles.loginBox}>
                    <div className={styles.errorMsg}>{ errorMsg}</div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="username">Username:</label>
                        <input 
                            type="text" 
                            id="username" 
                            className={styles.inputElement}
                            value={username}
                            onChange={userInput} />
                    </div>
                    <div className={styles.inputContainer}>
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            id="password" 
                            className={styles.inputElement}
                            value={password}
                            onChange={passwordInput} />
                    </div>

                    <div className={loginClasses.join(' ')} onClick={loginUser}>Login</div>
                </div>
            </div>
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
        onLogin: (username, password) => dispatch(login(username, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
