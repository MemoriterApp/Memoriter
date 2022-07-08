import '../../styles/cookie-banner/cookie-banner-settings.css';
import { useState } from 'react';

const CookieBannerSettings = ({ onAccept }) => {

    const [onHover, setOnHover] = useState('brightness(1)'); //variable for the hover effect for the accept all button

    return (
        <div className='cookie-banner-settings-backdrop'>
            <div className='cookie-banner-settings'>

            <p className='cookie-banner-settings-title'>Cookie Settings</p>

            <p className='cookie-banner-settings-description'>
                We use cookies and similar technologies on our website to process personal data.
                We might also share this data with third parties.
                Data processing may be done with your consent or on the basis of a legitimate interest.
                You have the right to consent to essential services only and to modify your consent at a later time in the cookie settings.
            </p>

            {/*strictly necessary cookies switch*/}
            <div className='cookie-banner-settings-container'>
                <p className='cookie-banner-settings-label'>Strictly Necessary Cookies</p>
                {/*toggle slider*/}
                <label className='cookie-banner-settings-switch'>
                    <input type='checkbox'/>
                    <div className='cookie-banner-settings-switch-slider-static'/>
                </label>
                <p className='cookie-banner-settings-info'>
                    These Cookies are essential for the basic functionality of the site to work.
                    They are technically necessary and cannot be disabled.
                </p>
            </div>

            {/*functional cookies switch*/}
            <div className='cookie-banner-settings-container'>
                <p className='cookie-banner-settings-label'>Functional Cookies</p>
                {/*toggle slider*/}
                <label className='cookie-banner-settings-switch'>
                    <input type='checkbox'/>
                    <div className='cookie-banner-settings-switch-slider'/>
                </label>
                <p className='cookie-banner-settings-info'>
                    Functional cookies provide enhanced features and preferences to provide a better experience when using the site.
                </p>
            </div>

            {/*analytics cookies switch*/}
            <div className='cookie-banner-settings-container'>
                <p className='cookie-banner-settings-label'>Analytics Cookies</p>
                {/*toggle slider*/}
                <label className='cookie-banner-settings-switch'>
                    <input type='checkbox'/>
                    <div className='cookie-banner-settings-switch-slider'/>
                </label>
                <p className='cookie-banner-settings-info'>
                    These cookies collect data used to analyze the visitors behavior for optimizing and improving the website.
                </p>
            </div>

            {/*advertising cookies switch*/}
            <div className='cookie-banner-settings-container'>
                <p className='cookie-banner-settings-label'>Advertising Cookies</p>
                {/*toggle slider*/}
                <label className='cookie-banner-settings-switch'>
                    <input type='checkbox'/>
                    <div className='cookie-banner-settings-switch-slider'/>
                </label>
                <p className='cookie-banner-settings-info'>
                    These cookies are used for marketing services (e.g targeted advertising).
                </p>
            </div>

            {/*button for saving changes*/}
            <div className='cookie-banner-settings-save' onClick={() => onAccept()}>
                <span className='cookie-banner-settings-save-text'>Save Current</span>
            </div>

            {/*button for accepting all cookies*/}
            <div className='cookie-banner-settings-accept'
                onMouseEnter={() => setOnHover('brightness(0.75)')} 
                onMouseLeave={() => setOnHover('brightness(1)')}
                onClick={() => onAccept()}>
                {/*the onMouseEnter and -Leave is for the fade effect on hover which was not possible in css and the background animation, onClick accepts cookies*/}
                <div className='cookie-banner-settings-accept-background' style={{filter: onHover}}/>
                <span className='cookie-banner-settings-accept-text'>Accept All</span>
            </div>

            </div>
        </div>
    );
}

export default CookieBannerSettings;