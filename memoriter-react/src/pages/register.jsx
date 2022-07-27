import Head from '../components/head';
import SignInHeader from '../components/sign-in/sign-in-header';
import RegisterMain from '../components/sign-in/register-main';
import AlreadySignedIn from '../components/sign-in/already-signed-in';
import WindowSizeAlert from '../components/window-size-alert';
import { useState } from 'react';
import { firebase } from '../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Register = () => {

    const RegisterMainBottomSpace = { //styles for extra space at the bottom on page scroll
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

    return (
        <>
            
            {/*head*/}
            <Head title='Register' description='Create a new Memoriter account.'/>
            {/*title property is for displaying a custom page title, description is for a custom meta description*/}

            {/*header*/}
            <SignInHeader/>

            {!user ? (<> {/*when user is logged in an already signed in page displays*/}

                {/*container with content*/}
                <RegisterMain/>
                <div style={RegisterMainBottomSpace}/> {/*space at the bottom on page scroll*/}

            </>) : (<> 

                {/*already signed in page*/}
                <AlreadySignedIn title='Register'/>
                <div style={RegisterMainBottomSpace}/> {/*space at the bottom on page scroll*/}
                
            </>)}

            {/*alert for too small screens*/}
            <WindowSizeAlert/>

        </>
    );
}

export default Register;