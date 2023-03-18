import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import TutorialSpacedRep from '../../../pages/study-modes/spaced-rep/tutorial/tutorial-spaced-rep';
import Backdrop from '../../backdrops/backdrop/backdrop';
import './footer-page.css';
import BackdropTransparent from '../../backdrops/backdrop-transparent/backdrop-transparent';


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
                    <br></br>
                    <a className='footer-link' 
                        onClick={() => {
                        openfooterTutorial(true); 
                        closeFooter();}} 
                        target='_blank'>
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
                </div>
            }

            {footerTutorial && <div>
                    <footer className='footer-tutorial'>

                        <Link className='footer-link' to='/study-spaced-repetition'
                        onClick={() => {
                            setTutorialSpacedRepetition(true);
                            openfooterTutorial(false);
                            closeFooter();
                        }}>
                            Spaced Repetition
                        </Link>
                        <a className='footer-text' style={{fontSize:'small'}}>
                        (If you are not on the tutorial page, you will be taken there first, then you will need to click on the chosen tutorial again)
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