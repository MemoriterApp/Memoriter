import React from 'react';
import { Link } from 'react-router-dom';
import instagramIcon from './instagramIcon.png';
import Logo from './Logo.png';


const FooterStart = () => {
    return (
        <div className='Footer_Body-Start'>
            <img  className='MEMORITER-Start' src={Logo} alt='Memoriter-Logo'></img>
            <div className='Company-Start'>
                <h2>Company</h2>
                <ul>   
                    <div className='footerLinks-Start'>
                        <Link className='privacyPolicy-Start' to='/privacy'>Privacy Policy</Link>
                        <Link className='termsOfUse-Start' to='/terms-of-use'>Terms of Use</Link>
                        <Link className='impressum-Start' to='/impressum'>Impressum</Link>
                        <Link className='About-Start' to='/impressum'>About Us</Link>
                    </div>
                </ul> 
            </div>
            <div className='followUs-Start'>
                <h2>Connect to us</h2>
            </div>
            <div>
                <a className='rechteckLogo-Start' href='https://www.instagram.com/memorit.er/' target='_blank' rel="noreferrer">
                    <img className='instaIcon-Start' src={instagramIcon} alt='instagram'></img>
                </a>
            </div>
            <div >
                <div className ='Line-Start1'></div>
                <div className ='Line-Start2'></div>
                <div className ='Line-Start-vertikal'></div>
            </div>
        </div>
    );
}

export default FooterStart;
