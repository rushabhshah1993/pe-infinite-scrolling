export const fetchGreeting = () => {
    let hours = new Date().getHours();
    let greeting;

    if(hours >= 0 && hours < 12) greeting = 'Good Morning';
    else if(hours >=12 && hours < 17) greeting = 'Good Afternoon';
    else if(hours >=17 && hours < 23) greeting = 'Good Evening';

    return greeting;
}
