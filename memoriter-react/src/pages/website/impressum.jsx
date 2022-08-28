import Head from '../../components/head';
import ProductHeader from '../../components/website/product/product-header';
import ProductFooter from '../../components/website/product/product-footer';
import CookieSettings from '../../components/website/cookie-banner/cookie-settings';
import WindowSizeAlert from '../../components/window-size-alert';
import Backdrop from '../../components/backdrop';
import { useState } from 'react';

const Impressum = () => {

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
            <Head title='Impressum' description='Where to contact us'/>

            {/*header*/}
            <ProductHeader/>

            {/*main body with text*/}
            <div className='legal-main'>

                <h1>Impressum</h1>

                <p>
                    Memoriter is a student company at the Bertha-von-Bertha-Suttner-Gymnasium Babelsberg in Potsdam, Germany,
                    under the supervision of JUNIOR, a project by the Institut der Deutchen Wirtschaft (IW),
                    supported by the Bundesministerium für Wirtschaft und Klimaschutz (BMWK).
                    Further information about the JUNIOR project can be found <a href='https://www.junior-programme.de/startseite' target='_blank' rel='noreferrer'>here</a>.
                </p>

                <h2>Contact:</h2>
                <ul>
                    <li>Johan Trieloff</li>
                    <li>Kopernikusstraße 30</li>
                    <li>14482 Potsdam, Germany</li>
                    <li>Phone: +49 (0)221 | 4981-707</li>
                    <li>Email: johan@trieloff.net</li>
                </ul>
                

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

export default Impressum;