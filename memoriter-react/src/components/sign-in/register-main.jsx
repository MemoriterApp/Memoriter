import '../../styles/sign-in/sign-in-main.css';
import googleIcon from '../../images/google-icon.svg';
import appleIcon from '../../images/apple-icon.svg';
import facebookIcon from '../../images/facebook-icon.svg';
import githubIcon from '../../images/github-icon.svg';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { firebase } from '../../utils/firebase';
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, OAuthProvider, FacebookAuthProvider, GithubAuthProvider } from 'firebase/auth';

const RegisterMain = () => {

    const navigate = useNavigate(); //variable for routing, alternative option for links

    const [onHover, setOnHover] = useState('brightness(1)'); //variable for the hover effect for the create account button

    const [email, setEmail] = useState(''); //email input value
    const [password, setPassword] = useState(''); //password input value
    const [confirmPassword, setConfirmPassword] = useState(''); //confirm password input value
    const [acceptedTerms, setAcceptedTerms] = useState(false); //value if the terms of use and privacy policy is accepted

    const [errorMessage, setErrorMessage] = useState(''); //error message if sign up fails
    const [errorStyleChanges, setErrorStyleChanges] = useState({}); //style adjustments when an error popup displays

    function displayError(errorMessage) { //function for displaying the error popup when sign up fails
        setErrorMessage(errorMessage); //configures message

        if (errorMessage !== 'Please accept terms and policies.') { //no password input clear for terms not accepted
            setPassword(''); //clears password input field
            setConfirmPassword(''); //clears confirm password input field
        };
         
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

    const error = (error => { //function instructions what to do if sign in fails (.catch()), is seperate to shorten the code by reusing it
        switch (error.code) { //reads error code
            case 'auth/weak-password': //password too short
                displayError('Password is too short!');
                break;
            case 'auth/email-already-in-use': //existing account with email
                displayError('Email already in use!');
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
            case 'auth/user-disabled': //user disabled
                displayError('User disabled!');
                break;
            case 'auth/internal-error': //internal error
                displayError('Internal error!');
                break;
            default: //all other errors
                displayError(`Error: ${error.code}`);
                break;
        };
    });

    async function defaultRegister(e) { //function to sign up with email and password
        e.preventDefault();

        if (!acceptedTerms) { //checks if terms of use and privacy policy are accepted
            displayError('Please accept terms and policies.');
        } else if (password !== confirmPassword) { //checks if password and confirm password inputs match
            displayError('Passwords do not match!')
        } else {
            createUserWithEmailAndPassword(firebase.auth, email, password)
                .then(() => navigate('/')) //navigates to app (only accessable when signed in)
                .catch(error); //displays error if sign in fails (uses error const)
        };
    };

    function signInWithGoogle() { //google sign in function
        const provider = new GoogleAuthProvider(); //connection to google sign in

        signInWithPopup(firebase.auth, provider) //firebase pre-built sign in function
            .then(() => navigate('/')) //navigates to app (only accessable when signed in)
            .catch(error); //displays error if sign in fails (uses error const)
    };

    function signInWithApple() { //google sign in function
        const provider = new OAuthProvider('apple.com'); //connection to apple sign in

        signInWithPopup(firebase.auth, provider) //firebase pre-built sign in function
            .then(() => navigate('/')) //navigates to app (only accessable when signed in)
            .catch(error); //displays error if sign in fails (uses error const)
    };

    function signInWithFacebook() { //google sign in function
        const provider = new FacebookAuthProvider(); //connection to facebook sign in

        signInWithPopup(firebase.auth, provider) //firebase pre-built sign in function
            .then(() => navigate('/')) //navigates to app (only accessable when signed in)
            .catch(error); //displays error if sign in fails (uses error const)
    };

    function signInWithGithub() { //google sign in function
        const provider = new GithubAuthProvider(); //connection to github sign in

        signInWithPopup(firebase.auth, provider) //firebase pre-built sign in function
            .then(() => navigate('/')) //navigates to app (only accessable when signed in)
            .catch(error); //displays error if sign in fails (uses error const)
    };

    return (
        <div className='sign-in-main' style={errorStyleChanges}>
            
            <h1 className='sign-in-main-header'>Register</h1>

            {/*popup for register errors*/}
            {errorMessage && <div className='sign-in-main-error'>
                <span>{errorMessage}</span> {/*error message*/}
                <span className='sign-in-main-error-close'
                    onClick={() => {setErrorMessage(''); setErrorStyleChanges({});}}
                >&#215;</span> {/*close popup button*/}
            </div>}

            {/*buttons for third party authenticationmethods*/}
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
            <form onSubmit={defaultRegister}>

                <input className='sign-in-main-input' type='email' placeholder='Email Adress' value={email}
                    onChange={(e) => setEmail(e.target.value)}/>

                <input className='sign-in-main-input' type='password' placeholder='Password' value={password}
                    onChange={(e) => setPassword(e.target.value)}/>

                <input className='sign-in-main-input' type='password' placeholder='Confirm Password' value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}/>
                
                {/*agree to terms and policies checkbox*/}
                <div>
                    <p className='sign-in-main-checkbox-label'>
                        I have read and understood the <Link
                            className='sign-in-main-text-link' to='/terms' target='_blank'
                        >terms of use</Link> and <Link
                            className='sign-in-main-text-link' to='/privacy' target='_blank'
                        >privacy policy</Link>.
                    </p>
                    <label className='sign-in-main-checkbox'>
                        <input type='checkbox' onChange={() => setAcceptedTerms(!acceptedTerms)}/>
                        <div className='sign-in-main-checkbox-style'/>
                    </label>
                </div>
                
                {/*create account button*/}
                <label>
                    <input type='submit' style={{display: 'none'}}/> {/*style hides the default submit button*/}
                    <div className='sign-in-main-button'
                        onMouseEnter={() => setOnHover('brightness(0.75)')} onMouseLeave={() => setOnHover('brightness(1)')}>
                        {/*the onMouseEnter and -Leave is for the fade effect on hover which was not possible in css and the background animation.*/}
                        <div className='sign-in-main-button-background' style={{filter: onHover}}/>
                        <span className='sign-in-main-button-text'>Create Account</span>
                    </div>
                </label>

            </form>

            {/*link to sign in page*/}
            <p className='sign-in-main-text'>
                Already have an account? <Link
                    className='sign-in-main-text-link'
                    to='/signin'
                >Sign in here</Link>.
            </p>

        </div>
    );
}

export default RegisterMain;