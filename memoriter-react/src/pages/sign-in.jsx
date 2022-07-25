import Head from '../components/head';
import SignInHeader from '../components/sign-in/sign-in-header';
import SignInMain from '../components/sign-in/sign-in-main';
import SignInMainPasswordReset from '../components/sign-in/sign-in-password-reset';
import Backdrop from '../components/backdrop';
import WindowSizeAlert from '../components/window-size-alert';
import { useState } from 'react';

const SignIn = () => {

    const SignInMainBottomSpace = { //styles for extra space at the bottom on page scroll
        position: 'absolute',
        left: '0',
        top: '660px',
        width: '100%',
        height: '40px'
    }

    const [passwordReset, setPasswordReset] = useState(false); //opens or closes password reset modal
    
    const [passwordResetAnimation, setPasswordResetAnimation] = useState({ //animation when opening password reset modal
        transform: 'translate(-50%, calc(-50% - 16px))',
        opacity: '0',
    }); //styles used for the password reset fade in and out animation
    const [backdropAnimation, setBackdropAnimation] = useState('0'); //backdrop opacity (used for fade in and out animation)

    function openPasswordReset() { //function for opening the password reset modal
        document.body.style.overflow = 'hidden'; //disables page scrolling
        setPasswordReset(true);
        setTimeout(() => {
            setBackdropAnimation('1');
            setPasswordResetAnimation({
                transform: 'translate(-50%, -50%)',
                opacity: '1'
            });
        }, 0);
        //setBackdropAnimation triggers a transition in the backdrop component creating the fade in effect, does not work without timeout
    };

    function closePasswordReset() { //function for closing the password reset modal
        document.body.style.overflow = 'auto'; //re-enables page scrolling
        setTimeout(() => {setPasswordReset(false);}, 800); //timeout is needed for finishing the fade effect before closing everything
        setTimeout(() => {
            setBackdropAnimation('0');
            setPasswordResetAnimation({
                transform: 'translate(-50%, calc(-50% - 16px))',
                opacity: '0'
            });
        }, 0);
        //setBackdropAnimation triggers a transition in the backdrop component creating the fade out effect, does not work without timeout
    };

    return (
        <>

            {/*head*/}
            <Head title='Sign In' description='Sign in with your Memoriter account.'/>
            {/*title property is for displaying a custom page title, description is for a custom meta description*/}
                
            {/*header*/}
            <SignInHeader/>
                
            {/*container with content*/}
            <SignInMain onOpenPasswordReset={openPasswordReset}/>
            <div style={SignInMainBottomSpace}/> {/*space at the bottom on page scroll*/}

            {passwordReset && <>
                <SignInMainPasswordReset onAnimation={passwordResetAnimation} onClosePasswordReset={closePasswordReset}/>
                <Backdrop onFade={backdropAnimation} onClick={closePasswordReset}/>
            </>}

            {/*alert for too small screens*/}
            <WindowSizeAlert/>

        </>
    );
}

export default SignIn;