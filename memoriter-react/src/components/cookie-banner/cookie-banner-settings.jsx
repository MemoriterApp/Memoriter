import '../../styles/cookie-banner/cookie-banner-settings.css';

const CookieBannerSettings = () => {
    return (
        <div className='cookie-banner-settings-backdrop'>
            <div className='cookie-banner-settings'>

            <p className='cookie-banner-settings-title'>Cookie Settings</p>

            <p className='cookie-banner-settings-description'>
                We use cookies and similar technologies on our website and process personal data.
                We might also share this data with third parties.
                Data processing may be done with your consent or on the basis of a legitimate interest.
                You have the right to consent to essential services only and to modify your consent at a later time in the cookie settings.
            </p>

            {/*strictly necessary cookies switch*/}
            <div className='cookie-banner-settings-container'>
                <p className='cookie-banner-settings-label'>Strictly Necessary Cookies</p>
                {/*toggle slider*/}
                <label class='cookie-banner-settings-switch'>
                    <input type='checkbox'/>
                    <div className='cookie-banner-settings-switch-slider'/>
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
                <label class='cookie-banner-settings-switch'>
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
                <label class='cookie-banner-settings-switch'>
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
                <label class='cookie-banner-settings-switch'>
                    <input type='checkbox'/>
                    <div className='cookie-banner-settings-switch-slider'/>
                </label>
                <p className='cookie-banner-settings-info'>
                    These cookies are used for marketing services (e.g targeted advertising).
                </p>
            </div>

            {/*button for saving changes*/}
            <div className='cookie-banner-settings-save'>Save Current</div>

            <div className='cookie-banner-settings-accept'>
                <div className='cookie-banner-settings-accept-background'/>
                <span className='cookie-banner-settings-accept-text'>Accept All</span>
            </div>

            </div>
        </div>
    );
}

export default CookieBannerSettings;