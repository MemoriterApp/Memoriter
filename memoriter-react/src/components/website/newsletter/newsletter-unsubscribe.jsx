import { useState } from 'react';

const NewsletterUnsubscribe = ({ onAnimation, onCloseUnsubscribe }) => {

    const animationStyles = onAnimation; //preset for fade in and out animation

    const [onHover, setOnHover] = useState('brightness(1)'); //variable for the hover effect for the create account button

    const [email, setEmail] = useState(''); //email input value

    const [errorMessage, setErrorMessage] = useState(''); //error message if unsubscribe fails

    function displayError(errorMessage) { //function for displaying the error popup when unsubscribe fails
        setErrorMessage(errorMessage); //configures message

        setEmail(''); //clears email input field
    };

    function unsubscribe(e) { //function for sending password reset email
        e.preventDefault(); //removes the default html submit

        displayError('Functionality not implemented yet!')
    };

    return (
        <section className='newsletter-unsubscribe' style={animationStyles}>

            <div className='newsletter-unsubscribe-close' onClick={() => onCloseUnsubscribe()}/>
            <p className='newsletter-unsubscribe-title'>Unsubscribe</p>

            {/*popup for password reset errors*/}
            {errorMessage && <div className='newsletter-unsubscribe-error'>
                <span>{errorMessage}</span> {/*error message*/}
                <span className='newsletter-unsubscribe-error-close'
                    onClick={() => setErrorMessage('')}
                >&#215;</span> {/*close popup button*/}
            </div>}

            <p className='newsletter-unsubscribe-text'>Do you want to unsubscribe from our email newsletter?</p>

            <form onSubmit={unsubscribe}>

                {/*email input*/}
                <p className='newsletter-unsubscribe-enter-email'>Please enter your email address:</p>
                <input className='newsletter-unsubscribe-input' type='email' placeholder='Email Address' value={email}
                    onChange={(e) => setEmail(e.target.value)}/>
                <p className='newsletter-unsubscribe-text'>We will send you a confirmation email to the given email address.</p>

                {/*send email button*/}
                <label>
                    <input type='submit' style={{display: 'none'}}/> {/*style hides the default submit button*/}
                    <div className='newsletter-unsubscribe-button'
                        onMouseEnter={() => setOnHover('brightness(0.75)')} onMouseLeave={() => setOnHover('brightness(1)')}>
                        {/*the onMouseEnter and -Leave is for the fade effect on hover which was not possible in css and the background animation.*/}
                        <div className='newsletter-unsubscribe-button-background' style={{filter: onHover}}/>
                        <span className='newsletter-unsubscribe-button-text'>Send Unsubscribe Email</span>
                    </div>
                </label>

            </form>
            
        </section>
    );
}

export default NewsletterUnsubscribe;