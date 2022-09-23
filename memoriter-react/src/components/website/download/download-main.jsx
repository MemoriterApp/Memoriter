import placeholderImage from '../../../images/website/download/placeholder.jpeg';
import ScrollAnimation from 'react-animate-on-scroll';

const DownloadMain = () => {
    return (
        <section className='download-main'>

            <h1 className='download-main-title'>Download Memoriter</h1>
            <p className='download-main-top-text'>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            </p>
            <img className='download-main-top-image' src={placeholderImage} alt='placeholder'/>

            <article className='download-main-container'>
                <div className='download-main-container-sub-image'>
                    <img className='download-main-image' src={placeholderImage} alt='placeholder'/>
                </div>
                <div className='download-main-container-sub'>
                    <ScrollAnimation animateIn='download-main-animation-fade-in-left' animateOut='download-main-animation-fade-out-left'>
                    {/*ScrollAnimation starts an animation when it enters the viewport*/}
                        <h1 className='download-main-heading'>Placeholder Heading</h1>
                        <p className='download-main-text'>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                        </p>
                    </ScrollAnimation>
                </div>
            </article>

            <article className='download-main-container'>
                <div className='download-main-container-sub'>
                    <ScrollAnimation animateIn='download-main-animation-fade-in-right' animateOut='download-main-animation-fade-out-right'>
                    {/*ScrollAnimation starts an animation when it enters the viewport*/}
                        <h1 className='download-main-heading'>Placeholder Heading</h1>
                        <p className='download-main-text'>
                            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
                        </p>
                    </ScrollAnimation>
                </div>
                <div className='download-main-container-sub-image'>
                    <img className='download-main-image' src={placeholderImage} alt='placeholder'/>
                </div>
            </article>

        </section>
    );
}

export default DownloadMain;