import placeholderImage from '../../../images/website/about/placeholder.jpeg';
import { AnimationOnScroll } from 'react-animation-on-scroll';

const AboutMain = () => {
    return (
        <section className='about-main'> {/*main parts with texts and images*/}

            <article className='about-main-container' style={{marginTop: '160px'}}>
                <div className='about-main-container-sub'>
                    <AnimationOnScroll animateIn='about-main-animation-fade-in-right' animateOut='about-main-animation-fade-out-right'>
                    {/*AnimationOnScroll starts an animation when it enters the viewport*/}
                        <h1 className='about-main-heading'>Who we are.</h1>
                        <p className='about-main-text'>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                        </p>
                    </AnimationOnScroll>
                </div>
                <div className='about-main-container-sub-image'>
                    <img className='about-main-image' src={placeholderImage} alt='placeholder'/>
                </div>
            </article>
            <article className='about-main-container'>
                <div className='about-main-container-sub'>
                    <AnimationOnScroll animateIn='about-main-animation-fade-in-right' animateOut='about-main-animation-fade-out-right'>
                    {/*AnimationOnScroll starts an animation when it enters the viewport*/}
                        <p className='about-main-text'>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                        </p>
                    </AnimationOnScroll>
                </div>
                <div className='about-main-container-sub-image'>
                    <img className='about-main-image' src={placeholderImage} alt='placeholder'/>
                </div>
            </article>

            <article className='about-main-container' style={{marginTop: '240px'}}>
                <div className='about-main-container-sub-image'>
                    <img className='about-main-image' src={placeholderImage} alt='placeholder'/>
                </div>
                <div className='about-main-container-sub'>
                    <AnimationOnScroll animateIn='about-main-animation-fade-in-left' animateOut='about-main-animation-fade-out-left'>
                    {/*AnimationOnScroll starts an animation when it enters the viewport*/}
                        <h1 className='about-main-heading'>Placeholder Heading</h1>
                        <p className='about-main-text'>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                        </p>
                    </AnimationOnScroll>
                </div>
            </article>
            <article className='about-main-container'>
                <div className='about-main-container-sub-image'>
                    <img className='about-main-image' src={placeholderImage} alt='placeholder'/>
                </div>
                <div className='about-main-container-sub'>
                    <AnimationOnScroll animateIn='about-main-animation-fade-in-left' animateOut='about-main-animation-fade-out-left'>
                    {/*AnimationOnScroll starts an animation when it enters the viewport*/}
                        <p className='about-main-text'>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                        </p>
                    </AnimationOnScroll>
                </div>
            </article>

            <AnimationOnScroll animateIn='about-main-animation-fade-in-down' animateOut='about-main-animation-fade-out-down'>
                <p className='about-main-bottom'>
                    Lorem <span>ipsum</span> dolor sit amet, consetetur <span>sadipscing</span> elitr.
                </p>
            </AnimationOnScroll>

        </section>
    );
}

export default AboutMain;