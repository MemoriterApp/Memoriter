import { Link } from 'react-router-dom';
import instagramIcon from '../../images/icons/instagram-icon.svg';
import Logo from '../../images/memoriter-logo.svg';


const FooterStart = () => {
    return (
        <div className='Footer_Body-Start'>
            <img className='MEMORITER-Start' src={Logo} alt='Memoriter-Logo' style={{filter: 'var(--svg-invert)'}}></img>
            <div className='Company-Start'>
                <h2>Company</h2>
                <ul>
                    <div className='footer-links-Start'>
                        <Link className='footer-link-Start' to='/privacy'>Privacy Policy</Link>
                        {/*<Link className='termsOfUse-Start' to='/terms-of-use'>Terms of Use</Link>*/}
                        <Link className='impressum-Start' to='/impressum'>Impressum</Link>
                        <Link className='About-Start' to='/About'>About Us</Link>
                        <Link className='patch-notes-Start' to='/patch-notes'>Patch Notes</Link>
                    </div>
                </ul>
            </div>
            <div className='followUs-Start'>
                <h2>Connect to Us</h2>
            </div>
            <div>
                <a className='rechteckLogo-Start' href='https://www.instagram.com/memorit.er/' target='_blank' rel='noreferrer'>
                    <img className='instaIcon-Start' src={instagramIcon} alt='instagram' style={{filter: 'var(--svg-invert)'}}></img>
                </a>
            </div>
            <div >
                <div className ='Line-Start1'></div>
                <div className ='Line-Start2'></div>
                <div className ='Line-Start-vertikal'></div>
            </div>
        </div>
    );
};

export default FooterStart;