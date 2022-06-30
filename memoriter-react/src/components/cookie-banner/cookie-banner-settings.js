import '../../styles/cookie-banner/cookie-banner-settings.css';

const CookieBannerSettings = () => {
    return (
        <div className='cookie-banner-settings-backdrop'>
            <div className='cookie-banner-settings'>

            <div className='cookie-banner-settings-container'>
                <p className='cookie-banner-settings-label'>Strictly Necessary Cookies</p>
                {/*toggle slider*/}
                <label class='cookie-banner-settings-switch'>
                    <input type='checkbox'/>
                    <div className='cookie-banner-settings-switch-slider'></div>
                </label>
            </div>

            <div className='cookie-banner-settings-container'>
                <p className='cookie-banner-settings-label'>Functional Cookies</p>
                {/*toggle slider*/}
                <label class='cookie-banner-settings-switch'>
                    <input type='checkbox'/>
                    <div className='cookie-banner-settings-switch-slider'></div>
                </label>
            </div>

            <div className='cookie-banner-settings-container'>
                <p className='cookie-banner-settings-label'>Analytics Cookies</p>
                {/*toggle slider*/}
                <label class='cookie-banner-settings-switch'>
                    <input type='checkbox'/>
                    <div className='cookie-banner-settings-switch-slider'></div>
                </label>
            </div>

            <div className='cookie-banner-settings-container'>
                <p className='cookie-banner-settings-label'>Advertising Cookies</p>
                {/*toggle slider*/}
                <label class='cookie-banner-settings-switch'>
                    <input type='checkbox'/>
                    <div className='cookie-banner-settings-switch-slider'></div>
                </label>
            </div>

            </div>
        </div>
    );
}

export default CookieBannerSettings;