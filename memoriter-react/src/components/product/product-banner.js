import '../../styles/product-banner.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductBanner = () => {

    const [onHover, setOnHover] = useState('brightness(1)'); //variable for the hover effect for the get started button

    const [scrollProgress, setScrollProgress] = useState(0); //value for the scroll progress
    const onScroll = () => { //getting the scroll data
        const scroll = document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        const scrolled = (scroll / height) * 100;

        setScrollProgress(scrolled);
    };

    useEffect(() => { //the useEffect is important for getting the value if it is scrolling
        window.addEventListener('scroll', onScroll);

        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <div className='product-banner'>

            {/*background triangles*/}
            <div className='product-banner-background-triangle-top' style={{right: `calc(-1 * ${scrollProgress}vh`}}/>
            <div className='product-banner-background-triangle-bottom' style={{left: `calc(-1 * ${scrollProgress}vh`}}/>
            {/*the size of the triangles changes a bit when you scroll down*/}

            {/*content*/}
            <div className='product-banner-content'>
                {/*slogan*/}
                <p className='product-banner-text'>Lorem ipsum dolor sit amet, consetetur sadipscing elitr.</p>

                {/*get started button for redirecting to register page*/}
                <Link className='product-banner-get-started' to='/signup'
                    onMouseEnter={() => setOnHover('brightness(0.75)')} onMouseLeave={() => setOnHover('brightness(1)')}>
                    {/*the onMouseEnter and -Leave is for the fade effect on hover which was not possible in css*/}
                    <div className='product-banner-get-started-background' style={{filter: onHover}}/>
                    <span className='product-banner-get-started-text'>Get Started!</span>
                </Link>
            </div>

            {/*transition shape at the bottom*/}
            <div className='product-banner-bottom-transition'/>
            <div className='product-banner-bottom-transition-shape-left'/>
            <div className='product-banner-bottom-transition-shape-right'/>

        </div>
    );
}

export default ProductBanner;