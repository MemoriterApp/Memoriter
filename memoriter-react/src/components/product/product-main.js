import '../../styles/product/product-main.css';
import placeholderImage from '../../images/placeholder.jpeg';
import { AnimationOnScroll } from 'react-animation-on-scroll';

const ProductMain = () => {
    return (
        <div className='product-main'>

                <div className='product-main-container'>
                    <div className='product-main-container-sub'>
                        <AnimationOnScroll animateIn='product-main-animation-fade-in-right' animateOut='product-main-animation-fade-out-right'>
                        {/*AnimationOnScroll starts an animation when it enters the viewport*/}
                            <h1 className='product-main-header'>Placeholder Header</h1>
                            <p className='product-main-text'>
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                            </p>
                        </AnimationOnScroll>
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
                    <AnimationOnScroll animateIn='product-main-animation-fade-in-left' animateOut='product-main-animation-fade-out-left'>
                    {/*AnimationOnScroll starts an animation when it enters the viewport*/}
                        <h1 className='product-main-header'>Placeholder Header</h1>
                        <p className='product-main-text'>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                        </p>
                    </AnimationOnScroll>
                </div>
            </div>

            <div className='product-main-container'>
                <div className='product-main-container-sub'>
                    <AnimationOnScroll animateIn='product-main-animation-fade-in-right' animateOut='product-main-animation-fade-out-right'>
                    {/*AnimationOnScroll starts an animation when it enters the viewport*/}
                        <h1 className='product-main-header'>Placeholder Header</h1>
                        <p className='product-main-text'>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                        </p>
                    </AnimationOnScroll>
                </div>
                <div className='product-main-container-sub-image'>
                    <img className='product-main-image' src={placeholderImage} alt='placeholder'/>
                </div>
            </div>

        </div>
    );
}

export default ProductMain;