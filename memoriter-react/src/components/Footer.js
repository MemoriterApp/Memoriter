import React from 'react';
import { Link } from 'react-router-dom';
import instagramIcon from './instagramIcon.png';
import Logo from './Logo.png';


const Footer = () => {
    return (
        <div className='Footer_Body'>
            <img  className='MEMORITER' src={Logo} alt='Memoriter-Logo'></img>
            <div className='followUs'>
                <small>Follow Us:</small>
            </div>
            <div>
                <a className='rechteckLogo' href='https://www.instagram.com/memorit.er/' target='_blank' rel="noreferrer">
                    <img className='instaIcon' src={instagramIcon} alt='instagram'></img>
                </a>
            </div>
            <div className='footerLinks'>
                <Link className='termsOfUse' to='/About'>About us</Link>
                <div
                    style={{display: 'inline', color: 'rgba(112,112,112,1)', cursor: 'default'}}
                > | </div>
                <Link className='termsOfUse' to='/terms-of-use'>Terms of Use</Link>
                <div
                    style={{display: 'inline', color: 'rgba(112,112,112,1)', cursor: 'default'}}
                > | </div>
                <Link className='privacyPolicy' to='/privacy'>Privacy Policy</Link>
                <div
                    style={{display: 'inline', color: 'rgba(112,112,112,1)', cursor: 'default'}}
                > | </div>
                <Link className='impressum' to='/impressum'>Impressum</Link>
            </div>
        </div>
    );
}

export default Footer;
