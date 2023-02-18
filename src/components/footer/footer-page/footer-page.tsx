import { Link } from 'react-router-dom';
import './footer-page.css';
import memoriterLogo from '../../../images/memoriter-logo.svg';
import instagramIcon from '../../../images/icons/instagram-icon.svg';

const FooterPage = () => {
    return (
        <footer className='footer'>
                <section className='footer-links'>
                    <p className='footer-text'>Links</p>
                    <Link className='footer-link' to='/privacy' target='_blank'>
                        Privacy Policy
                    </Link>
                    <br></br>  
                    <Link className='footer-link' to='/impressum' target='_blank'>
                        Impressum
                    </Link>
                    <br></br>  
                    <Link className='footer-link' to='/patch-notes' target='_blank'>
                        Patch Notes
                    </Link>
                    <br></br>  
                    <a
                    className='footer-link'
                    href='https://forms.gle/sH6X5LXGftLT9eoj7'
                    target='_blank'
                    rel='noreferrer'
                    >
                        Report a bug
                    </a>
                </section>
                <p className='footer-text' style={{top:'20 vh'}}>Follow Us:</p>
                <a
                    className='footer-follow-icon'
                    href='https://www.instagram.com/memorit.er/'
                    target='_blank'
                    rel='noreferrer'
                >
                    <img src={instagramIcon} alt='instagram-icon'></img>
                </a>
            </footer>
    );
};
export default FooterPage;