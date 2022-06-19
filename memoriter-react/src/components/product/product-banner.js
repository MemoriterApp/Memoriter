import '../../styles/product-banner.css';
import productBannerWave from '../../images/product-banner-wave.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductBanner = () => {

    const [onHover, setOnHover] = useState('brightness(1)'); //variable for the hover effect for the get started button

    return (
        <div className='product-banner'>

            {/*slogan*/}
            <p className='product-banner-text'>The all-in-one<br/>learning environment</p>

            {/*get started button for redirecting to register page*/}
            <Link className='product-banner-get-started' to='/signup'
                onMouseEnter={() => setOnHover('brightness(0.75)')} onMouseLeave={() => setOnHover('brightness(1)')}>
                {/*the onMouseEnter and -Leave is for the fade effect on hover which was not possible in css*/}
                <div className='product-banner-get-started-background' style={{filter: onHover}}/>
                <span className='product-banner-get-started-text'>Get Started!</span>
            </Link>

            {/*animated wave at the bottom*/}
            <img className='product-banner-wave' src={productBannerWave} alt='wave'/>
            <img className='product-banner-wave-transparent' src={productBannerWave} alt='wave-transparent'/>

        </div>
    );
}

export default ProductBanner;