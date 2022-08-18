import '../styles/blog/blog-post-main.css';
import Head from '../components/head';
import ProductHeader from '../components/product/product-header';
import BlogPostHeader from '../components/blog/blog-post-header';
import BlogPostFooter from '../components/blog/blog-post-footer';
import ProductFooter from '../components/product/product-footer';
import CookieBanner from '../components/cookie-banner/cookie-banner';
import CookieSettings from '../components/cookie-banner/cookie-settings';
import Backdrop from '../components/backdrop';
import WindowSizeAlert from '../components/window-size-alert';
import { useState } from 'react';

const BlogPost = ({ blog }) => {

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

    //general blog post data (used for the post header)
    const topic = blog.topic; //the topic/category for the filter option (Company, Productivity, Technology or Miscellaneous)
    const date = blog.date; //date of publication
    const author = blog.author; //the name of the author
    const title = blog.title; //blog title
    const description = blog.description; //small description, same as used for the overview page
    const content = blog.content;
    const linkedBlogs = blog.linkedBlogs; //blog posts linked at the bottom of the text

    return (
        <>

            {/*Head*/}
            <Head title={title} description={description}/>

            {/*header*/}
            <ProductHeader currentPage='blog'/>

            <div className='blog-post-main'>

                {/*header/blog post data (like title, author, date of publication etc.), gets the data by the general blog post data variables*/}
                <BlogPostHeader title={title} date={date} author={author} topic={topic}/>

                {/*main part*/}
                {content}

                {/*footer with the read more links, share options etc.*/}
                <BlogPostFooter title={title} linkedBlogs={linkedBlogs}/>

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

export default BlogPost;