import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { firebase } from '../../../technical/utils/firebase';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { displaySuccessMessage } from '../../../technical/features/authentication-success-slice';

const AlreadySignedIn = ({ title }) => {

    const navigate = useNavigate(); //variable for navigation between pages, alternative to link

    const dispatch = useDispatch(); //used to manipulate global sate (react redux)

    const [onHoverSignOut, setOnHoverSignOut] = useState('brightness(1)'); //variable for the hover effect for the sign out button
    const [onHoverReturn, setOnHoverReturn] = useState('brightness(1)'); //variable for the hover effect for the return to website button
    const [onHoverContinue, setOnHoverContinue] = useState('brightness(1)'); //variable for the hover effect for the continue to app button

    function signOutFunction() { //function for sign out
        signOut(firebase.auth); //pre-built sign out firebase function
        dispatch(displaySuccessMessage('Successfully signed out!')); //sets state for the sign-in-main component to read to display a success message
        navigate('/signin');
    };

    return(
        <main className='sign-in-main'>

            <h1 className='sign-in-main-heading'>{title}</h1> {/*heading/title is either sign in or register*/}

            <p className='sign-in-main-error'>You are already signed in!</p> {/*red error box*/}

            <section>
                {/*style is for better text formatting*/}
                <p className='sign-in-main-text' style={{textAlign: 'justify', margin: '20px 48px 24px 48px'}}>
                    An account is already signed in in this browser.
                    Please choose on of the following options to proceed:
                </p>

                {/*sign out button*/}
                <button className='sign-in-main-button' style={{backgroundColor: 'var(--color-transparent)'}} onClick={signOutFunction}
                    onMouseEnter={() => setOnHoverSignOut('brightness(0.82)')} onMouseLeave={() => setOnHoverSignOut('brightness(1)')}>
                    {/*the onMouseEnter and -Leave is for the fade effect on hover which was not possible in css and the background animation.*/}
                    <div className='sign-in-main-button-background-gray' 
                        style={{transform: 'translate(-8px)', width: 'calc(100% + 16px)', filter: onHoverSignOut}}/>
                    <span className='sign-in-main-button-text'>Sign Out</span>
                </button>

                {/*return to product page button*/}
                <button className='sign-in-main-button' style={{backgroundColor: 'var(--color-transparent)'}}
                    onMouseEnter={() => setOnHoverReturn('brightness(0.82)')} onMouseLeave={() => setOnHoverReturn('brightness(1)')}>
                    {/*the onMouseEnter and -Leave is for the fade effect on hover which was not possible in css and the background animation.*/}
                    <Link to='/product'>
                        <div className='sign-in-main-button-background-gray' 
                            style={{transform: 'translate(-8px)', width: 'calc(100% + 16px)', filter: onHoverReturn}}/>
                        <span className='sign-in-main-button-text'>Return to Website</span>
                    </Link>
                </button>

                {/*continue to app button*/}
                <button className='sign-in-main-button' style={{backgroundColor: 'var(--color-transparent)'}} onClick={() => navigate('/')}
                    onMouseEnter={() => setOnHoverContinue('brightness(0.75)')} onMouseLeave={() => setOnHoverContinue('brightness(1)')}>
                    {/*the onMouseEnter and -Leave is for the fade effect on hover which was not possible in css and the background animation.*/}
                    <Link to='/'>  
                        <div className='sign-in-main-button-background' 
                            style={{transform: 'translate(-8px)', width: 'calc(100% + 16px)', filter: onHoverContinue}}/>
                        <span className='sign-in-main-button-text'>Continue to App</span>
                    </Link> 
                </button>
            </section>

            {/*link to privacy policiy and terms of use page*/}
            <section>
                <p className='sign-in-main-text'><Link className='sign-in-main-link' to='/privacy' target='_blank'>Privacy Policy</Link></p>
                <p className='sign-in-main-text'><Link className='sign-in-main-link' to='/terms' target='_blank'>Terms of Use</Link></p>
            </section>

        </main>
    );
}

export default AlreadySignedIn;