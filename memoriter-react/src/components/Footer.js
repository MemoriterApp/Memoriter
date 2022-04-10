import React from 'react';
import { Link } from 'react-router-dom';
import instagramIcon from './instagramIcon.png'
import Logo from './Logo.png'


const Footer = () => {
    return (
        <div className='Footer_Body'>
            <img  className='MEMORITER' src={Logo} alt='Memoriter-Logo'></img>
            <div className='followUs'>
                <small>Follow Us:</small>
            </div>
            <div>
                <a className='rechteckLogo' href='https://www.instagram.com/memorit.er/' target='_blank'>
                    <img className='instaIcon' src={instagramIcon} alt='instagram'></img>
                </a>
            </div>
            <div className='footerLine'></div>
            <Link className='termsOfUse' to='/terms-of-use'>Terms of Use</Link>
            <Link className='privacyPolicy' to='/privacy'>Privacy Policy</Link>
            <Link className='impressum' to='/impressum'>Impressum</Link>
        </div>
    );
}

export default Footer;
