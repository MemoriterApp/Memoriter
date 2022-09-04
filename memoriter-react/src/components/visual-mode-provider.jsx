//This wrapper component is responsible for the visual mode theme (dark, light and high contrast).

import { useState, useEffect } from 'react';

const VisualModeProvider = ({ children }) => {

    const currentMode = localStorage.getItem('visual-mode')

    const [visualMode, setVisualMode] = useState('dark'); //visual mode (used as html id to connect to different css ids)
    const [backgroundColor, setBackgroundColor] = useState(''); //body background color

    useEffect(() => { //dynamically changes the page background color and visual mode based on localStorage
        if (visualMode === 'light') {
            setBackgroundColor('#f0f0f0');
        } else if (visualMode === 'high-contrast') {
            setBackgroundColor('#080808');
        } else {
            setBackgroundColor('#202020');
        };

        if (currentMode) {
            setVisualMode(currentMode);
        };
    }, [visualMode, currentMode]);

    document.body.style.backgroundColor = backgroundColor; //page background color

    return (<div id={visualMode}>{children}</div>);
};

export default VisualModeProvider;