import '../../styles/product/product-main.css';
import placeholderImage from '../../pages/Memoriter_Katze.jpeg';

const ProductMain = () => {
    return (
        <div className='product-main' style={{top: '100%'}}> {/*the height style is for displaying the section correctly under the banner*/}

            <div className='product-main-container'>
                <div className='product-main-container-sub'>
                    <h1 className='product-main-header'>Placeholder Header</h1>
                    <p className='product-main-text'>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                    </p>
                </div>
                <div className='product-main-container-sub-image'>
                    <img className='product-main-image' src={placeholderImage} alt='placeholder-screenshot'/>
                </div>
            </div>

            <div className='product-main-container'>
                <div className='product-main-container-sub-image'>
                    <img className='product-main-image' src={placeholderImage} alt='placeholder-screenshot'/>
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
                    <img className='product-main-image' src={placeholderImage} alt='placeholder-screenshot'/>
                </div>
            </div>

        </div>
    );
}

export default ProductMain;