/*This component fixes an issue where the scroll progress wil not reset when moving to another page.
For instancs, if you use one of the footer links, you would stay at the bottom and need to scroll up manually.
This wrapper component (you can find it in App.jsx) fixes this issue by scrolling to top on page load.*/
import { useEffect } from 'react';
import { useLocation } from 'react-router';

const ScrollReset = ({ children }) => {

    const location = useLocation(); //does not work without this

    useEffect(() => {
        window.scrollTo(0, 0); //scrolls to top
    }, [location]);

    return(<>{children}</>); //children refers to the content inside the wrapper (all routes)
};

export default ScrollReset;