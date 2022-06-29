import '../../styles/cookie-banner/cookie-banner-settings.css';

const CookieBannerSettings = () => {
    return (
        <div className='cookie-banner-settings-backdrop'>
            <div className='cookie-banner-settings'>

            <label class='cookie-banner-settings-switch'>
                <input type='checkbox'/>
                <div className='cookie-banner-settings-switch-slider'></div>
            </label>


            </div>
        </div>
    );
}

export default CookieBannerSettings;