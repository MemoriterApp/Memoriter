import Head from '../../components/head';
import ProductHeader from '../../components/website/product/product-header';
import BlogSidebar from '../../components/website/blog/blog-sidebar';
import BlogMain from '../../components/website/blog/blog-main';
import ProductFooter from '../../components/website/product/product-footer';
import CookieBanner from '../../components/website/cookie-banner/cookie-banner';
import CookieSettings from '../../components/website/cookie-banner/cookie-settings';
import Backdrop from '../../components/backdrop';
import WindowSizeAlert from '../../components/window-size-alert';
import { useState } from 'react';

const Blog = ({ topic }) => {

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

    const filter = topic; //variable for filtering the blog posts

    return (
        <>

            {/*Head*/}
            <Head title='Blog' description='Thoughts, inspirations and stories by the people creating Memoriter.'/>

            {/*header*/}
            <ProductHeader currentPage='blog'/>

            {/*style is needed for two column layout*/}
            <div className='blog-main-body'>

                {/*sidebar with filter options*/}
                <BlogSidebar topic={filter}/>

                {/*main part with blog posts*/}
                <BlogMain topic={filter}/>

            </div>

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

export default Blog;
