import WebsiteHead from '../components/website-head';
import SignInHeader from '../components/sign-in/sign-in-header';
import SignInMain from '../components/sign-in/sign-in-main';
import SignInPasswordReset from '../components/sign-in/sign-in-password-reset';
import Backdrop from '../components/backdrop';
import AlreadySignedIn from '../components/sign-in/already-signed-in';
import WindowSizeAlert from '../components/window-size-alert';
import { useState } from 'react';
import { firebase } from '../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const SignIn = () => {

    const SignInMainBottomSpace = { //styles for extra space at the bottom on page scroll
        position: 'absolute',
        left: '0',
        top: '660px',
        width: '100%',
        height: '40px',
        zIndex: '-1'
    };

    const [user, setUser] = useState({}); //variable for currently signed in user

    onAuthStateChanged(firebase.auth, (currentUser) => { //updates user variable when user changes
        setUser(currentUser);
    });

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
            <WebsiteHead title='Sign In' description='Sign in with your Memoriter account.'/>
            {/*title property is for displaying a custom page title, description is for a custom meta description*/}
                
            {/*header*/}
            <SignInHeader/>
                
            {!user ? (<> {/*when user is logged in an already signed in page displays*/}

                {/*container with content*/}
                <SignInMain onOpenPasswordReset={openPasswordReset}/>
                <div style={SignInMainBottomSpace}/> {/*space at the bottom on page scroll*/}

                {passwordReset && <>
                    <SignInPasswordReset onAnimation={passwordResetAnimation} onClosePasswordReset={closePasswordReset}/>
                    <Backdrop onFade={backdropAnimation} onClick={closePasswordReset}/>
                </>}

            </>) : (<> 

                {/*already signed in page*/}
                <AlreadySignedIn title='Sign In'/>
                <div style={SignInMainBottomSpace}/> {/*space at the bottom on page scroll*/}
                
            </>)}

            {/*alert for too small screens*/}
            <WindowSizeAlert/>

        </>
    );
}

export default SignIn;