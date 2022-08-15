import '../styles/blog/blog-main.css';
import Head from '../components/head';
import ProductHeader from '../components/product/product-header';
import ProductFooter from '../components/product/product-footer';
import CookieSettings from '../components/cookie-banner/cookie-settings';
import Backdrop from '../components/backdrop';
import WindowSizeAlert from '../components/window-size-alert';

import Test1MainImage from '../images/blog-images/test-1/test-1-main.jpeg';

import { useState } from 'react';
import { Link } from 'react-router-dom';

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

    const blogs = [ //variable for listing all blog articles/posts
        {
            title: 'Test 1',
            description: 'A test page during development',
            mainImage: <img src={Test1MainImage} alt='test-1-main'/>,
            link: 'test-1'
        },
        {
            title: 'Test 2',
            description: 'A test page during development',
            mainImage: <img src={Test1MainImage} alt='test-1-main'/>,
            link: 'test-1'
        },
        {
            title: 'Test 3',
            description: 'A test page during development A test page during development A test page during developmentA test page during development A test page during development A test page during development',
            mainImage: <img src={Test1MainImage} alt='test-1-main'/>,
            link: 'test-1'
        },
        {
            title: 'Test 4',
            description: 'A test page during development A test page during development',
            mainImage: <img src={Test1MainImage} alt='test-1-main'/>,
            link: 'test-1'
        }
    ];

    return (
        <>

            {/*Head*/}
            <Head title='Blog' description='Updates, news and stories about the Memoriter project.'/>

            {/*header*/}
            <ProductHeader currentPage='blog'/>

            <div className='blog-main'>

                {/*three newest blog articles*/}
                <div className='blog-main-new-blog-container'>
                    {blogs.slice(0, 2).map((blog) => (
                        <div className='blog-main-new-blog' key={blog.title}>
                            {blog.mainImage}
                            <h1>{blog.title}</h1>
                            <p>{blog.description}</p>
                            <Link className='blog-main-new-blog-link' to={blog.link}>Read more...</Link>
                        </div>
                    ))}
                </div>
                <div className='blog-main-new-blog-container'>
                    {blogs.slice(2, 4).map((blog) => (
                        <div className='blog-main-new-blog' key={blog.title}>
                            {blog.mainImage}
                            <h1>{blog.title}</h1>
                            <p>{blog.description}</p>
                            <Link className='blog-main-new-blog-link' to={blog.link}>Read more...</Link>
                        </div>
                    ))}
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

export default Blog;
