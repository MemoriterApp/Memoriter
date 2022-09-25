import googleIcon from '../../images/icons/google-icon.svg';
import appleIcon from '../../images/icons/apple-icon.svg';
import facebookIcon from '../../images/icons/facebook-icon.svg';
import githubIcon from '../../images/icons/github-icon.svg';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { displaySuccessMessage } from '../../features/authentication-success-slice';
import { firebase } from '../../utils/firebase';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, OAuthProvider, FacebookAuthProvider, GithubAuthProvider } from 'firebase/auth';

const SignInMain = ({ onOpenPasswordReset }) => {

    const navigate = useNavigate(); //variable for routing, alternative option for links

    const dispatch = useDispatch(); //used to manipulate global state (react redux)

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

    const [successMessage, setSuccessMessage] = useState(''); //success message for sign out or account deletion

    function displaySuccess(successMessage) { //function for displaying the success popup when sign in fails
        setSuccessMessage(successMessage); //configures message

        dispatch(displaySuccessMessage('')); //removes unnecessary state (would trigger infinite loop)

        //style changes for container (needs to be bigger so that the error popup can fit in)
        if (window.innerHeight <= 721) { //optimization for smaller screens (no conflict with css media query)
            setErrorStyleChanges({ //can reuse errorStyleChanges (same changes like with error handling)
                height: '650px',
                top: '385px'
            });
        } else { //larger screens
            setErrorStyleChanges({ //can reuse errorStyleChanges (same changes like with error handling)
                height: '650px',
                top: 'calc(50% + 25px)'
            });
        };
    };
    const authenticationSuccess = useSelector((state) => state.authenticationSuccess.value); //detects if the user signed out or deletet their account
    if (authenticationSuccess) { //if state exists the function for displaying the popup is called
        displaySuccess(authenticationSuccess);
    };

    const error = (error => { //function instructions what to do if sign in fails (.catch()), is seperate to shorten the code by reusing it
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
            case 'auth/cancelled-popup-request': //third party authentication error
                displayError('Request Cancelled!');
                break;
            case 'auth/popup-closed-by-user': //cancelled third party authentication cancelled by user
                //shows no error
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

    async function defaultSignIn(e) { //function to sign in with email and password
        e.preventDefault(); //removes the default html submit

        setSuccessMessage(''); //disables success popup (prevents conflict with error popup)

        signInWithEmailAndPassword(firebase.auth, email, password) //firebase pre-built sign in function
            .then(() => navigate('/')) //navigates to app (only accessable when signed in)
            .catch(error); //displays error if sign in fails (uses error const)
    };

    async function signInWithGoogle() { //google sign in function
        setSuccessMessage(''); //disables success popup (prevents conflict with error popup)

        const provider = new GoogleAuthProvider(); //connection to google sign in

        signInWithPopup(firebase.auth, provider) //firebase pre-built sign in function
            .then(() => navigate('/')) //navigates to app (only accessable when signed in)
            .catch(error); //displays error if sign in fails (uses error const)
    };

    async function signInWithApple() { //google sign in function
        setSuccessMessage(''); //disables success popup (prevents conflict with error popup)

        const provider = new OAuthProvider('apple.com'); //connection to apple sign in

        signInWithPopup(firebase.auth, provider) //firebase pre-built sign in function
            .then(() => navigate('/')) //navigates to app (only accessable when signed in)
            .catch(error); //displays error if sign in fails (uses error const)
    };

    async function signInWithFacebook() { //google sign in function
        setSuccessMessage(''); //disables success popup (prevents conflict with error popup)

        const provider = new FacebookAuthProvider(); //connection to facebook sign in

        signInWithPopup(firebase.auth, provider) //firebase pre-built sign in function
            .then(() => navigate('/')) //navigates to app (only accessable when signed in)
            .catch(error); //displays error if sign in fails (uses error const)
    };

    async function signInWithGithub() { //google sign in function
        setSuccessMessage(''); //disables success popup (prevents conflict with error popup)

        const provider = new GithubAuthProvider(); //connection to github sign in

        signInWithPopup(firebase.auth, provider) //firebase pre-built sign in function
            .then(() => navigate('/')) //navigates to app (only accessable when signed in)
            .catch(error); //displays error if sign in fails (uses error const)
    };

    return (
        <main className='sign-in-main' style={errorStyleChanges}>
            
            <h1 className='sign-in-main-heading'>Sign In</h1>

            {/*popup for sign in errors*/}
            {errorMessage && <p className='sign-in-main-error'>
                <span>{errorMessage}</span> {/*error message*/}
                <span className='sign-in-main-error-close'
                    onClick={() => {setErrorMessage(''); setErrorStyleChanges({});}}
                >&#215;</span> {/*close popup button*/}
            </p>}

            {/*popup for successful sign out or account deletion*/}
            {successMessage && <p className='sign-in-main-success'>
                <span>{successMessage}</span> {/*error message*/}
                <span className='sign-in-main-success-close'
                    onClick={() => {setSuccessMessage(''); setErrorStyleChanges({});}}
                >&#215;</span> {/*close popup button*/}
            </p>}

            {/*buttons for third party authentication methods*/}
            <section className='sign-in-main-third-party'>
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
            </section>

            <section>
                {/*sign up with email form*/}
                <form onSubmit={defaultSignIn}>

                    <input className='sign-in-main-input' type='email' placeholder='Email Address' value={email}
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
            </section>

        </main>
    );
}

export default SignInMain;