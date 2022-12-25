import React from 'react';
import { useState, useEffect } from 'react';
import Logo from '../../../images/memoriter-logo.svg';
import Footer from '../../../components/footer/footer';
import Backdrop from '../../../components/backdrops/backdrop';
import PasswordReset from '../../settings/password-reset/password-reset';
import { Link, useNavigate } from 'react-router-dom';
import { firebase } from '../../../technical/utils/firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, getAuth } from 'firebase/auth';

function LoginPage() {

    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();

        if (auth.currentUser) {
            return navigate('/');
        }
    });

    const [passwordResetModal, openPasswordResetModal] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [invalidEmail, setInvalidEmail] = useState(false);
    const [redBorderEmail, setRedBorderEmail] = useState('5px solid var(--current-gray)');
    const [wrongPassword, setWrongPassword] = useState(false);
    const [redBorderPassword, setRedBorderPassword] = useState('5px solid var(--current-gray)');

    const [user, setUser] = useState({});

    onAuthStateChanged(firebase.auth, (currentUser) => {
        setUser(currentUser);
    });

    useEffect(() => {
        localStorage.setItem('lastPage', '/login');
    });

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setLoading(true);
            const user = signInWithEmailAndPassword(firebase.auth, email, password)
                .then(() => navigate('/'))
                .catch((error) => {
                    switch (error.code) {
                    case 'auth/wrong-password':
                        setError(true);
                        setLoading(false);
                        setRedBorderPassword('5px solid rgb(228, 48, 48)');
                        setWrongPassword(true);
                        break;
                    case error.code:
                        setError(true);
                        setLoading(false);
                        setRedBorderEmail('5px solid rgb(228, 48, 48)');
                        setInvalidEmail(true);
                        break;
                    }
                });
        } catch (err) {
            setLoading(false);
        }
    }


    return (
        <>
            <header className='page-header'>
                <Link to='/'>
                    <img className='header-logo' src={Logo} alt='site-logo' />
                </Link>
                <h1 className='page-title'>Log In</h1>
                <Link to='/signup' className='link-box'>Sign Up</Link>
            </header>
            <main>

                {passwordResetModal && <div>
                    <PasswordReset closePasswordResetModal={() => openPasswordResetModal(false)} />
                    <Backdrop onClick={() => openPasswordResetModal(false)} />
                </div>}

                <div className='rechteck'>

                    {error && <div className='File-Overview'
                        style={{ color: 'rgb(228, 48, 48)', paddingTop: '19px' }}>
                        Failed to log in!</div>}

                    <div className='main-seperator' />
                    <div className='Login_Base_Scroll'>
                        <div className='Login_Base'>
                            <form onSubmit={handleSubmit}>
                                <div style={{ height: '80px' }} />

                                <div className='folder-form-text' htmlFor='email'>Email Adress:</div>
                                <p style={{ fontSize: '5px' }} />
                                <input className='folder-form-input' type='email' id='email' name='email'
                                    placeholder='Please enter Email Adress...'
                                    value={email}
                                    style={{ border: redBorderEmail }}
                                    onChange={
                                        (e) => {
                                            setEmail(e.target.value);
                                            setInvalidEmail(false);
                                            setRedBorderEmail('5px solid var(--current-gray)');
                                        }} />
                                {invalidEmail && <p className='passwords-no-match'>Invalid Email!</p>}
                                <p style={{ fontSize: '25px' }} />

                                <div className='folder-form-text' htmlFor='password'>Password:</div>
                                <p style={{ fontSize: '5px' }} />
                                <input className='folder-form-input' type='password' id='password' name='password'
                                    placeholder='Please Enter Password...' maxLength={50}
                                    style={{ border: redBorderPassword }}
                                    onChange={
                                        (e) => {
                                            setPassword(e.target.value);
                                            setWrongPassword(false);
                                            setRedBorderPassword('5px solid var(--current-gray)');
                                        }} />
                                {wrongPassword && <p className='passwords-no-match'>Wrong Password!</p>}

                                <p className='forgot-password' onClick={() => openPasswordResetModal(true)}>Forgot Password?</p>

                                <button type='submit' className='login-button' disabled={loading}>Log In</button>
                            </form>
                            <p className='no-account'>Do you need an account? You can sign up&nbsp;</p>
                            <Link to='/signup' className='no-account' style={{ color: '#265272', cursor: 'pointer' }}>here</Link>
                            <p className='no-account'>!</p>
                            <div className='no-account' style={{ height: '20px', display: 'block' }} />
                        </div>
                    </div>
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );

}

export default LoginPage;
