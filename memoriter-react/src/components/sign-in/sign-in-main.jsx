import '../../styles/sign-in/sign-in-main.css';
import googleIcon from '../../images/google-icon.svg';
import appleIcon from '../../images/apple-icon.svg';
import facebookIcon from '../../images/facebook-icon.svg';
import githubIcon from '../../images/github-icon.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { firebase } from '../../utils/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithGoogle, signInWithApple, signInWithFacebook, signInWithGithub } from '../../utils/third-party-authentication';

const SignInMain = ({ onOpenPasswordReset }) => {

    const [onHover, setOnHover] = useState('brightness(1)'); //variable for the hover effect for the sign in button

    const [email, setEmail] = useState(''); //email input value
    const [password, setPassword] = useState(''); //password input value

    const [errorMessage, setErrorMessage] = useState(''); //error message if sign in fails
    const [errorStyleChanges, setErrorStyleChanges] = useState({}); //style adjustments when an error popup displays

    function displayError(errorMessage) { //function for displaying the error popup when sign in fails
        setErrorMessage(errorMessage); //configures message

        setPassword(''); //clears password input field
        
        //style changes for container (needs to be bigger so that the error popup can fit in)
        if (window.innerHeight <= 721) { //optimization for smaller screens (no conflict with css media query)
            setErrorStyleChanges({
                height: '650px',
                top: '385px'
            });
        } else { //larger screens
            setErrorStyleChanges({ 
                height: '650px',
                top: 'calc(50% + 25px)'
            });
        };
    };

    async function defaultSignIn(e) { //function to sign in with email and password
        e.preventDefault(); //removes the default html submit

        signInWithEmailAndPassword(firebase.auth, email, password) //firebase pre-built sign in function
            .catch(error => { //displays error if sign in fails
                switch (error.code) { //reads error code
                    case 'auth/wrong-password': //wrong password
                        displayError('Wrong Password!');
                        break;
                    case 'auth/user-not-found': //wrong email
                        displayError('User not found!');
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
    };

    return (
        <div className='sign-in-main' style={errorStyleChanges}>
            
            <h1 className='sign-in-main-header'>Sign In</h1>

            {/*popup for sign in errors*/}
            {errorMessage && <div className='sign-in-main-error'>
                <span>{errorMessage}</span> {/*error message*/}
                <span className='sign-in-main-error-close'
                    onClick={() => {setErrorMessage(''); setErrorStyleChanges({});}}
                >&#215;</span> {/*close popup button*/}
            </div>}

            {/*buttons for third party authentication methods*/}
            <div className='sign-in-main-third-party'>
                <button className='sign-in-main-google' onClick={signInWithGoogle /*imported function*/}>
                    <img src={googleIcon} alt='google-icon' className='sign-in-main-google-icon'/>
                </button>
                
                <button className='sign-in-main-apple' onClick={signInWithApple /*imported function*/}>
                    <img src={appleIcon} alt='apple-icon' className='sign-in-main-apple-icon'/>
                </button>

                <button className='sign-in-main-facebook' onClick={signInWithFacebook /*imported function*/}>
                    <img src={facebookIcon} alt='facebook-icon' className='sign-in-main-facebook-icon'/>
                </button>

                <button className='sign-in-main-github' onClick={signInWithGithub /*imported function*/}>
                    <img src={githubIcon} alt='github-icon' className='sign-in-main-github-icon'/>
                </button>
            </div>

            {/*sign up with email form*/}
            <form onSubmit={defaultSignIn}>

                <input className='sign-in-main-input' type='email' placeholder='Email Adress' value={email}
                    onChange={(e) => setEmail(e.target.value)}/>

                <input className='sign-in-main-input' type='password' placeholder='Password' value={password}
                    onChange={(e) => setPassword(e.target.value)}/>

                <p className='sign-in-main-forgot-password' onClick={() => onOpenPasswordReset()}>Forgot Password?</p>{/*password reset link*/}
                
                {/*sign in button*/}
                <label>
                    <input type='submit' style={{display: 'none'}}/> {/*style hides the default submit button*/}
                    <div className='sign-in-main-button'
                        onMouseEnter={() => setOnHover('brightness(0.75)')} onMouseLeave={() => setOnHover('brightness(1)')}>
                        {/*the onMouseEnter and -Leave is for the fade effect on hover which was not possible in css and the background animation.*/}
                        <div className='sign-in-main-button-background' style={{filter: onHover}}/>
                        <span className='sign-in-main-button-text'>Sign In</span>
                    </div>
                </label>
                
            </form>

            {/*link to privacy policiy and terms of use page*/}
            <p className='sign-in-main-text'><Link className='sign-in-main-link' to='/privacy' target='_blank'>Privacy Policy</Link></p>
            <p className='sign-in-main-text'><Link className='sign-in-main-link' to='/terms' target='_blank'>Terms of Use</Link></p>

            {/*link to register page*/}
            <p className='sign-in-main-text'>
                Don't have an account? <Link
                    className='sign-in-main-text-link'
                    to='/register'
                >Register here</Link>.
            </p>

        </div>
    );
}

export default SignInMain;