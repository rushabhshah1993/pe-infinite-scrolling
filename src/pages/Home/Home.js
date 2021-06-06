import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { throttle } from 'lodash';

import Navbar from './../../components/Navbar/Navbar';

import styles from './home.scss';

const Home = props => {
    const cardContainerRef = useRef();

    window.addEventListener('scroll', throttle(() => {
        console.log('Here');
        checkForBottom();
    }, 300));

    const checkForBottom = () => {
        console.log(document, window);
        console.log(document.body.scrollHeight, document.body.scrollTop, window.height);
        // pixelsFromBottom = document.height - window.scrollTop() - 
    }

    let connections = props.connections.connections.map(user => {
        let registeredDate = new Date(user.registered.date).toDateString();

        return (
            <div className={styles.card} key={user.cell}>
                <div className={styles.imgContainer}>
                    <img src={user.picture.medium} className={styles.userThumbnail} />
                </div>
                <div className={styles.userInfoContainer}> 
                    <div className={styles.nameLocation}>
                        <p className={styles.userName}>{user.name.title} {user.name.first} {user.name.last}</p>
                        <p className={styles.userLocation}>{user.location.city}, {user.location.country}</p>
                    </div>
                    <div className={styles.otherInfo}>
                        <div className={styles.contact}>
                            <p>{user.email}</p>
                            <p>{user.phone}</p>
                        </div>
                        <div className={styles.registeredDate}>
                            <p>Registered on {registeredDate}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div>
            <Navbar />
            <div>
                
                <div className={styles.cardContainer} ref={cardContainerRef}>
                    { connections }
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        connections: state.connections
    }
}

export default connect(mapStateToProps)(Home)
