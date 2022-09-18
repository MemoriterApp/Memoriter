import { useState } from 'react';
import { firebase } from '../../utils/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

const SignInPasswordReset = ({ onAnimation, onClosePasswordReset }) => {

    const animationStyles = onAnimation; //preset for fade in and out animation

    const [onHover, setOnHover] = useState('brightness(1)'); //variable for the hover effect for the create account button

    const [email, setEmail] = useState(''); //email input value

    const [errorMessage, setErrorMessage] = useState(''); //error message if sign up fails

    function displayError(errorMessage) { //function for displaying the error popup when sign up fails
        setErrorMessage(errorMessage); //configures message

        setEmail(''); //clears email input field
    };

    function passwordReset(e) { //function for sending password reset email
        e.preventDefault(); //removes the default html submit

        sendPasswordResetEmail(firebase.auth, email)
            .catch(error => { //displays error if sign in fails
                switch (error.code) { //reads error code
                    case 'auth/user-not-found': //wrong email
                        displayError('User not found!');
                        break;
                    case 'auth/missing-email': //missing email
                        displayError('Invalid email!');
                        break;
                    case 'auth/invalid-email': //invalid email
                        displayError('Invalid email!');
                        break;
                    case 'auth/too-many-requests': //too many sign in requests
                        displayError('Too many requests!');
                        break;
                    default: //all other errors
                        displayError(`Error: ${error.code}`);
                        break;
                };
            });
    }

    return (
        <div className='sign-in-password-reset' style={animationStyles}>

            <div className='sign-in-password-reset-close' onClick={() => onClosePasswordReset()}/>
            <p className='sign-in-password-reset-title'>Reset Password</p>

            {/*popup for sign in errors*/}
            {errorMessage && <div className='sign-in-password-reset-error'>
                <span>{errorMessage}</span> {/*error message*/}
                <span className='sign-in-password-reset-error-close'
                    onClick={() => setErrorMessage('')}
                >&#215;</span> {/*close popup button*/}
            </div>}

            <p className='sign-in-password-reset-text'>If you lost or forgot your password and wish to reset it, you can use the form below.</p>

            <form onSubmit={passwordReset}>

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

export default SignInPasswordReset;