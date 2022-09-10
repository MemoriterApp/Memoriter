import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AboutBanner = () => {

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
        <section className='about-banner'>

            {/*background circles*/}
            <div
                className='about-banner-background-circle-top'
                style={{left: `calc(-1 * ${scrollProgress}vh - 50vh`}}
            />
            <div
                className='about-banner-background-circle-bottom'
                style={{right: `calc(-1 * ${scrollProgress}vh - 50vh`}}
            />
            {/*the size of the circles changes a bit when you scroll down*/}

            {/*content*/}
            <p className='about-banner-content'>
                Lorem <span>ipsum</span> dolor sit amet, consetetur <span>sadipscing</span> elitr.
            </p>

            {/*transition shape at the bottom*/}
            <div className='about-banner-bottom-transition'/>
            <div className='about-banner-bottom-transition-shape-left'/>
            <div className='about-banner-bottom-transition-shape-right'/>
            
        </section>
    );
}

export default AboutBanner;
