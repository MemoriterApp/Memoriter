import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './footer-page.css';
import BackdropTransparent from '../../backdrops/backdrop-transparent/backdrop-transparent';

const FooterPage = () => {
    const [footerTutorial, openfooterTutorial] = useState(false);
    return (
        <div className='footer'>
            <br></br>
            <a className='footer-link' onClick={() => openfooterTutorial(true)} target='_blank'>
                Help and Tutorials
            </a>
            <div className='footer-line'></div>
            <Link className='footer-link' to='/impressum' target='_blank'>
                Terms and Privacy
            </Link>
            <Link className='footer-link' to='/patch-notes' target='_blank'>
                Patch Notes
            </Link>
            <div className='footer-line'></div>
            <a className='footer-link' href='https://forms.gle/sH6X5LXGftLT9eoj7' target='_blank' rel='noreferrer'>
                Report a bug
            </a>
            <a className='footer-text'>

            </a>
            {footerTutorial && <div>
                <footer className='footer-tutorial'>

                    
                </footer>
                <BackdropTransparent onClick={() => openfooterTutorial(false)} />
            </div>}

        </div>

    );
};
export default FooterPage;