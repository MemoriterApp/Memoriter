//This wrapper component is responsible for the visual mode theme (dark and light mode).

import { useState, useEffect } from 'react';

const VisualModeProvider = ({ children }) => {

    const currentMode = localStorage.getItem('visual-mode'); //stored value (localStorage)

    const [visualMode, setVisualMode] = useState('light'); //visual mode (used as html id to connect to different css ids)
    const [backgroundColor, setBackgroundColor] = useState(''); //body background color

    useEffect(() => { //dynamically changes the page background color and visual mode based on localStorage
        if (currentMode) { //checks if a value is stored in localStorage to change the visual mode
            setVisualMode(currentMode);
        };
        
        if (visualMode === 'light') { //checks which mode is active to adjust page background
            setBackgroundColor('#e0e0e0');
        } else {
            setBackgroundColor('#202020');
        };
    }, [currentMode, visualMode]);

    document.body.style.backgroundColor = backgroundColor; //page background color, cannot be accessed otherwise

    return (<div id={visualMode}>{children}</div>); //children refers to the content inside the wrapper (all pages)
};

export default VisualModeProvider;