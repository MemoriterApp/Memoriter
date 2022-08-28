import '../styles/newsletter.css';
import Head from '../components/head';
import ProductHeader from '../components/product/product-header';
import ProductFooter from '../components/product/product-footer';
import CookieSettings from '../components/cookie-banner/cookie-settings';
import WindowSizeAlert from '../components/window-size-alert';
import Backdrop from '../components/backdrop';
import { useState } from 'react';

const Newsletter = () => {

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

    const [onHover, setOnHover] = useState('brightness(1)'); //variable for the hover effect for the get started button

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
            <Head title='Newsletter' description='Sign Up to our Email Newsletter!'/>

            {/*header*/}
            <ProductHeader/>

            <div className='newsletter-main'>

                <h1 className='newsletter-main-title'>Sign Up to our Email Newsletter!</h1>

                {/*email input field and subscribe button*/}
                <div className='newsletter-main-subscribe'>
                    <p className='newsletter-main-subscribe-label'>Enter your Email Adress</p>

                    <input className='newsletter-main-subscribe-input' type='email' placeholder='Email Adress'/>

                    {/*button for subscribing to newsletter*/}
                    <button
                        className='newsletter-main-subscribe-button' to='/product'
                        onMouseEnter={() => setOnHover('brightness(0.75)')} onMouseLeave={() => setOnHover('brightness(1)')}>
                        {/*the onMouseEnter and -Leave is for the fade effect on hover which was not possible in css*/}
                        <div className='newsletter-main-subscribe-button-background' style={{filter: onHover}}/>
                        <span className='newsletter-main-subscribe-button-text'>Subscribe</span>
                    </button>
                </div>
                <p className='newsletter-main-subscribe-verify'>
                    We will send you a confirmation email to verify your email adress.
                </p>

                <p className='newsletter-main-description'>
                    Recieve new and exclusive news about the Memoriter project.
                </p>

                <p className='newsletter-main-unsubscribe'>
                    You do not want to recieve our email newsletter any more?&nbsp;
                    <span className='newsletter-main-unsubscribe-link'>Click here</span>
                    &nbsp;to request a removal from our mailing list.
                </p> {/*&nbsp; is a unicode character for spaces*/}

            </div>

            {/*footer*/}
            <ProductFooter onOpenCookieSettings={openCookieSettings}/>

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

export default Newsletter;