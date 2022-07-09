import '../../styles/cookie-banner/cookie-settings.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CookieSettings = () => {

    const [onHover, setOnHover] = useState('brightness(1)'); //variable for the hover effect for the accept all button

    return (
        <div className='cookie-settings-backdrop'>
            <div className='cookie-settings'>

            <div className='cookie-settings-title'>
                <p className='cookie-settings-title-text'>Cookie Settings</p>
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
                        <p className='cookie-settings-label'>Strictly Necessary Cookies</p>
                        <p className='cookie-settings-label-description'>
                            These Cookies are essential for the basic functionality of the site to work.
                            They are technically necessary and cannot be disabled.
                        </p>
                        {/*toggle slider*/}
                        <label className='cookie-settings-switch'>
                            <input type='checkbox'/>
                            <div className='cookie-settings-switch-slider-static'/>
                        </label>
                    </div>
                    {/*functional cookies switch*/}
                    <div>
                        <p className='cookie-settings-label'>Functional Cookies</p>
                        <p className='cookie-settings-label-description'>
                            Functional cookies provide enhanced features and preferences to provide a better experience when using the site.
                        </p>
                        {/*toggle slider*/}
                        <label className='cookie-settings-switch'>
                            <input type='checkbox'/>
                            <div className='cookie-settings-switch-slider'/>
                        </label>
                    </div>
                    {/*analytics cookies switch*/}
                    <div>
                        <p className='cookie-settings-label'>Analytics Cookies</p>
                        <p className='cookie-settings-label-description'>
                            These cookies collect data used to analyze the visitors behavior for optimizing and improving the website.
                        </p>
                        {/*toggle slider*/}
                        <label className='cookie-settings-switch'>
                            <input type='checkbox'/>
                            <div className='cookie-settings-switch-slider'/>
                        </label>
                    </div>
                    {/*advertising cookies switch*/}
                    <div>
                        <p className='cookie-settings-label'>Advertising Cookies</p>
                        <p className='cookie-settings-label-description'>
                            These cookies are used for marketing services (for instance they are used for targeted advertising).
                        </p>
                        {/*toggle slider*/}
                        <label className='cookie-settings-switch'>
                            <input type='checkbox'/>
                            <div className='cookie-settings-switch-slider'/>
                        </label>
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
                <div className='cookie-settings-save'>
                    <span className='cookie-settings-save-text'>Save Current</span>
                </div>
                {/*button for accepting all cookies*/}
                <div className='cookie-settings-accept'
                    onMouseEnter={() => setOnHover('brightness(0.75)')} onMouseLeave={() => setOnHover('brightness(1)')}>
                    {/*the onMouseEnter and -Leave is for the fade effect on hover which was not possible in css and the background animation.*/}
                    <div className='cookie-settings-accept-background' style={{filter: onHover}}/>
                    <span className='cookie-settings-accept-text'>Accept All</span>
                </div>
            </div>

            </div>
        </div>
    );
}

export default CookieSettings;