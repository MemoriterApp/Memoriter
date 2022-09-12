import windowsIcon from '../../../images/icons/windows-icon.svg';
import appleIcon from '../../../images/icons/apple-icon.svg';
import downloadIcon from '../../../images/icons/download-icon.svg';
import { useEffect, useState } from 'react';

const DownloadBanner = () => {

    const [squareEffect, setSquareEffect] = useState('0'); //variable for background animation when hovering on the download buttons
    const [squareTransition, setSquareTransition] = useState('none'); //variable for background animation transition (this does not trigger when scrolling)

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

    const [onHoverWindows, setOnHoverWindows] = useState('brightness(1)'); //variable for the hover effect for the download for windows button
    const [onHoverMac, setOnHoverMac] = useState('brightness(1)'); //variable for the hover effect for the download for mac button

    return (
        <section className='download-banner'>

            {/*background circles*/}
            <div
                className='download-banner-background-square-top'
                style={{right: `calc(-1 * ${scrollProgress}vh - ${squareEffect}vh`, transition: squareTransition}}
            />
            <div
                className='download-banner-background-square-bottom'
                style={{left: `calc(-1 * ${scrollProgress}vh - ${squareEffect}vh`, transition: squareTransition}}
            />
            {/*the size of the circles changes a bit when you scroll down*/}

            {/*download button for windows*/}
            <button className='download-banner-download download-banner-download-windows' //two classes
                onMouseEnter={() => {setOnHoverWindows('brightness(0.75)'); setSquareEffect('10'); setSquareTransition('400ms');}}
                onMouseLeave={() => {setOnHoverWindows('brightness(1)'); setSquareEffect('0'); setTimeout(() => {setSquareTransition('none')}, 400);}}
            >
                {/*the onMouseEnter and -Leave is for the fade effect on hover which was not possible in css and the background animation*/}
                <div className='download-banner-download-background' style={{filter: onHoverWindows}}/>
                <img className='download-banner-download-icon' src={windowsIcon} alt='windows-icon' style={{height: '36px'}}/>
                <span className='download-banner-download-text'>Download</span>
                <span className='download-banner-download-text-os'>for Windows</span>
            </button>

            {/*download button for mac*/}
            <button className='download-banner-download download-banner-download-mac' //two classes
                onMouseEnter={() => {setOnHoverMac('brightness(0.75)'); setSquareEffect('10'); setSquareTransition('400ms');}}
                onMouseLeave={() => {setOnHoverMac('brightness(1)'); setSquareEffect('0'); setTimeout(() => {setSquareTransition('none')}, 400);}}
            >
                {/*the onMouseEnter and -Leave is for the fade effect on hover which was not possible in css and the background animation*/}
                <div className='download-banner-download-background' style={{filter: onHoverMac}}/>
                <img className='download-banner-download-icon' src={appleIcon} alt='mac-icon' style={{height: '42px'}}/>
                <span className='download-banner-download-text'>Download</span>
                <span className='download-banner-download-text-os'>for Mac</span>
            </button>

            {/*download icon*/}
            <img className='download-banner-icon' src={downloadIcon} alt='download-icon'/>

            {/*transition shape at the bottom*/}
            <div className='download-banner-bottom-transition'/>
            <div className='download-banner-bottom-transition-shape-left'/>
            <div className='download-banner-bottom-transition-shape-right'/>
            
        </section>
    );
}

export default DownloadBanner;
