import phone from '../../../images/website/download/phone.png';
import phoneContent from '../../../images/website/download/phone-content.jpeg';
import googlePlayButton from '../../../images/website/download/google-play-button.svg';
import appStoreButton from '../../../images/website/download/app-store-button.svg';

const DownloadMobile = () => {
    return (
        <section className='download-mobile'>
        
            {/*mobile phone image with content*/}
            <div className='download-mobile-phone-image'>
                <img className='download-mobile-phone-image-outside' src={phone} alt='mobile-phone'/>
                <img className='download-mobile-phone-image-content' src={phoneContent} alt='mobile-phone-content'/>
            </div>

            {/*content text*/}
            <div>

                <h2 className='download-mobile-heading'>Mobile App</h2>

                <h3 className='download-mobile-content-heading'>Experience the efficiency and flexibility of Memoriter &#8212; to go</h3> {/*&#8212; is a unicode dash symbol*/}

                <article className='download-mobile-content-text'>
                    <p>
                        The Memoriter mobile app brings all web and desktop features to the phone.
                    </p>
                    <ul>
                        <li>Phone and tablet support</li>
                        <li>Data synced to web and desktop app</li>
                        <li>Notes, study mode and all other tools you need</li>
                    </ul>
                </article>
                    
                {/*play store and app store links*/}
                <div className='download-mobile-buttons'>
                    <a href='https://play.google.com/store/' target='_blank' rel='noreferrer'>
                        <img src={googlePlayButton} alt='google-play-button'/>
                    </a>
                    <a href='https://www.apple.com/app-store/' target='_blank' rel='noreferrer'>
                        <img src={appStoreButton} alt='app-store-button'/>
                    </a>
                </div>

            </div>

        </section>
    );
}

export default DownloadMobile;