import React from 'react';
import { connect } from 'react-redux';

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
            <div className={styles.actionContainer}>
                <p 
                    className={styles.logoutBtn}
                    onClick={props.onLogout}>
                        Logout
                </p>
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
        onLogout: () => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
