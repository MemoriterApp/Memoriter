import '../../styles/sign-in/sign-in-main.css';
import googleIcon from '../../images/google-icon.svg';
import appleIcon from '../../images/apple-icon.svg';
import facebookIcon from '../../images/facebook-icon.svg';
import githubIcon from '../../images/github-icon.svg';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SignInMain = () => {

    const [onHover, setOnHover] = useState('brightness(1)'); //variable for the hover effect for the create account button

    return (
        <div className='sign-in-main'>
            
            <h1 className='sign-in-main-header'>Sign In</h1>

            {/*buttons for third party authenticationmethods*/}
            <div className='sign-in-main-third-party'>
                <button className='sign-in-main-google'>
                    <img src={googleIcon} alt='google-icon' className='sign-in-main-google-icon'/>
                </button>

                <button className='sign-in-main-apple'>
                    <img src={appleIcon} alt='apple-icon' className='sign-in-main-apple-icon'/>
                </button>

                <button className='sign-in-main-facebook'>
                    <img src={facebookIcon} alt='facebook-icon' className='sign-in-main-facebook-icon'/>
                </button>

                <button className='sign-in-main-github'>
                    <img src={githubIcon} alt='github-icon' className='sign-in-main-github-icon'/>
                </button>
            </div>

            {/*sign up with email form*/}
            <form>

                <input className='sign-in-main-input' type='email' placeholder='Email Adress'/>

                <input className='sign-in-main-input' type='password' placeholder='Password'/>

                <p className='sign-in-main-forgot-password'>Forgot Password?</p>{/*password reset link*/}
                
                {/*sign in button*/}
                <div className='sign-in-main-button'
                    onMouseEnter={() => setOnHover('brightness(0.75)')} onMouseLeave={() => setOnHover('brightness(1)')}>
                    {/*the onMouseEnter and -Leave is for the fade effect on hover which was not possible in css and the background animation.*/}
                    <div className='sign-in-main-button-background' style={{filter: onHover}}/>
                    <span className='sign-in-main-button-text'>Sign In</span>
                </div>

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