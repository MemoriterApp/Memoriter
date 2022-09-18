import youtubeIcon from '../../../images/icons/youtube-icon.svg';
import twitterIcon from '../../../images/icons/twitter-icon.svg';
import instagramIcon from '../../../images/icons/instagram-icon.svg';
import newsletterIcon from '../../../images/icons/newsletter-icon.svg';
import { Link } from 'react-router-dom';

const WebsiteFooter = ({ onOpenCookieSettings }) => {
    return (
        <footer className='product-footer'>

            {/*transition shape at the top*/}
            <div className='product-footer-top-transition-shape-left'/>
            <div className='product-footer-top-transition-shape-right'/>

            {/*columns of content*/}
            <div className='product-footer-content'>

                {/*lists of footer links*/}
                <nav>
                    <p className='product-footer-header'>App</p>
                    <Link className='product-footer-link' to='/signin'>Sign In</Link>
                    <Link className='product-footer-link' to='/register'>Register</Link>
                    <Link className='product-footer-link' to='/download'>Download</Link>
                    <Link className='product-footer-link' to='/releases'>Release Notes</Link>
                </nav>

                <nav>
                    <p className='product-footer-header'>Company</p>
                    <Link className='product-footer-link' to='/product'>Product</Link>
                    <Link className='product-footer-link' to='/about'>About</Link>
                    <Link className='product-footer-link' to='/blog'>Blog</Link>
                    <Link className='product-footer-link' to='/donate'>Donate</Link>
                </nav>

                <nav>
                    <p className='product-footer-header'>Legal</p>
                    <Link className='product-footer-link' to='/impressum'>Impressum</Link>
                    <Link className='product-footer-link' to='/terms'>Terms of Use</Link>
                    <Link className='product-footer-link' to='/privacy'>Privacy Policy</Link>
                    <Link className='product-footer-link' to='/cookies'>Cookie Policy</Link>
                </nav>

                <nav>
                    <p className='product-footer-header'>Help</p>
                    <Link className='product-footer-link' to='/support'>Support</Link>
                    <Link className='product-footer-link' to='/faq'>FAQ</Link>
                    <Link className='product-footer-link' to='/bugs'>Bug Report</Link>
                    <span className='product-footer-link'  onClick={() => onOpenCookieSettings()}>Cookie Settings</span> {/*opens cookie settings banner*/}
                </nav>

                <nav> {/*mostly external links*/}
                    <p className='product-footer-header'>Follow Us</p>
                    <a className='product-footer-link' href='https://www.twitter.com/' target='_blank' rel='noreferrer'>Twitter</a>
                    <a className='product-footer-link' href='https://www.youtube.com/' target='_blank' rel='noreferrer'>YouTube</a>
                    <a className='product-footer-link' href='https://www.instagram.com/memorit.er/' target='_blank' rel='noreferrer'>Instagram</a>
                    <Link className='product-footer-link' to='/newsletter'>Newsletter</Link>
                </nav>

            </div>

            {/*box at the bottom with social media links and other buttons*/}
            <div className='product-footer-bottom-box'>
                <p className='product-footer-bottom-box-copyright'>©Copyright 2022 Memoriter</p>

                {/*right text uses two classes, one for the hover effect*/}
                <p className='product-footer-bottom-box-text product-footer-bottom-box-language'>Language: English</p>
                <p className='product-footer-bottom-box-text product-footer-bottom-box-visual-mode'>Visual Mode: Dark</p>

                {/*social media icons*/}
                <div className='product-footer-bottom-box-social-media-box'>
                    <a className='product-footer-bottom-box-social-media-circle' style={{left: '0'}}
                        href='https://www.twitter.com/' target='_blank' rel='noreferrer'>
                        <img className='product-footer-bottom-box-social-media-icon'
                            src={twitterIcon} alt='twitter-icon'/>
                    </a>
                    <a className='product-footer-bottom-box-social-media-circle' style={{left: '60px'}}
                        href='https://www.youtube.com/' target='_blank' rel='noreferrer'>
                        <img className='product-footer-bottom-box-social-media-icon'
                            src={youtubeIcon} alt='youtube-icon'/>
                    </a>
                    <a className='product-footer-bottom-box-social-media-circle' style={{right: '60px'}}
                        href='https://www.instagram.com/memorit.er/' target='_blank' rel='noreferrer'>
                        <img className='product-footer-bottom-box-social-media-icon'
                            src={instagramIcon} alt='instagram-icon'/>
                    </a>
                    <Link className='product-footer-bottom-box-social-media-circle' style={{right: '0'}}
                        to='/newsletter'>
                        <img className='product-footer-bottom-box-social-media-icon'
                            src={newsletterIcon} alt='newsletter-icon'/>
                    </Link>
                </div>
            </div>

        </footer>
    );
};

export default WebsiteFooter;
