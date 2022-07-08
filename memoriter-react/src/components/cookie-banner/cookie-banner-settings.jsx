import '../../styles/cookie-banner/cookie-banner-settings.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CookieBannerSettings = ({ onAccept }) => {

    const [onHover, setOnHover] = useState('brightness(1)'); //variable for the hover effect for the accept all button

    //variables for showing more information for labels
    const [strictlyNecessaryInfo, setStrictlyNecessaryInfo] = useState({display: 'none'});
    const [functionalInfo, setFunctionalInfo] = useState({display: 'none'});
    const [analyticsInfo, setAnalyticsInfo] = useState({display: 'none'});
    const [advertisingInfo, setAdvertisingInfo] = useState({display: 'none'});

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
                <p className='cookie-banner-settings-label'>
                    Strictly Necessary Cookies
                    <div className='cookie-banner-settings-label-more-info'
                        onMouseEnter={() => {
                            setStrictlyNecessaryInfo({display: 'block', transform: 'translate(calc(-50% + 202px), calc(-50% + 56px))', opacity: '0'});
                            setTimeout(() => {setStrictlyNecessaryInfo({display: 'block', transform: 'translate(calc(-50% + 202px), calc(-50% + 56px))', opacity: '1'})}, 0);
                        }}
                        onMouseLeave={() => {
                            setStrictlyNecessaryInfo({display: 'block', transform: 'translate(calc(-50% + 202px), calc(-50% + 56px))', opacity: '0'});
                            setTimeout(() => {setStrictlyNecessaryInfo({display: 'none'})}, 400);
                        }}>
                        {/*the onMouseEnter and -Leave is for showing and hiding the more information box*/}
                        <span className='cookie-banner-settings-label-more-info-symbol'>i</span>
                    </div>
                </p>
                {/*toggle slider*/}
                <label className='cookie-banner-settings-switch'>
                    <input type='checkbox'/>
                    <div className='cookie-banner-settings-switch-slider-static'/>
                </label>
            </div>

            {/*functional cookies switch*/}
            <div className='cookie-banner-settings-container'>
                <p className='cookie-banner-settings-label'>
                    Functional Cookies
                    <div className='cookie-banner-settings-label-more-info'
                        onMouseEnter={() => {
                            setFunctionalInfo({display: 'block', transform: 'translate(calc(-50% + 135px), calc(-50% + 102px))', opacity: '0'});
                            setTimeout(() => {setFunctionalInfo({display: 'block', transform: 'translate(calc(-50% + 135px), calc(-50% + 102px))', opacity: '1'})}, 0);
                        }}
                        onMouseLeave={() => {
                            setFunctionalInfo({display: 'block', transform: 'translate(calc(-50% + 135px), calc(-50% + 102px))', opacity: '0'});
                            setTimeout(() => {setFunctionalInfo({display: 'none'})}, 400);
                        }}>
                        {/*the onMouseEnter and -Leave is for showing and hiding the more information box*/}
                        <span className='cookie-banner-settings-label-more-info-symbol'>i</span>
                    </div>
                </p>
                {/*toggle slider*/}
                <label className='cookie-banner-settings-switch'>
                    <input type='checkbox'/>
                    <div className='cookie-banner-settings-switch-slider'/>
                </label>
            </div>

            {/*analytics cookies switch*/}
            <div className='cookie-banner-settings-container'>
                <p className='cookie-banner-settings-label'>
                    Analytics Cookies
                    <div className='cookie-banner-settings-label-more-info'
                        onMouseEnter={() => {
                            setAnalyticsInfo({display: 'block', transform: 'translate(calc(-50% + 123px), calc(-50% + 161px))', opacity: '0'});
                            setTimeout(() => {setAnalyticsInfo({display: 'block', transform: 'translate(calc(-50% + 123px), calc(-50% + 161px))', opacity: '1'})}, 0);
                        }}
                        onMouseLeave={() => {
                            setAnalyticsInfo({display: 'block', transform: 'translate(calc(-50% + 123px), calc(-50% + 161px))', opacity: '0'});
                            setTimeout(() => {setAnalyticsInfo({display: 'none'})}, 400);
                        }}>
                        {/*the onMouseEnter and -Leave is for showing and hiding the more information box*/}
                        <span className='cookie-banner-settings-label-more-info-symbol'>i</span>
                    </div>
                </p>
                {/*toggle slider*/}
                <label className='cookie-banner-settings-switch'>
                    <input type='checkbox'/>
                    <div className='cookie-banner-settings-switch-slider'/>
                </label>
            </div>

            {/*advertising cookies switch*/}
            <div className='cookie-banner-settings-container'>
                <p className='cookie-banner-settings-label'>
                    Advertising Cookies
                    <div className='cookie-banner-settings-label-more-info'
                        onMouseEnter={() => {
                            setAdvertisingInfo({display: 'block', transform: 'translate(calc(-50% + 143px), calc(-50% + 221px))', opacity: '0'});
                            setTimeout(() => {setAdvertisingInfo({display: 'block', transform: 'translate(calc(-50% + 143px), calc(-50% + 221px))', opacity: '1'})}, 0);
                        }}
                        onMouseLeave={() => {
                            setAdvertisingInfo({display: 'block', transform: 'translate(calc(-50% + 143px), calc(-50% + 221px))', opacity: '0'});
                            setTimeout(() => {setAdvertisingInfo({display: 'none'})}, 400);
                        }}>
                        {/*the onMouseEnter and -Leave is for showing and hiding the more information box*/}
                        <span className='cookie-banner-settings-label-more-info-symbol'>i</span>
                    </div>
                </p>
                {/*toggle slider*/}
                <label className='cookie-banner-settings-switch'>
                    <input type='checkbox'/>
                    <div className='cookie-banner-settings-switch-slider'/>
                </label>
            </div>

            <nav className='cookie-banner-settings-links'>
                <Link className='cookie-banner-settings-link' to='/privacy' target='_blank'>Privacy Policy</Link>
                <Link className='cookie-banner-settings-link' to='/cookies' target='_blank'>Cookie Policy</Link>
                <Link className='cookie-banner-settings-link' to='/impressum' target='_blank'>Impressum</Link>
            </nav>

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

            {/*descriptions are here due clipping problems*/}
            {/*strictly necessary cookies more info field*/}
            <div className='cookie-banner-settings-label-more-info-text'
                style={strictlyNecessaryInfo}> {/*style for position and visibility*/}
                These Cookies are essential for the basic functionality of the site to work.
                They are technically necessary and cannot be disabled.
            </div>
            {/*functional cookies more info field*/}
            <div className='cookie-banner-settings-label-more-info-text'
                style={functionalInfo}> {/*style for position and visibility*/}
                Functional cookies provide enhanced features and preferences to provide a better experience when using the site.
            </div>
            {/*analytics cookies more info field*/}
            <div className='cookie-banner-settings-label-more-info-text'
                style={analyticsInfo}> {/*style for position and visibility*/}
                These cookies collect data used to analyze the visitors behavior for optimizing and improving the website.
            </div>
            {/*advertising cookies more info field*/}
            <div className='cookie-banner-settings-label-more-info-text'
                style={advertisingInfo}> {/*style for position and visibility*/}
                These cookies are used for marketing services (for instance they are used for targeted advertising).
            </div>

        </div>
    );
}

export default CookieBannerSettings;