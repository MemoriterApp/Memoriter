import '../../styles/product/product-main.css';
import placeholderImage from '../../images/placeholder.jpeg';
import ScrollAnimation from 'react-animate-on-scroll';

const ProductMain = () => {
    return (
        <div className='product-main'>

            <div className='product-main-container'>
                <div className='product-main-container-sub'>
                    <ScrollAnimation animateIn='product-main-animation-fade-in-right' animateOut='product-main-animation-fade-out-right'>
                    {/*ScrollAnimation starts an animation when it enters the viewport*/}
                        <h1 className='product-main-header'>The all-in-one learning environment.</h1>
                        <p className='product-main-text'>
                            Memoriter is a program combining the information storage capacity of a note-taking tool with the practical advantages of a flashcard learning system,
                            creating the ultimate all-in-one learning environment.
                        </p>
                    </ScrollAnimation>
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
                    <ScrollAnimation animateIn='product-main-animation-fade-in-left' animateOut='product-main-animation-fade-out-left'>
                    {/*ScrollAnimation starts an animation when it enters the viewport*/}
                        <h1 className='product-main-header'>Placeholder Header</h1>
                        <p className='product-main-text'>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                        </p>
                    </ScrollAnimation>
                </div>
            </div>

            <div className='product-main-container'>
                <div className='product-main-container-sub'>
                    <ScrollAnimation animateIn='product-main-animation-fade-in-right' animateOut='product-main-animation-fade-out-right'>
                    {/*ScrollAnimation starts an animation when it enters the viewport*/}
                        <h1 className='product-main-header'>Placeholder Header</h1>
                        <p className='product-main-text'>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                        </p>
                    </ScrollAnimation>
                </div>
                <div className='product-main-container-sub-image'>
                    <img className='product-main-image' src={placeholderImage} alt='placeholder'/>
                </div>
            </div>

        </div>
    );
}

export default ProductMain;