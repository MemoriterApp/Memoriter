//This wrapper component simplifies many pages by combining all functions and components used on any of these pages

import Head from '../../head';
import ProductHeader from './product-header';
import ProductFooter from './product-footer';
import CookieBanner from '../cookie-banner/cookie-banner';
import CookieSettings from '../cookie-banner/cookie-settings';
import WindowSizeAlert from '../../window-size-alert';
import Backdrop from '../../backdrop';
import { useState } from 'react';

const ProductWrapper = ({ children, title, description, currentPage }) => {

    const [cookieSettings, setCookieSettings] = useState(false); //opens or closes cookie settings

    const [cookieSettingsAnimation, setCookieSettingsAnimation] = useState({ //animation when opening cookie settings modal
        transform: 'translate(-50%, calc(-50% - 16px))',
        opacity: '0',
    }); //styles used for the cookie settings fade in and out animation
    const [backdropAnimation, setBackdropAnimation] = useState('0'); //backdrop opacity (used for fade in and out animation)
    
    function openCookieSettings() { //function for opening the cookie settings
        document.body.style.overflow = 'hidden'; //disables page scrolling
        setCookieSettings(true);
        setTimeout(() => {
            setBackdropAnimation('1');
            setCookieSettingsAnimation({
                transform: 'translate(-50%, -50%)',
                opacity: '1'
            });
        }, 0);
        //setBackdropAnimation triggers a transition in the backdrop component creating the fade in effect, does not work without timeout
    };

    function closeCookieSettings() { //function for closing the cookie settings
        document.body.style.overflow = 'auto'; //re-enables page scrolling
        setTimeout(() => {setCookieSettings(false);}, 800); //timeout is needed for finishing the fade effect before closing everything
        setTimeout(() => {
            setBackdropAnimation('0');
            setCookieSettingsAnimation({
                transform: 'translate(-50%, calc(-50% - 16px))',
                opacity: '0'
            });
        }, 0);
        //setBackdropAnimation triggers a transition in the backdrop component creating the fade out effect, does not work without timeout
    };

    return (
        <>

            {/*head*/}
            <Head title={title} description={description}/>
            {/*title property is for displaying a custom page title, description is for a custom meta description*/}

            {/*header*/}
            <ProductHeader currentPage={currentPage}/> {/*The currentPage property defines the highlighted quicklink ath the navigation bar.*/}

            {/*main part, children refers to the content inside the wrapper (the main part content)*/}
            <main style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>{children}</main>
            {/*style is needed for aligning the items correctly*/}

            {/*footer*/}
            <ProductFooter onOpenCookieSettings={openCookieSettings}/>

            {/*cookie banner*/}
            <CookieBanner onOpenCookieSettings={openCookieSettings}/>

            {/*cookie settings modal*/}
            {cookieSettings && <>
                <CookieSettings onAnimation={cookieSettingsAnimation} onCloseCookieSettings={closeCookieSettings}/>
                <Backdrop onFade={backdropAnimation} onClick={closeCookieSettings}/>
            </>}

            {/*alert for too small screens*/}
            <WindowSizeAlert/>
            
        </>
    );
}

export default ProductWrapper;