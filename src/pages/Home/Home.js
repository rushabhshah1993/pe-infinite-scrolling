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

    // const [lastAddedPage, setLastAddedPage] = useState(null);
    // const [list, setList] = useState([]);
    // let executeRequest = true;

    // // window.addEventListener('scroll', throttle(() => {
    // //     checkForBottom();
    // // }, 1000, {leading: false, trailing: true}));

    // // window.addEventListener('scroll', () => throttling());
    
    // // const throttling = _.throttle(() => {
    // //     checkForBottom();
    // // }, 1000, {leading: false});

    // window.addEventListener('scroll', () => {
    //     checkForBottom();
    // })
    
    // const checkForBottom = () => {
    //     let element = cardContainerRef.current;
    //     console.log("Check for bottom is called", props.connections.currentPage, lastAddedPage);
    //     // console.log(element.offsetHeight, element.clientHeight, window.pageYOffset, element);
    //     // console.log(element.clientHeight - window.pageYOffset);
    //     // console.log("Outside condition but inside checkForBottom:  ", props.connections.currentPage, showLoadingText, lastAddedPage);
    //     // console.log("STEP 1: ",lastAddedPage, props.connections.currentPage);
    //     let distanceFromBottom = element.clientHeight - window.pageYOffset;
    //     // console.log(distanceFromBottom);
    //     // const {
    //     //     scrollTop,
    //     //     scrollHeight,
    //     //     clientHeight
    //     // } = document.documentElement;
    //     // console.log(scrollTop, scrollHeight, clientHeight);
    //     // if(distanceFromBottom < 1000) {
    //     //     toggleLoading(true);
    //     // }

    //     // console.log("List:   ", list, lastAddedPage, props);
    //     if(distanceFromBottom < 1000 
    //         && !showLoadingText
    //         && (
    //             lastAddedPage < props.connections.currentPage ||
    //             lastAddedPage === null
    //         )                
    //     ) {
    //         // console.log("STEP 2:  Inside the condition to check if distance is small and loading is false");
    //         // console.log("Current page in store:  ", props.connections.currentPage);
    //         console.log("Inside:  ", props.connections.currentPage, lastAddedPage);
    //         toggleLoading(true);
    //         setLastAddedPage(props.connections.currentPage);
    //         // props.fetchConnections();
    //         props.fetchConnections(props.connections.currentPage+1);
    //     }
    // }

    // useEffect(() => {
    //     // console.log("STEP 3: Inside useEffect of connection length change", lastAddedPage);
    //     toggleLoading(false);
    //     if(list.length < props.connections.list.length) {
    //         console.log("Here MF");
    //         setList(props.connections.list);
    //     }
    // }, [props.connections.list.length]) 

    // // console.log(list);

    // window.addEventListener('scroll', throttle(() => {
    //     checkForBottom();
    // }, 1000));

    window.addEventListener('scroll', () => checkForBottom());

    const checkForBottom = () => {
        let element = cardContainerRef.current;
        let distanceFromBottom = element.clientHeight - window.pageYOffset;
        if(distanceFromBottom < 1000 && executed.current === false) {
            executed.current = true;
            props.fetchConnections(prevCurrentPage.current+1);
            prevCurrentPage.current = prevCurrentPage.current + 1;
        }
    }

    useEffect(() => {
        if(prevList.current.length !== props.connections.list.length) {
            executed.current = false;
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
        <div>
            <Navbar />
            <div>
                <p className={styles.containerTitle}>My connections</p>
                <div className={styles.cardContainer} ref={cardContainerRef}>
                    { connections }
                    <p>Loading...</p>
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
