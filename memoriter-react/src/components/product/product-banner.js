import '../../styles/product-banner.css';
import productBannerWave from '../../images/product-banner-wave.svg';

const ProductBanner = () => {
    return (
        <div className='product-banner'>
            <img className='product-banner-wave' src={productBannerWave} alt='wave'/>
            <img className='product-banner-wave-transparent' src={productBannerWave} alt='wave-transparent'/>
        </div>
    );
}

export default ProductBanner;