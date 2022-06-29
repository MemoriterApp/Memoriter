import '../../styles/cookie-banner/cookie-banner.css';
import CookieBannerSettings from './cookie-banner-settings';
import { useState } from 'react';

const CookieBanner = () => {

    const [onHover, setOnHover] = useState('brightness(1)'); //variable for the hover effect for the accept button
    
    const accepted = localStorage.getItem('cookies-accepted') //used for if the banner is first dieplayed or not

    const [display, setDisplay] = useState('-180px'); //variable for showing the cookie banner and the move animation
    if (accepted) { //if else is for only displaying it before accepting cookies
        if (display === '0') {
            setDisplay('-180px'); //if accepted, the banner is hidden
        }
    } else {
        setTimeout(() => {setDisplay('0'); }, 600); //executing move animation
    }

    function acceptCookies() { //item is set in local storage for cookie banner not showng again if accepted
        setDisplay('-180px');
        localStorage.setItem('cookies-accepted', true);
    }

    const [openSettings, setOpenSettings] = useState(false); //state for settings modal when clicking at the more-information-button

    return (
        <div className='cookie-banner' style={{bottom: display}}> {/*style is for if the banner is shown or not*/}

            {/*cookie banner text*/}
            <p className='cookie-banner-text'>This website uses cookies for making the site work and to enhance your experience.</p>

            {/*accept and more information buttons*/}
            <div className='cookie-banner-more-information' to='/login'>
                <span className='cookie-banner-more-information-gradient' onClick={() => setOpenSettings(true)}>More Information</span>
            </div>
            <div className='cookie-banner-accept'
                onMouseEnter={() => setOnHover('brightness(0.75)')} onMouseLeave={() => setOnHover('brightness(1)')}
                onClick={acceptCookies}>
                {/*the onMouseEnter and -Leave is for the fade effect on hover which was not possible in css, the onClick accepts all cookies and closes the banner*/}
                <div className='cookie-banner-accept-background' style={{filter: onHover}}/>
                <span className='cookie-banner-accept-text'>Accept</span>
            </div>

            {/*settings modal opening when clicking the more-information-button*/}
            {openSettings && <CookieBannerSettings/>}

        </div>
    );
}

export default CookieBanner;
