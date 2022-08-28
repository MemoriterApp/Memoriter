import '../../../styles/download/download-desktop.css';
import windowsIcon from '../../../images/icons/windows-icon.svg';
import appleIcon from '../../../images/icons/apple-icon.svg';
import notebook from '../../../images/website/download/notebook.png';
import notebookContent from '../../../images/website/download/notebook-content.jpeg';
import { useState } from 'react';

const DownloadDesktop = () => {

    const [onHoverWindows, setOnHoverWindows] = useState('brightness(1)'); //variable for the hover effect for the download for windows button
    const [onHoverMac, setOnHoverMac] = useState('brightness(1)'); //variable for the hover effect for the download for mac button

    return (
        <section className='download-desktop' >

            {/*content text*/}
            <div className='download-desktop-content-text'>

                <h2 className='download-desktop-heading'>Desktop App</h2>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, eligendi vero?</p>

                {/*download button for windows*/}
                <button className='download-desktop-download'
                    onMouseEnter={() => setOnHoverWindows('brightness(0.75)')} onMouseLeave={() => setOnHoverWindows('brightness(1)')}>
                {/*the onMouseEnter and -Leave is for the fade effect on hover which was not possible in css and the background animation*/}
                    <div className='download-desktop-download-background' style={{filter: onHoverWindows}}/>
                    <img className='download-desktop-download-icon' src={windowsIcon} alt='windows-icon' style={{height: '36px'}}/>
                    <span className='download-desktop-download-text'>Download</span>
                    <span className='download-desktop-download-text-os'>for Windows</span>
                </button>

                {/*download button for mac*/}
                <button className='download-desktop-download'
                    onMouseEnter={() => setOnHoverMac('brightness(0.75)')} onMouseLeave={() => setOnHoverMac('brightness(1)')}>
                {/*the onMouseEnter and -Leave is for the fade effect on hover which was not possible in css and the background animation*/}
                    <div className='download-desktop-download-background' style={{filter: onHoverMac}}/>
                    <img className='download-desktop-download-icon' src={appleIcon} alt='mac-icon' style={{height: '48px'}}/>
                    <span className='download-desktop-download-text'>Download</span>
                    <span className='download-desktop-download-text-os'>for Mac</span>
                </button>

            </div>

            {/*notebook image with content*/}
            <div className='download-desktop-notebook-image'>
                <img className='download-desktop-notebook-image-outside' src={notebook} alt='notebook'/>
                <img className='download-desktop-notebook-image-content' src={notebookContent} alt='notebook-content'/>
            </div>

        </section>
    );
}

export default DownloadDesktop;