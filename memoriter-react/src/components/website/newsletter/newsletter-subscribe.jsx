import { useState } from 'react';
import { Link } from 'react-router-dom';

const NewsletterSubscribe = () => {

    const [onHover, setOnHover] = useState('brightness(1)'); //variable for the hover effect for the subscribe button

    const [acceptedPrivacy, setAcceptedPrivacy] = useState(false); //value if the privacy policy is accepted

    return (
        <section>
            <form className='newsletter-subscribe' onSubmit={(e) => e.preventDefault()}>
                <p className='newsletter-subscribe-label'>Enter your Email Address</p>

                <input className='newsletter-subscribe-input' type='email' placeholder='Email Address'/>

                {/*button for subscribing to newsletter*/}
                <label>
                    <input type='submit' style={{display: 'none'}}/> {/*style hides the default submit button*/}
                    <div className='newsletter-subscribe-button'
                        onMouseEnter={() => setOnHover('brightness(0.75)')} onMouseLeave={() => setOnHover('brightness(1)')}>
                        {/*the onMouseEnter and -Leave is for the fade effect on hover which was not possible in css*/}
                        <div className='newsletter-subscribe-button-background' style={{filter: onHover}}/>
                        <span className='newsletter-subscribe-button-text'>Subscribe</span>
                    </div>
                </label>

                {/*agree to privacy policy checkbox*/}
                <div>
                    <p className='newsletter-subscribe-checkbox-label'>
                        I have read and understood the <Link
                            className='newsletter-subscribe-checkbox-label-link' to='/privacy' target='_blank'
                        >privacy policy</Link>.
                    </p>
                    <label className='newsletter-subscribe-checkbox'>
                        <input type='checkbox' onChange={() => setAcceptedPrivacy(!acceptedPrivacy)}/>
                        <div className='newsletter-subscribe-checkbox-style'/>
                    </label>
                </div>
            </form>

            <p className='newsletter-subscribe-verify'>
                We will send you a confirmation email to verify your email address.
            </p>
        </section>
    );
}

export default NewsletterSubscribe;