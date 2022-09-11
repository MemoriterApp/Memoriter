import youtubeIcon from '../../../images/icons/youtube-icon.svg';
import twitterIcon from '../../../images/icons/twitter-icon.svg';
import instagramIcon from '../../../images/icons/instagram-icon.svg';
import newsletterIcon from '../../../images/icons/email-icon.svg';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { changeTheme } from '../../../features/theme-slice';
import cookies from '../../../utils/cookies';

const WebsiteFooter = ({ onOpenLanguageSelect, onOpenCookieSettings }) => {

    const dispatch = useDispatch(); //used to manipulate global state (react redux)

    const themeText = useSelector((state) => state.theme.value); //current light or dark mode text based on theme

    function onChangeTheme(theme) { //function to swap the current theme
        dispatch(changeTheme(theme)); //changes the theme

        if (JSON.parse(cookies.getCookie('accepted-cookies')).functional) { //checks if functional cookies are accepted
            localStorage.setItem('theme', theme); //if functional cookies are accepted, then the theme can be saved to localStorage
        };
    };

    return (
        <footer className='website-footer'>

            {/*transition shape at the top*/}
            <div className='website-footer-top-transition-shape-left'/>
            <div className='website-footer-top-transition-shape-right'/>

            {/*columns of content*/}
            <div className='website-footer-content'>

                {/*lists of footer links*/}
                <nav>
                    <p className='website-footer-header'>App</p>
                    <Link className='website-footer-link' to='/signin'>Sign In</Link>
                    <Link className='website-footer-link' to='/register'>Register</Link>
                    <Link className='website-footer-link' to='/download'>Download</Link>
                    <Link className='website-footer-link' to='/releases'>Release Notes</Link>
                </nav>

                <nav>
                    <p className='website-footer-header'>Company</p>
                    <Link className='website-footer-link' to='/product'>Product</Link>
                    <Link className='website-footer-link' to='/about'>About</Link>
                    <Link className='website-footer-link' to='/blog'>Blog</Link>
                    <Link className='website-footer-link' to='/donate'>Donate</Link>
                </nav>

                <nav>
                    <p className='website-footer-header'>Legal</p>
                    <Link className='website-footer-link' to='/impressum'>Impressum</Link>
                    <Link className='website-footer-link' to='/terms'>Terms of Use</Link>
                    <Link className='website-footer-link' to='/privacy'>Privacy Policy</Link>
                    <Link className='website-footer-link' to='/cookies'>Cookie Policy</Link>
                </nav>

                <nav>
                    <p className='website-footer-header'>Help</p>
                    <Link className='website-footer-link' to='/support'>Support</Link>
                    <Link className='website-footer-link' to='/faq'>FAQ</Link>
                    <Link className='website-footer-link' to='/bugs'>Bug Report</Link>
                    <span className='website-footer-link'  onClick={() => onOpenCookieSettings()}>Cookie Settings</span> {/*opens cookie settings banner*/}
                </nav>

                <nav> {/*mostly external links*/}
                    <p className='website-footer-header'>Follow Us</p>
                    <a className='website-footer-link' href='https://www.twitter.com/' target='_blank' rel='noreferrer'>Twitter</a>
                    <a className='website-footer-link' href='https://www.youtube.com/' target='_blank' rel='noreferrer'>YouTube</a>
                    <a className='website-footer-link' href='https://www.instagram.com/memorit.er/' target='_blank' rel='noreferrer'>Instagram</a>
                    <Link className='website-footer-link' to='/newsletter'>Newsletter</Link>
                </nav>

            </div>

            {/*box at the bottom with social media links and other buttons*/}
            <div className='website-footer-bottom-box'>
                <p className='website-footer-bottom-box-copyright'>©Copyright 2022 Memoriter</p>

                {/*right text uses two classes, one for the hover effect, the theme text depends on the current theme*/}
                <p
                    className='website-footer-bottom-box-text website-footer-bottom-box-language'
                    onClick={onOpenLanguageSelect}
                >Language: English</p>
                {(themeText === 'dark' || !themeText) && <p className='website-footer-bottom-box-text website-footer-bottom-box-theme'
                    onClick={() => onChangeTheme('light')}
                >Theme: Dark</p>}
                {themeText === 'light' && <p className='website-footer-bottom-box-text website-footer-bottom-box-theme'
                    onClick={() => onChangeTheme('dark')}
                >Theme: Light</p>}

                {/*social media icons*/}
                <div className='website-footer-bottom-box-social-media-box'>
                    <a className='website-footer-bottom-box-social-media-circle' style={{left: '0'}}
                        href='https://www.twitter.com/' target='_blank' rel='noreferrer'>
                        <img className='website-footer-bottom-box-social-media-icon'
                            src={twitterIcon} alt='twitter-icon'/>
                    </a>
                    <a className='website-footer-bottom-box-social-media-circle' style={{left: '60px'}}
                        href='https://www.youtube.com/' target='_blank' rel='noreferrer'>
                        <img className='website-footer-bottom-box-social-media-icon'
                            src={youtubeIcon} alt='youtube-icon'/>
                    </a>
                    <a className='website-footer-bottom-box-social-media-circle' style={{right: '60px'}}
                        href='https://www.instagram.com/memorit.er/' target='_blank' rel='noreferrer'>
                        <img className='website-footer-bottom-box-social-media-icon'
                            src={instagramIcon} alt='instagram-icon'/>
                    </a>
                    <Link className='website-footer-bottom-box-social-media-circle' style={{right: '0'}}
                        to='/newsletter'>
                        <img className='website-footer-bottom-box-social-media-icon'
                            src={newsletterIcon} alt='newsletter-icon'/>
                    </Link>
                </div>
            </div>

        </footer>
    );
};

export default WebsiteFooter;
