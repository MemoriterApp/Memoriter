import Head from '../components/head';
import ProductHeader from '../components/product/product-header';
import ProductBanner from '../components/product/product-banner';
import ProductMain from '../components/product/product-main';
import ProductFooter from '../components/product/product-footer';
import CookieBanner from '../components/cookie-banner/cookie-banner';
import CookieSettings from '../components/cookie-banner/cookie-settings';
import WindowSizeAlert from '../components/window-size-alert';
import Backdrop from '../components/backdrop';
import { useState } from 'react';


const Product = () => {

    const [cookieSettings, setCookieSettings] = useState(false); //opens or closes cookie settings

    const [backdropAnimation, setBackdropAnimation] = useState('0'); //backdrop opacity (used for fade in and out animation)

    function openCookieSettings() { //function for opening the cookie settings
        setCookieSettings(true);
        setTimeout(() => {setBackdropAnimation('1');}, 0);
        //setBackdropAnimation triggers a transition in the backdrop component creating the fade in effect, does not work without timeout
    }

    function closeCookieSettings() { //function for closing the cookie settings
        setTimeout(() => {setCookieSettings(false);}, 800); //timeout is needed for finishing the fade effect before closing everything
        setTimeout(() => {setBackdropAnimation('0');}, 0);
        //setBackdropAnimation triggers a transition in the backdrop component creating the fade out effect, does not work without timeout
    }

    return (
        <>
        
            {/*head*/}
            <Head title='The all-in-one learning environment' description='memoriter, learning, notes, home'/>
            {/*title property is for displaying a custom page title, description is for a custom meta description*/}

            {/*header*/}
            <ProductHeader currentPage='product'/> {/*The currentPage property defines the highlighted quicklink ath the navigation bar.*/}

            {/*style is needed for aligning the items correctly*/}
            <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>

                {/*banner with slogan and get started button*/}
                <ProductBanner/>

                {/*basic main layout and texts*/}
                <ProductMain/>

            </div>

            {/*footer*/}
            <ProductFooter/>

            {/*cookie banner*/}
            <CookieBanner onOpenCookieSettings={openCookieSettings}/>

            {/*cookie settings view*/}
            {cookieSettings && <>
                    <CookieSettings style={{}} onCloseCookieSettings={closeCookieSettings}/>
                    <Backdrop onFade={backdropAnimation} onClick={closeCookieSettings}/>
            </>}

            {/*alert for too small screens*/}
            <WindowSizeAlert/>

        </>
    );
}

export default Product;