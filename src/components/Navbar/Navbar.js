import React from 'react';

import styles from './navbar.scss';

const Navbar = () => {
    return (
        <div className={styles.navbarContainer}>
            <div className={styles.brandContainer}>
                <p>Connect Club</p>
            </div>
            <div className={styles.actionContainer}>
                Action
            </div>
        </div>
    )
}

export default Navbar;
