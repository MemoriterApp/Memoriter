import React from 'react';
import { Link } from 'react-router-dom';
import instagramIcon from '../images/icons/instagram-icon.svg';
import memoriterLogo from '../images/memoriter-logo.svg';


const Footer = () => {
    return (
        <div className='Footer_Body'>
            <img  className='MEMORITER' src={memoriterLogo} alt='Memoriter-Logo'></img>
            <div className='followUs'>
                <small>Follow Us:</small>
            </div>
            <div>
                <a className='rechteckLogo' href='https://www.instagram.com/memorit.er/' target='_blank' rel="noreferrer">
                    <img className='instaIcon' src={instagramIcon} alt='instagram-icon'></img>
                </a>
            </div>
            <div className='footerLinks'>
                <Link className='privacyPolicy' to='/privacy' target='_blank'>Privacy Policy</Link>
                <div
                    style={{ display: 'inline', color: 'var(--color-font-gray)', cursor: 'default' }}
                > | </div>
                <Link className='impressum' to='/impressum' target='_blank'>Impressum</Link>
                <div
                    style={{ display: 'inline', color: 'var(--color-font-gray)', cursor: 'default' }}
                > | </div>
                <Link className='impressum' to='/patch-notes' target='_blank'>Patch Notes</Link>
                <div
                    style={{ display: 'inline', color: 'var(--color-font-gray)', cursor: 'default' }}
                > | </div>
                <a className='privacyPolicy' href='https://forms.gle/sH6X5LXGftLT9eoj7' target='_blank' rel='noreferrer'>Report a bug</a>
            </div>
        </div>
    );
}

export default Footer;
