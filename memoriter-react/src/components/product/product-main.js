import '../../styles/product/product-main.css';
import placeholderImage from '../../images/placeholder.jpeg';

const ProductMain = () => {
    return (
        <div className='product-main'>

            <div className='product-main-container'>
                <div className='product-main-container-sub'>
                    <h1 className='product-main-header'>Placeholder Header</h1>
                    <p className='product-main-text'>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                    </p>
                </div>
                <div className='product-main-container-sub-image'>
                    <img className='product-main-image' src={placeholderImage} alt='placeholder'/>
                </div>
            </div>

            <div className='product-main-container'>
                <div className='product-main-container-sub-image'>
                    <img className='product-main-image' src={placeholderImage} alt='placeholder'/>
                </div>
                <div className='product-main-container-sub'>
                    <h1 className='product-main-header'>Placeholder Header</h1>
                    <p className='product-main-text'>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                    </p>
                </div>
            </div>

            <div className='product-main-container'>
                <div className='product-main-container-sub'>
                    <h1 className='product-main-header'>Placeholder Header</h1>
                    <p className='product-main-text'>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                    </p>
                </div>
                <div className='product-main-container-sub-image'>
                    <img className='product-main-image' src={placeholderImage} alt='placeholder'/>
                </div>
            </div>

        </div>
    );
}

export default ProductMain;