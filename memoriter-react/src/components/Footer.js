import React from 'react';
import instagramIcon from './instagramIcon.png'


const Footer = () => {
    return (
        <div>
            <div className='MEMORITER'>
                <small>MEMORITER</small>
            </div>
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
