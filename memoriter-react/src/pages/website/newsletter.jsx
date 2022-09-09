import WebsiteWrapper from '../../components/website/wrapper/website-wrapper';
import NewsletterUnsubscribe from '../../components/website/newsletter/newsletter-unsubscribe';
import Backdrop from '../../components/backdrop';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Newsletter = () => {

    const [onHover, setOnHover] = useState('brightness(1)'); //variable for the hover effect for the subscribe button

    const [acceptedPrivacy, setAcceptedPrivacy] = useState(false); //value if the privacy policy is accepted

    const [unsubscribe, setUnsubscribe] = useState(false); //opens or closes unsubscribe modal
    
    const [unsubscribeAnimation, setUnsubscribeAnimation] = useState({ //animation when opening unsubscribe modal
        transform: 'translate(-50%, calc(-50% - 16px))',
        opacity: '0',
    }); //styles used for the unsubscribe fade in and out animation
    const [backdropAnimation, setBackdropAnimation] = useState('0'); //backdrop opacity (used for fade in and out animation)

    function openUnsubscribe() { //function for opening the unsubscribe modal
        document.body.style.overflow = 'hidden'; //disables page scrolling
        setUnsubscribe(true);
        setTimeout(() => {
            setBackdropAnimation('1');
            setUnsubscribeAnimation({
                transform: 'translate(-50%, -50%)',
                opacity: '1'
            });
        }, 0);
        //setBackdropAnimation triggers a transition in the backdrop component creating the fade in effect, does not work without timeout
    };

    function closeUnsubscribe() { //function for closing the password reset modal
        document.body.style.overflow = 'auto'; //re-enables page scrolling
        setTimeout(() => {setUnsubscribe(false);}, 800); //timeout is needed for finishing the fade effect before closing everything
        setTimeout(() => {
            setBackdropAnimation('0');
            setUnsubscribeAnimation({
                transform: 'translate(-50%, calc(-50% - 16px))',
                opacity: '0'
            });
        }, 0);
        //setBackdropAnimation triggers a transition in the backdrop component creating the fade out effect, does not work without timeout
    };

    return (
        <WebsiteWrapper
            title='Newsletter'
            description='Sign Up to our Email Newsletter!'
        >

            <div className='newsletter-main'>

                <h1 className='newsletter-main-title'>Sign Up to our Email Newsletter!</h1>

                {/*email input field and subscribe button*/}
                <form className='newsletter-main-subscribe' onSubmit={(e) => e.preventDefault()}>
                    <p className='newsletter-main-subscribe-label'>Enter your Email Address</p>

                    <input className='newsletter-main-subscribe-input' type='email' placeholder='Email Address'/>

                    {/*button for subscribing to newsletter*/}
                    <label>
                        <input type='submit' style={{display: 'none'}}/> {/*style hides the default submit button*/}
                        <div className='newsletter-main-subscribe-button'
                            onMouseEnter={() => setOnHover('brightness(0.75)')} onMouseLeave={() => setOnHover('brightness(1)')}>
                            {/*the onMouseEnter and -Leave is for the fade effect on hover which was not possible in css*/}
                            <div className='newsletter-main-subscribe-button-background' style={{filter: onHover}}/>
                            <span className='newsletter-main-subscribe-button-text'>Subscribe</span>
                        </div>
                    </label>

                    {/*agree to privacy policy checkbox*/}
                    <div>
                        <p className='newsletter-main-checkbox-label'>
                            I have read and understood the <Link
                                className='newsletter-main-checkbox-label-link' to='/privacy' target='_blank'
                            >privacy policy</Link>.
                        </p>
                        <label className='newsletter-main-checkbox'>
                            <input type='checkbox' onChange={() => setAcceptedPrivacy(!acceptedPrivacy)}/>
                            <div className='newsletter-main-checkbox-style'/>
                        </label>
                    </div>
                </form>
                <p className='newsletter-main-subscribe-verify'>
                    We will send you a confirmation email to verify your email address.
                </p>

                <p className='newsletter-main-description'>
                    Recieve new and exclusive news about the Memoriter project.
                </p>

                {/*button to unsubscribe from the newsletter*/}
                <p className='newsletter-main-unsubscribe'>
                    You do not want to recieve our email newsletter anymore? <span
                        className='newsletter-main-unsubscribe-link'
                        onClick={openUnsubscribe}
                    >Click here</span> to request a removal from our mailing list.
                </p> {/*&nbsp; is a unicode character for spaces*/}

            </div>

            {unsubscribe && <>
                <NewsletterUnsubscribe onAnimation={unsubscribeAnimation} onCloseUnsubscribe={closeUnsubscribe}/>
                <Backdrop onFade={backdropAnimation} onClick={closeUnsubscribe}/>
            </>}


        </WebsiteWrapper>
    );
}

export default Newsletter;