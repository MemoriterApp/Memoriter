import Logo from '../../../images/memoriter-logo.svg';
import Footer from '../../../components/footer/footer';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { firebase } from '../../../technical/utils/mongo';


function SignUpPage() {

    const navigate = useNavigate();

    useEffect(() => {
        const auth = getAuth();

        if (auth.currentUser) {
            return navigate('/');
        }
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [invalidEmail, setInvalidEmail] = useState(false);
    const [emailInUse, setEmailInUse] = useState(false);
    const [redBorderEmail, setRedBorderEmail] = useState('5px solid var(--current-gray)');
    const [shortPassword, setShortPassword] = useState(false);
    const [redBorderPassword, setRedBorderPassword] = useState('5px solid var(--current-gray)');
    const [samePassword, setSamePassword] = useState(false);
    const [redBorderConfirm, setRedBorderConfirm] = useState('5px solid var(--current-gray)');
    const [isAccepted, setIsAccepted] = useState(false);
    const [borderBlueCheckbox, setBorderBlueCheckbox] = useState(true);
    const [borderRedCheckbox, setBorderRedCheckbox] = useState(false);

    useEffect(() => {
        localStorage.setItem('lastPage', '/signup');
    });

    async function handleSubmit(e) {
        e.preventDefault();

        if (password !== passwordAgain) {
            setShortPassword(false);
            setSamePassword(true);
            setRedBorderPassword('5px solid rgb(228, 48, 48)');
            setRedBorderConfirm('5px solid rgb(228, 48, 48)');
            return setError(true);
        } else if (password.length < 6) {
            setSamePassword(false);
            setShortPassword(true);
            setRedBorderPassword('5px solid rgb(228, 48, 48)');
            return setError(true);
        } else if (isAccepted === false) {
            setBorderBlueCheckbox(false);
            setBorderRedCheckbox(true);
            return setError(true);
        } try {
            setError(false);
            setLoading(true);
            const user = createUserWithEmailAndPassword(firebase.auth, email, password)
                .then(() => navigate('/'))
                .catch((error) => {
                    switch (error.code) {
                    case 'auth/email-already-in-use':
                        setError(true);
                        setLoading(false);
                        setRedBorderEmail('5px solid rgb(228, 48, 48)');
                        setEmailInUse(true);
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
                <h1 className='page-title'>Sign Up</h1>
                <Link to='/login' className='link-box'>Log In</Link>
            </header>
            <main>
                <div className='rechteck'>


                    {error && <div className='File-Overview'
                        style={{ color: 'rgb(228, 48, 48)', paddingTop: '19px' }}>
                        Failed to create an account!</div>}

                    <div className='main-seperator' />
                    <div className='Login_Base_Scroll'>
                        <div className='Login_Base'>
                            <p style={{ fontSize: '25px' }} />
                            <form onSubmit={handleSubmit}>

                                <div className='folder-form-text' data-htmlFor='email'>Email Adress:</div>
                                <p style={{ fontSize: '5px' }} />
                                <input className='folder-form-input' type='email' id='email' name='email'
                                    placeholder='Please enter Email Adress...'
                                    style={{ border: redBorderEmail }}
                                    onChange={
                                        (e) => {
                                            setEmail(e.target.value);
                                            setInvalidEmail(false);
                                            setEmailInUse(false);
                                            setRedBorderEmail('5px solid var(--current-gray)');
                                        }} />
                                {invalidEmail && <p className='passwords-no-match'>Invalid Email!</p>}
                                {emailInUse && <p className='passwords-no-match'>Email already in use!</p>}
                                <p style={{ fontSize: '25px' }} />

                                <div className='folder-form-text' data-htmlFor='password'>Password:</div>
                                <p style={{ fontSize: '5px' }} />
                                <input className='folder-form-input' type='password' id='password' name='password'
                                    placeholder='Please Enter Password...' maxLength={50}
                                    style={{ border: redBorderPassword }}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setShortPassword(false); setSamePassword(false);
                                        setRedBorderPassword('5px solid var(--current-gray)');
                                        setRedBorderConfirm('5px solid var(--current-gray)');
                                    }} />
                                {samePassword && <p className='passwords-no-match'>Passwords do not match!</p>}
                                {shortPassword && <p className='passwords-no-match'>Password should be at least 6 characters long!</p>}
                                <p style={{ fontSize: '25px' }} />

                                <div className='folder-form-text' data-htmlFor='password'>Confirm Password:</div>
                                <p style={{ fontSize: '5px' }} />
                                <input className='folder-form-input' type='password' id='password-confirm' name='password'
                                    placeholder='Please Enter Password Again...' maxLength={50}
                                    style={{ border: redBorderConfirm }}
                                    onChange={(e) => {
                                        setPasswordAgain(e.target.value);
                                        setShortPassword(false); setSamePassword(false);
                                        setRedBorderPassword('5px solid var(--current-gray)');
                                        setRedBorderConfirm('5px solid var(--current-gray)');
                                    }} />
                                {samePassword && <p className='passwords-no-match'>Passwords do not match!</p>}
                                <p style={{ fontSize: '55px' }} />

                                {borderBlueCheckbox && <div className='accept_privacy'>
                                    <input type='checkbox' id='accept_privacy'
                                        onChange={() => setIsAccepted(!isAccepted)} />
                                    <label htmlFor='accept_privacy'>I agree to our<p style={{ display: 'inline' }}> </p>
                                        <Link to='/privacy' target='_blank' style={{ color: '#265272', cursor: 'pointer' }}>privacy policiy</Link>.</label>
                                </div>}

                                {borderRedCheckbox && <div className='accept_privacy_red'>
                                    <input type='checkbox' id='accept_privacy'
                                        onChange={() => setIsAccepted(!isAccepted)} />
                                    <label htmlFor='accept_privacy'>I agree to our<p style={{ display: 'inline' }}> </p>
                                        <Link to='/privacy' style={{ color: '#265272', cursor: 'pointer' }}>privacy policiy</Link>.</label>
                                </div>}


                                <button type='submit' className='login-button' disabled={loading} style={{ top: '385px' }}>Sign Up</button>
                            </form>
                            <p className='no-account'>Already have an account? You can log in&nbsp;</p>
                            <Link to='/login' className='no-account' style={{ color: '#265272', cursor: 'pointer' }}>here</Link>
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

export default SignUpPage;