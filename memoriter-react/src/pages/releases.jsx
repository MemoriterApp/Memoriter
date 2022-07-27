import '../styles/releases/releases-main.css';
import Head from '../components/head';
import ProductHeader from '../components/product/product-header';

import CurrentRelease from '../components/releases/current-release';
import ReleaseV101 from '../components/releases/release-v1.01';

import ProductFooter from '../components/product/product-footer';
import CookieSettings from '../components/cookie-banner/cookie-settings';
import Backdrop from '../components/backdrop';
import WindowSizeAlert from '../components/window-size-alert';
import { useState } from 'react';
import { version } from 'react';

const Releases = () => {

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

    const releases = [ //variable with all components with the notes of all older/outdated updates
        <ReleaseV101 key={1.01}/>
    ];

    const [loadedReleases, setLoadedReleases] = useState(5); //number of releases shown before clicking on the load more button

    return (
        <>

            {/*Head*/}
            <Head title='Release Notes' description='A list of which features were added or changed in the past.'/>

            {/*header*/}
            <ProductHeader/>

            {/*main body*/}
            <div className='releases-main'>

                {/*current version with other style*/}
                <CurrentRelease/>

                {/*older versions, gets data from the loadedReleases array, where all components are stored, just gets a part of the array*/}
                {releases.slice(0, loadedReleases).map((release) => (release))}

                {/*load more button, onClick just adds five on the number of the maximum of shown releases. The button is just shown if necessary.*/}
                {loadedReleases <= releases.length - 1 ? (
                    <button className='releases-main-button' onClick={() => setLoadedReleases(loadedReleases + 5)}>Load More...</button>) : (<div/>)
                }

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

export default Releases;