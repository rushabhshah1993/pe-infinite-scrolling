import React from 'react';
import { connect } from 'react-redux';

import styles from './navbar.scss';

const Navbar = props => {
    return (
        <div className={styles.navbarContainer}>
            <div className={styles.brandContainer}>
                <p>Connect Club</p>
            </div>
            <div className={styles.actionContainer}>
                Logout
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Navbar);
