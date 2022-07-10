import '../../styles/cookie-banner/cookie-settings.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CookieSettings = ({ onAnimation, onCloseCookieSettings }) => {

    const [onHover, setOnHover] = useState('brightness(1)'); //variable for the hover effect for the accept all button

    const animationStyles = onAnimation;

    function acceptCookies() { //item is set in local storage for cookie banner not showng again if accepted
        localStorage.setItem('cookies-accepted', true);
        onCloseCookieSettings();
    }

    return (
        <>
            <div className='cookie-settings' style={animationStyles}>

                <div className='cookie-settings-title'>
                    <p className='cookie-settings-title-text'>Cookie Settings</p>
                    <div className='cookie-settings-close' onClick={() => onCloseCookieSettings()}/>
                </div>

                <div className='cookie-settings-scroll'>

                    <p className='cookie-settings-description'>
                        We use cookies and similar technologies on our website to process personal data.
                        We might also share this data with third parties.
                        Data processing may be done with your consent or on the basis of a legitimate interest.
                        You have the right to consent to essential services only and to modify your consent at a later time in the cookie settings.
                    </p>

                    {/*container with toggle switches*/}
                    <div className='cookie-settings-container'>
                        {/*strictly necessary cookies switch*/}
                        <div>
                            <div>
                                <p className='cookie-settings-label'>Strictly Necessary Cookies</p>
                                {/*toggle slider*/}
                                <label className='cookie-settings-switch'>
                                    <input type='checkbox'/>
                                    <div className='cookie-settings-switch-slider-static'/>
                                </label>
                            </div>
                            <p className='cookie-settings-label-description'>
                                These Cookies are essential for the basic functionality of the site to work.
                                They are technically necessary and cannot be disabled.
                            </p>
                        </div>
                        {/*functional cookies switch*/}
                        <div>
                            <div>
                                <p className='cookie-settings-label'>Functional Cookies</p>
                                {/*toggle slider*/}
                                <label className='cookie-settings-switch'>
                                    <input type='checkbox'/>
                                    <div className='cookie-settings-switch-slider'/>
                                </label>
                            </div>
                            <p className='cookie-settings-label-description'>
                                Functional cookies provide enhanced features and preferences to provide a better experience when using the site.
                            </p>
                        </div>
                        {/*analytics cookies switch*/}
                        <div>
                            <div>
                                <p className='cookie-settings-label'>Analytics Cookies</p>
                                {/*toggle slider*/}
                                <label className='cookie-settings-switch'>
                                    <input type='checkbox'/>
                                    <div className='cookie-settings-switch-slider'/>
                                </label>
                            </div>
                            <p className='cookie-settings-label-description'>
                                These cookies collect data used to analyze the visitors behavior for optimizing and improving the website.
                            </p>
                        </div>
                        {/*advertising cookies switch*/}
                        <div>
                            <div>
                                <p className='cookie-settings-label'>Advertising Cookies</p>
                                {/*toggle slider*/}
                                <label className='cookie-settings-switch'>
                                    <input type='checkbox'/>
                                    <div className='cookie-settings-switch-slider'/>
                                </label>
                            </div>
                            <p className='cookie-settings-label-description'>
                                These cookies are used for marketing services (for instance they are used for targeted advertising).
                            </p>
                        </div>
                        <nav className='cookie-settings-links'>
                            <Link className='cookie-settings-link' to='/privacy' target='_blank'>Privacy Policy</Link>
                            <Link className='cookie-settings-link' to='/cookies' target='_blank'>Cookie Policy</Link>
                            <Link className='cookie-settings-link' to='/impressum' target='_blank'>Impressum</Link>
                        </nav>
                    </div>

                </div>

                <div className='cookie-settings-buttons'>
                    {/*button for saving changes*/}
                    <div className='cookie-settings-save' onClick={acceptCookies}>
                        <span className='cookie-settings-save-text'>Save Current</span>
                    </div>
                    {/*button for accepting all cookies*/}
                    <div className='cookie-settings-accept' onClick={acceptCookies}
                        onMouseEnter={() => setOnHover('brightness(0.75)')} onMouseLeave={() => setOnHover('brightness(1)')}>
                        {/*the onMouseEnter and -Leave is for the fade effect on hover which was not possible in css and the background animation.*/}
                        <div className='cookie-settings-accept-background' style={{filter: onHover}}/>
                        <span className='cookie-settings-accept-text'>Accept All</span>
                    </div>
                </div>

            </div>
        </>
    );
}

export default CookieSettings;