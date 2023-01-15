import { Link } from 'react-router-dom';
import './footer.css';
import memoriterLogo from '../../images/memoriter-logo.svg';
import instagramIcon from '../../images/icons/instagram-icon.svg';

const Footer = () => {
    return (
        <footer className='footer'>
            <img className='footer-logo' src={memoriterLogo} alt='Memoriter' />
            <p className='footer-follow'>Follow Us:</p>
            <a
                className='footer-follow-icon'
                href='https://www.instagram.com/memorit.er/'
                target='_blank'
                rel='noreferrer'
            >
                <img src={instagramIcon} alt='instagram-icon'></img>
            </a>

            <section className='footer-links'>
                <Link className='footer-link' to='/privacy' target='_blank'>
          Privacy Policy
                </Link> | <Link className='footer-link' to='/impressum' target='_blank'>
          Impressum
                </Link> | <Link className='footer-link' to='/patch-notes' target='_blank'>
          Patch Notes
                </Link> | <a
                    className='footer-link'
                    href='https://forms.gle/sH6X5LXGftLT9eoj7'
                    target='_blank'
                    rel='noreferrer'
                >
          Report a bug
                </a>
            </section>
        </footer>
    );
};
export default Footer;