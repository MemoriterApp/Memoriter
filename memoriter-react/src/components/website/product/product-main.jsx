import lightBulbIconGradient from '../../../images/website/product/light-bulb.svg';
import placeholderImage from '../../../images/website/product/placeholder.jpeg';
import { AnimationOnScroll } from 'react-animation-on-scroll';

const ProductMain = () => {
    return (
        <section className='product-main'>

            {/*three small overview items*/}
            <section className='product-main-overview'>

                <article>
                    <img className='product-main-overview-image' src={lightBulbIconGradient} alt='light-bulb'/>
                    <p className='product-main-overview-text'>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                    </p>
                </article>

                <article>
                    <img className='product-main-overview-image' src={placeholderImage} alt='placeholder'/>
                    <p className='product-main-overview-text'>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                    </p>
                </article>

                <article>
                    <img className='product-main-overview-image' src={placeholderImage} alt='placeholder'/>
                    <p className='product-main-overview-text'>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                    </p>
                </article>
                
            </section>

            {/*main parts with texts and images*/}
            <article className='product-main-container'>
                <div className='product-main-container-sub'>
                    <AnimationOnScroll animateIn='product-main-animation-fade-in-right' animateOut='product-main-animation-fade-out-right'>
                    {/*AnimationOnScroll starts an animation when it enters the viewport*/}
                        <h1 className='product-main-heading'>The all-in-one learning environment.</h1>
                        <p className='product-main-text'>
                            Memoriter is a program combining the information storage capacity of a note-taking tool with the practical advantages of a flashcard learning system,
                            creating the ultimate all-in-one learning environment.
                        </p>
                    </AnimationOnScroll>
                </div>
                <div className='product-main-container-sub-image'>
                    <img className='product-main-image' src={placeholderImage} alt='placeholder'/>
                </div>
            </article>
            
            <article className='product-main-container'>
                <div className='product-main-container-sub-image'>
                    <img className='product-main-image' src={placeholderImage} alt='placeholder'/>
                </div>
                <div className='product-main-container-sub'>
                    <AnimationOnScroll animateIn='product-main-animation-fade-in-left' animateOut='product-main-animation-fade-out-left'>
                    {/*AnimationOnScroll starts an animation when it enters the viewport*/}
                        <h1 className='product-main-heading'>Placeholder Heading</h1>
                        <p className='product-main-text'>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                        </p>
                    </AnimationOnScroll>
                </div>
            </article>

            <article className='product-main-container'>
                <div className='product-main-container-sub'>
                    <AnimationOnScroll animateIn='product-main-animation-fade-in-right' animateOut='product-main-animation-fade-out-right'>
                    {/*AnimationOnScroll starts an animation when it enters the viewport*/}
                        <h1 className='product-main-heading'>Placeholder Heading</h1>
                        <p className='product-main-text'>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                        </p>
                    </AnimationOnScroll>
                </div>
                <div className='product-main-container-sub-image'>
                    <img className='product-main-image' src={placeholderImage} alt='placeholder'/>
                </div>
            </article>

        </section>
    );
};

export default ProductMain;