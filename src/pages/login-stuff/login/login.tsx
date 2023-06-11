import { useState, useEffect, FormEvent, useCallback } from 'react';
import Logo from '../../../images/memoriter-logo.svg';
import Backdrop from '../../../components/backdrops/backdrop/backdrop';
import PasswordReset from '../../settings/password-reset/password-reset';
import { Link, useNavigate } from 'react-router-dom';
import { firebase } from '../../../technical/utils/mongo';
import { signInWithEmailAndPassword, onAuthStateChanged, getAuth } from 'firebase/auth';
import FooterButton from '../../../components/layout/footer/footer';
import './login.css';

function LoginPage() {

    function handleError(error: any) {
        switch (error.code) {
            case 'auth/wrong-password':
                setLoading(false);
                setRedBorderPassword('5px solid var(--current-red)');
                setWrongPassword(true);
                break;
            case error.code:
                setLoading(false);
                setRedBorderEmail('5px solid var(--current-red)');
                break;
        }
    }

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

    const [redBorderEmail, setRedBorderEmail] = useState('5px solid var(--current-gray)');
    const [wrongPassword, setWrongPassword] = useState(false);
    const [redBorderPassword, setRedBorderPassword] = useState('5px solid var(--current-gray)');


    useEffect(() => {
        localStorage.setItem('lastPage', '/login');
    });

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        try {
            setLoading(true);
            const currentUser = signInWithEmailAndPassword(firebase.auth, email, password)
                .then(() => navigate('/'))
                .catch((error) => {
                    handleError(error);
                    setError(true);
                });
        } catch (err) {
            setLoading(false);
        }
    } [navigate, firebase.auth, email, password, setLoading, handleError];

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
                {passwordResetModal && (
                    <div>
                        <PasswordReset closePasswordResetModal={() => openPasswordResetModal(false)} />
                        <Backdrop onClick={() => openPasswordResetModal(false)} />
                    </div>
                )}

                {error && <div className='failed-login'>Failed to log in!</div>}

                <div className='top-divider' />
                <div className='login-container'>
                    <form onSubmit={handleSubmit} autoComplete='on'>
                        <div style={{ height: '80px' }} />

                        <label htmlFor='email'>Email Address:</label>
                        <p style={{ fontSize: '5px' }} />
                        <input
                            className='mail-and-password-form-input'
                            type='email'
                            id='email'
                            name='email'
                            placeholder='Please enter an email address...'
                            value={email}
                            style={{ border: redBorderEmail }}
                            autoComplete='email'
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setRedBorderEmail('5px solid var(--current-gray)');
                            }}
                        />

                        <p style={{ fontSize: '5px' }} />

                        <label htmlFor='password'>Password:</label>
                        <p style={{ fontSize: '5px' }} />
                        <input
                            className='mail-and-password-form-input'
                            type='password'
                            id='password'
                            name='password'
                            placeholder='Please Enter a Password...'
                            maxLength={50}
                            style={{ border: redBorderPassword }}
                            autoComplete='current-password'
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setWrongPassword(false);
                                setRedBorderPassword('5px solid var(--current-gray)');
                            }}
                        />
                        {wrongPassword && <p className='passwords-no-match'>Wrong Password!</p>}

                        <p className='forgot-password' onClick={() => openPasswordResetModal(true)}>
                            Forgot Password?
                        </p>

                        <button type='submit' className='login-button' disabled={loading}>
                            Log In
                        </button>

                        <input type='hidden' name='username' value={email} />
                    </form>

                    <p className='no-account'>
                        Do you need an account? You can sign up{' '}
                        <Link to='/signup' style={{ color: '(var(--current-blue-dark)' }}>
                            here
                        </Link>
                        !
                    </p>
                </div>
            </main>

            <footer>
                <FooterButton />
            </footer>
        </>
    );

}

export default LoginPage;
