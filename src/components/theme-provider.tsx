//This wrapper component is responsible for the visual mode theme (dark and light mode).

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeTheme } from '../technical/features/theme-slice';

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch(); // used to manipulate global state (react redux)

    const currentTheme = useSelector((state: any) => state.theme.value); //stored state (react redux)

    const [theme, setTheme] = useState('light'); //visual mode (used as html id to connect to different css ids)
    const [backgroundColor, setBackgroundColor] = useState('#eeeeee'); //body background color

    useEffect(() => { //dynamically changes the page background color and visual mode based on global state
        if (currentTheme) { //checks if a value is stored as global state to change the visual mode
            setTheme(currentTheme);
        } else if (
            typeof window !== 'undefined' &&
            window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches
        ) {
            setTheme('dark');
            dispatch(changeTheme('dark')); // changes the theme globally
        } else {
            dispatch(changeTheme('light')); // changes the theme globally
        }

        if (theme === 'dark') { //checks which mode is active to adjust page background
            setBackgroundColor('#202020');
        } else {
            setBackgroundColor('#eeeeee');
        }
    }, [currentTheme, theme]);

    document.body.style.backgroundColor = backgroundColor; //page background color, cannot be accessed otherwise

    return (<div id={theme}>{children}</div>); //children refers to the content inside the wrapper (all pages)
};

export default ThemeProvider;