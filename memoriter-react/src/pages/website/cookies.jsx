import '../../styles/legal.css';
import Head from '../../components/head';
import ProductHeader from '../../components/website/product/product-header';
import ProductFooter from '../../components/website/product/product-footer';
import CookieSettings from '../../components/cookie-banner/cookie-settings';
import WindowSizeAlert from '../../components/window-size-alert';
import Backdrop from '../../components/backdrop';
import { useState } from 'react';

const Cookies = () => {

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
            <Head title='Cookie Policy' description='This page contains further information how Memoriter uses cookies.'/>

            {/*header*/}
            <ProductHeader/>

            {/*main body with text*/}
            <div className='legal-main'>

                <h1>Memoriter Cookie Policy</h1>

                <p><strong>Last Updated: July 26th, 2022</strong></p>

                <p>Work in Progress.</p>

                <div className='legal-main-table-container'>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Domain</th>
                                <th>Duration</th>
                                <th>Description</th>
                                <th>Provider</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>accepted-cookies</td>
                                <td>app.memoriter.de</td>
                                <td>1 year</td>
                                <td>Saves which cookie options the user has accepted</td>
                                <td>Memoriter</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

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

export default Cookies;