import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';

import styles from './home.scss';

import {
    fetchConnections
} from './../../store/actions/connectionActions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { fetchGreeting } from './../../utilities/js/simpleUtilities';


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
        let userLocation = user.location;

        return (
            <div className={styles.card} key={user.login.uuid}>
                <div className={styles.primaryInfoContainer}>
                    <img src={user.picture.medium} className={styles.userThumbnail} />
                    <div className={styles.nameLocation}>
                        <p className={styles.userName}>
                            <span className={styles.title}>{user.name.title}.</span>
                            <span className={styles.name}>{user.name.first} {user.name.last}</span>
                        </p>
                        <p className={styles.userLocation}>{user.location.city}, {user.location.country}</p>
                    </div>
                </div>
                <div className={styles.itemContainer}>
                    <div className={styles.mobileIcon}>
                        <FontAwesomeIcon icon="house-user" size="1x" className={styles.houseIcon} />
                    </div>
                    <div>
                        <p className={styles.itemTitle}>Address</p>
                        <p className={styles.address}>
                            <span>{userLocation.street.number}, {userLocation.street.name}</span>
                            <span>{userLocation.city}, {userLocation.state},</span>
                            <span>{userLocation.country} - {userLocation.postcode}</span>
                        </p>
                    </div>
                </div>
                <div className={styles.userInfoContainer}> 
                    <div className={styles.mobileIcon}>
                        <FontAwesomeIcon icon="address-book" size="2x" className={styles.addressIcon} />
                    </div>
                    <div>
                        <p className={styles.itemTitle}>Contact</p>
                        <div className={styles.otherInfo}>
                            <div className={styles.contact}>
                                <p className={styles.contactItem}>
                                    <FontAwesomeIcon icon="envelope" size="xs" />
                                    <span>{user.email}</span>
                                </p>
                                <p className={styles.contactItem}>
                                    <FontAwesomeIcon icon="phone-alt" size="xs" />
                                    <span>{user.phone}</span>
                                </p>
                                <p className={styles.contactItem}>
                                    <FontAwesomeIcon icon="mobile" size="xs" />
                                    <span>{user.cell}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    })

    return (
        <div className={styles.homeContainer}>
            <div className={styles.welcomeUserMessage}>
                <p>{ fetchGreeting() }, { props.user.user.firstName } !</p>
            </div>
            
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
        connections: state.connections,
        user: state.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchConnections: pageNo => dispatch(fetchConnections(pageNo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
