import { useState } from 'react';

const NewsletterUnsubscribe = ({ onAnimation, onCloseUnsubscribe }) => {

    const animationStyles = onAnimation; //preset for fade in and out animation

    const [onHover, setOnHover] = useState('brightness(1)'); //variable for the hover effect for the create account button

    const [email, setEmail] = useState(''); //email input value

    return (
        <div className='sign-in-password-reset' style={animationStyles}>

            <div className='sign-in-password-reset-close' onClick={() => onCloseUnsubscribe()}/>
            <p className='sign-in-password-reset-title'>Reset Password</p>

            <p className='sign-in-password-reset-text'>If you lost or forgot your password and wish to reset it, you can use the form below.</p>

            <form>

                {/*email input*/}
                <p className='sign-in-password-reset-enter-email'>Please enter your email adress:</p>
                <input className='sign-in-password-reset-input' type='email' placeholder='Account Email' value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                <p className='sign-in-password-reset-text'>We will send a password reset link to the given email adress.</p>

                {/*send email button*/}
                <label>
                    <input type='submit' style={{display: 'none'}}/> {/*style hides the default submit button*/}
                    <div className='sign-in-password-reset-button'
                        onMouseEnter={() => setOnHover('brightness(0.75)')} onMouseLeave={() => setOnHover('brightness(1)')}>
                        {/*the onMouseEnter and -Leave is for the fade effect on hover which was not possible in css and the background animation.*/}
                        <div className='sign-in-password-reset-button-background' style={{filter: onHover}}/>
                        <span className='sign-in-password-reset-button-text'>Send Password Reset Email</span>
                    </div>
                </label>

            </form>
            
        </div>
    );
}

export default NewsletterUnsubscribe;