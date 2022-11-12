import React from 'react';
import { Link } from 'react-router-dom';
import memoriterLogo from '../../images/memoriter-logo.svg';
import instagramIcon from '../../images/icons/instagram-icon.svg';


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
            <div className='footer-links'>
                <Link className='footer-link' to='/privacy' target='_blank'>Privacy Policy</Link>
                <div
                    style={{ display: 'inline', color: 'var(--color-font-gray)', cursor: 'default' }}
                > | </div>
                <Link className='footer-link' to='/impressum' target='_blank'>Impressum</Link>
                <div
                    style={{ display: 'inline', color: 'var(--color-font-gray)', cursor: 'default' }}
                > | </div>
                <Link className='footer-link' to='/patch-notes' target='_blank'>Patch Notes</Link>
                <div
                    style={{ display: 'inline', color: 'var(--color-font-gray)', cursor: 'default' }}
                > | </div>
                <a className='footer-link' href='https://forms.gle/sH6X5LXGftLT9eoj7' target='_blank' rel='noreferrer'>Report a bug</a>
            </div>
        </div>
    );
}

export default Footer;
