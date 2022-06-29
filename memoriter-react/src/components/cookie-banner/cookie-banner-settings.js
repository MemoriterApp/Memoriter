import '../../styles/cookie-banner/cookie-banner-settings.css';

const CookieBannerSettings = () => {
    return (
        <div className='cookie-banner-settings-backdrop'>
            <div className='cookie-banner-settings'>

            <div>
                <p>Strictly Necessary Cookies</p>
                {/*toggle slider*/}
                <label class='cookie-banner-settings-switch'>
                    <input type='checkbox'/>
                    <div className='cookie-banner-settings-switch-slider'></div>
                </label>
            </div>

            <div>
                <p>Functional Cookies</p>
                {/*toggle slider*/}
                <label class='cookie-banner-settings-switch'>
                    <input type='checkbox'/>
                    <div className='cookie-banner-settings-switch-slider'></div>
                </label>
            </div>

            <div>
                <p>Analytics Cookies</p>
                {/*toggle slider*/}
                <label class='cookie-banner-settings-switch'>
                    <input type='checkbox'/>
                    <div className='cookie-banner-settings-switch-slider'></div>
                </label>
            </div>

            <div>
                <p>Advertising Cookies</p>
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