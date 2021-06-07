import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { debounce, throttle, cloneDeep } from 'lodash';

import styles from './home.scss';

import Navbar from './../../components/Navbar/Navbar';

import {
    fetchConnections
} from './../../store/actions/connectionActions';


const Home = props => {
    const cardContainerRef = useRef();
    const [showLoadingText, toggleLoading] = useState(false);
    const prevList = useRef([]);
    const prevCurrentPage = useRef();
    const executed = useRef(false);

    window.addEventListener('scroll', () => checkForBottom());

    const checkForBottom = () => {
        let element = cardContainerRef.current;
        let distanceFromBottom = element.clientHeight - window.pageYOffset;
        if(distanceFromBottom < 1000 && executed.current === false) {
            executed.current = true;
            toggleLoading(true);
            props.fetchConnections(prevCurrentPage.current+1);
            prevCurrentPage.current = prevCurrentPage.current + 1;
        }
    }

    useEffect(() => {
        if(prevList.current.length !== props.connections.list.length) {
            executed.current = false;
            toggleLoading(false);
        }
        prevList.current = cloneDeep(props.connections.list);
        prevCurrentPage.current = props.connections.currentPage;
    })

    let connections = props.connections.list.map(user => {
        let registeredDate = new Date(user.registered.date).toDateString();

        return (
            <div className={styles.card} key={user.login.uuid}>
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
        <div className={styles.homeContainer}>
            <div className={styles.connectionsContainer}>
                <p className={styles.containerTitle}>My connections</p>
                <div className={styles.cardContainer} ref={cardContainerRef}>
                    { connections }
                    {
                        showLoadingText &&
                        <p>Loading...</p>
                    }
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

const mapDispatchToProps = dispatch => {
    return {
        fetchConnections: pageNo => dispatch(fetchConnections(pageNo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
