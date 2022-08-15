import Head from '../components/head';
import ProductHeader from '../components/product/product-header';
import BlogSidebar from '../components/blog/blog-sidebar';
import BlogMain from '../components/blog/blog-main';
import ProductFooter from '../components/product/product-footer';
import CookieSettings from '../components/cookie-banner/cookie-settings';
import Backdrop from '../components/backdrop';
import WindowSizeAlert from '../components/window-size-alert';
import { useState } from 'react';

const Blog = () => {

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

            {/*Head*/}
            <Head title='Blog' description='Thoughts, inspirations and stories by the people creating Memoriter.'/>

            {/*header*/}
            <ProductHeader currentPage='blog'/>

            {/*style is needed for two column layout*/}
            <div style={{display: 'flex', position: 'relative', left: '50%', transform: 'translate(-50%)', width: 'calc(100% - 140px)', gap: '80px'}}>

                {/*sidebar with filter options*/}
                <BlogSidebar/>

                {/*main part with blog articles*/}
                <BlogMain/>

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

export default Blog;
