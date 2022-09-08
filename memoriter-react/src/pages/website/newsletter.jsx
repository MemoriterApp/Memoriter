import WebsiteWrapper from '../../components/website/wrapper/website-wrapper';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Newsletter = () => {

    const [onHover, setOnHover] = useState('brightness(1)'); //variable for the hover effect for the subscribe button

    const [acceptedPrivacy, setAcceptedPrivacy] = useState(false); //value if the privacy policy is accepted

    return (
        <WebsiteWrapper
            title='Newsletter'
            description='Sign Up to our Email Newsletter!'
        >

            <div className='newsletter-main'>

                <h1 className='newsletter-main-title'>Sign Up to our Email Newsletter!</h1>

                {/*email input field and subscribe button*/}
                <form className='newsletter-main-subscribe' onSubmit={(e) => e.preventDefault()}>
                    <p className='newsletter-main-subscribe-label'>Enter your Email Adress</p>

                    <input className='newsletter-main-subscribe-input' type='email' placeholder='Email Adress'/>

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
                    We will send you a confirmation email to verify your email adress.
                </p>

                <p className='newsletter-main-description'>
                    Recieve new and exclusive news about the Memoriter project.
                </p>

                {/*button to unsubscribe from the newsletter*/}
                <p className='newsletter-main-unsubscribe'>
                    You do not want to recieve our email newsletter any more? <span
                        className='newsletter-main-unsubscribe-link'
                    >Click here</span> to request a removal from our mailing list.
                </p> {/*&nbsp; is a unicode character for spaces*/}

            </div>

        </WebsiteWrapper>
    );
}

export default Newsletter;