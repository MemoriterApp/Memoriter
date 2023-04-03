import { useState } from 'react';
import TutorialSpacedRep from '../../../pages/study-modes/spaced-rep/tutorial/tutorial-spaced-rep';
import Backdrop from '../../backdrops/backdrop/backdrop';
import './footer-page.css';
import BackdropTransparent from '../../backdrops/backdrop-transparent/backdrop-transparent';
import twitterIcon from '../../../images/icons/twitter-icon.svg';
import instagramIcon from '../../../images/icons/instagram-icon.svg';
import tiktokIcon from '../../../images/icons/tiktok-icon.svg';
import discordIcon from '../../../images/icons/discord-icon.svg';
import githubIcon from '../../../images/icons/github-icon.svg';


const FooterPage = () => {

    const [footerTutorial, openfooterTutorial] = useState(false);
    const [tutorialSpacedRepetition, setTutorialSpacedRepetition] = useState(false);
    const [showFooter, setShowFooter] = useState(true);

    const closeFooter = () => {
        setShowFooter(false);
    }

    return (
        <>
            {showFooter && 
                <div className='footer'>
                    <a className='footer-link' 
                        onClick={() => {
                        openfooterTutorial(true); 
                        closeFooter();}} 
                        target='_blank'>
                        Help and Tutorials
                    </a>
                    <div className='footer-line'/>
                    <a className='footer-link' href='https://memoriter.de/impressum' target='_blank' rel='noreferrer'>
                        Impressum
                    </a>
                    <a className='footer-link' href='https://memoriter.de/term' target='_blank' rel='noreferrer'>
                        Terms of Use
                    </a>
                    <a className='footer-link' href='https://memoriter.de/privacy' target='_blank' rel='noreferrer'>
                        Privacy Policy
                    </a>
                    <div className='footer-line'/>
                    <a className='footer-link' href='https://memoriter.de/releases' target='_blank' rel='noreferrer'>
                        Release Notes
                    </a>
                    <a className='footer-link' href='https://memoriter.de/bugs' target='_blank' rel='noreferrer'>
                        Report a Bug
                    </a>
                    <div className='footer-line'/>
                    <a className='footer-link' href='https://shop-memoriter.myspreadshop.de/' target='_blank' rel='noreferrer'>
                        Merchandise
                    </a>
                    <div className='footer-line'/>
                    <p className='footer-text'>
                        Follow us:
                    </p>
                    <div className='footer-follow-flex'>
                        <a
                            className='footer-follow-icon'
                            href='https://twitter.com/MemoriterHQ'
                            target='_blank'
                            rel='noreferrer'
                        >                
                            <img src={twitterIcon} alt='twitter-icon'/>
                        </a>
                        <a
                            className='footer-follow-icon'
                            href='https://www.instagram.com/memoriter6/'
                            target='_blank'
                            rel='noreferrer'
                        >                
                            <img src={instagramIcon} alt='instagram-icon'/>
                        </a>
                        <a
                            className='footer-follow-icon'
                            href='https://www.tiktok.com/@memoriterofficial'
                            target='_blank'
                            rel='noreferrer'
                        >                
                            <img src={tiktokIcon} alt='tiktok-icon'/>
                        </a>
                        <a
                            className='footer-follow-icon'
                            href='https://discord.com/invite/wpdYh2CQ4H'
                            target='_blank'
                            rel='noreferrer'
                        >                
                            <img src={discordIcon} alt='discord-icon'/>
                        </a>
                        <a
                            className='footer-follow-icon'
                            href='https://github.com/MemoriterApp'
                            target='_blank'
                            rel='noreferrer'
                        >                
                            <img src={githubIcon} alt='github-icon'/>
                        </a>
                    </div>

                </div>
            }

            {footerTutorial && <div>
                    <footer className='footer-tutorial'>
                        <p className='footer-text' style={{fontSize:'large'}}>
                        Tutorials
                        </p>
                        <div className='footer-line'/>

                        <a className='footer-link'
                        onClick={() => {
                            setTutorialSpacedRepetition(true);
                            openfooterTutorial(false);
                            closeFooter();
                        }}>
                            Spaced Repetition
                        </a>

                        
                    </footer>
                    <BackdropTransparent onClick={() => openfooterTutorial(false)} />
            </div>}

            {tutorialSpacedRepetition &&
                    <>
                        <TutorialSpacedRep />
                        <Backdrop onClick={() => setTutorialSpacedRepetition(false)} />
                    </>
                }

        </>
    );
};
export default FooterPage;