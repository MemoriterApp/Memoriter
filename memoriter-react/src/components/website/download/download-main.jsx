import windowsIcon from '../../../images/icons/windows-icon.svg';
import appleIcon from '../../../images/icons/apple-icon.svg';
import placeholderImage from '../../../images/website/download/placeholder.jpeg';
import { useState } from 'react';
import ScrollAnimation from 'react-animate-on-scroll';

const DownloadMain = () => {
    
    const [onHoverWindows, setOnHoverWindows] = useState('brightness(1)'); //variable for the hover effect for the download for windows button
    const [onHoverMac, setOnHoverMac] = useState('brightness(1)'); //variable for the hover effect for the download for mac button
    
    return (
        <section className='download-main'>

            <h1 className='download-main-title'>Download Memoriter</h1>
            <p className='download-main-top-text'>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
            </p>
            <img className='download-main-top-image' src={placeholderImage} alt='placeholder'/>

            <article className='download-main-container' style={{marginTop: '300px'}}>
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

            <article className='download-main-footer'>
                <p className='download-main-footer-text'>
                    Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                </p>
                {/*download button for windows*/}
                <button className='download-main-download download-main-download-windows' //two classes
                    onMouseEnter={() => setOnHoverWindows('brightness(0.75)')} onMouseLeave={() => setOnHoverWindows('brightness(1)')}>
                    {/*the onMouseEnter and -Leave is for the fade effect on hover which was not possible in css and the background animation*/}
                    <div className='download-main-download-background' style={{filter: onHoverWindows}}/>
                    <img className='download-main-download-icon' src={windowsIcon} alt='windows-icon' style={{height: '36px'}}/>
                    <span className='download-main-download-text'>Download</span>
                    <span className='download-main-download-text-os'>for Windows</span>
                </button>

                {/*download button for mac*/}
                <button className='download-main-download download-main-download-mac' //two classes
                    onMouseEnter={() => setOnHoverMac('brightness(0.75)')} onMouseLeave={() => setOnHoverMac('brightness(1)')}>
                    {/*the onMouseEnter and -Leave is for the fade effect on hover which was not possible in css and the background animation*/}
                    <div className='download-main-download-background' style={{filter: onHoverMac}}/>
                    <img className='download-main-download-icon' src={appleIcon} alt='mac-icon' style={{height: '42px'}}/>
                    <span className='download-main-download-text'>Download</span>
                    <span className='download-main-download-text-os'>for Mac</span>
                </button>
            </article>

        </section>
    );
}

export default DownloadMain;