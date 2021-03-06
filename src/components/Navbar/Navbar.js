import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './navbar.scss';

import { 
    logout
} from './../../store/actions/userActions';

const Navbar = props => {
    return (
        <div className={styles.navbarContainer}>
            <div className={styles.brandContainer}>
                <p>Connect Club</p>
            </div>
            {
                props.user.isLoggedIn &&
                <div className={styles.actionContainer}>
                    <p className={styles.userInfo}>
                        <FontAwesomeIcon icon="user-circle" />
                        {props.user.user.firstName} {props.user.user.lastName}
                    </p>
                    <p 
                        className={styles.logoutBtn}
                        onClick={props.onLogout}>
                            <FontAwesomeIcon icon="sign-out-alt" />
                            <span className={styles.logoutText}>Logout</span>
                    </p>
                </div>
            }
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
        onLogout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
