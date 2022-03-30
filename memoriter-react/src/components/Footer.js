import React from 'react';
import instagramIcon from './instagramIcon.png'
import Logo from './Logo.png'


const Footer = () => {
    return (
        <div>
            <img  className='MEMORITER' src={Logo} alt='Memoriter-Logo'></img>
            <div className='followUs'>
                <small>Follow Us:</small>
            </div>
            <div>
                <a className='rechteckLogo' href='https://www.instagram.com/memorit.er/' target='_blank'></a>
                <a href='https://www.instagram.com/memorit.er/' target='_blank'>
                    <img className='instaIcon' src={instagramIcon} alt='instagram'></img>
                </a>
            </div>
            <div className='footerLine'></div>
            <div className='termsOfUse'>Terms of Use</div>
            <div className='privacyPolicy'>Privacy Policy</div>
            <div className='impressum'>Impressum</div>
        </div>
    );
}

export default Footer;
