import Head from '../../components/head';
import ProductHeader from '../../components/website/product/product-header';
import AboutMain from '../../components/website/about/about-main';
import ProductFooter from '../../components/website/product/product-footer';
import CookieBanner from '../../components/website/cookie-banner/cookie-banner';
import CookieSettings from '../../components/website/cookie-banner/cookie-settings';
import Backdrop from '../../components/backdrop';
import WindowSizeAlert from '../../components/window-size-alert';
import { useState } from 'react';

const About = () => {

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
            <Head title='About' description=''/>
            {/*title property is for displaying a custom page title, description is for a custom meta description*/}

            {/*header, same as product*/}
            <ProductHeader currentPage='about'/> {/*The currentPage property defines the highlighted quicklink ath the navigation bar.*/}

            {/*style is needed for aligning the items correctly*/}
            <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>

                {/*basic main layout and texts*/}
                <AboutMain/>

            </div>

            {/*footer, same as product*/}
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

export default About;