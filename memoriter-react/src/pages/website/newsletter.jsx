import WebsiteWrapper from '../../components/website/wrapper/website-wrapper';
import NewsletterSubscribe from '../../components/website/newsletter/newsletter-subscribe';
import NewsletterUnsubscribe from '../../components/website/newsletter/newsletter-unsubscribe';
import Backdrop from '../../components/backdrop';
import { useState } from 'react';

const Newsletter = () => {

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

            <section className='newsletter-main'>

                <h1 className='newsletter-main-title'>Sign Up to our Email Newsletter!</h1>

                <NewsletterSubscribe/>

                <p className='newsletter-main-description'>
                    Subscribe and recieve new and exclusive news about the Memoriter project.
                </p>

                {/*button to unsubscribe from the newsletter*/}
                <p className='newsletter-main-unsubscribe'>
                    You do not want to recieve our email newsletter anymore? <span
                        className='newsletter-main-unsubscribe-link'
                        onClick={openUnsubscribe}
                    >Click here</span> to request a removal from our mailing list.
                </p> {/*&nbsp; is a unicode character for spaces*/}

            </section>

            {unsubscribe && <>
                <NewsletterUnsubscribe onAnimation={unsubscribeAnimation} onCloseUnsubscribe={closeUnsubscribe}/>
                <Backdrop onFade={backdropAnimation} onClick={closeUnsubscribe}/>
            </>}

        </WebsiteWrapper>
    );
}

export default Newsletter;