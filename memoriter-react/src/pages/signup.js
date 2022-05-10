import React from "react";
import Logo from './Logo.png';
import Footer from "../components/Footer";
import WithGoogle from "../components/WithGoogle";
import { useState } from "react";
import PasswordAlert from "../components/PassowrdAlter";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { firebase } from "../utils/firebase";


function SignUpPage(props) {
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [samePassword, setSamePassword] = useState(false);
    const [shortPassword, setShortPassword] = useState(false);
    const [redBorder, setRedBorder] = useState('5px solid rgba(58,109,112,1)');
    const [redBorderC, setRedBorderC] = useState('5px solid rgba(58,109,112,1)');
    const [redBorderE, setRedBorderE] = useState('5px solid rgba(58,109,112,1)');
    const [emailInUse, setEmailInUse] = useState(false);

    const [user, setUser] = useState({})

    onAuthStateChanged(firebase.auth, (currentUser) => {
        setUser(currentUser);
    })

    async function handleSubmit(e) {
        e.preventDefault()

        if (password.length < 6) {
            setRedBorder('5px solid rgb(228, 48, 48)');
            setShortPassword(true);
            setSamePassword(false);
            return setError('Password is too short');
        }
        else if (password !== passwordAgain) {
            setRedBorder('5px solid rgb(228, 48, 48)');
            setRedBorderC('5px solid rgb(228, 48, 48)');
            setSamePassword(true)
            setShortPassword(false);
            return setError('Passwords do not match')  
        }
        try {
            setError('')
            setLoading(true)
            const user = createUserWithEmailAndPassword(firebase.auth, email, password);
            console.log(user);
            setTimeout(() => {
                setEmailInUse(true);
                setRedBorderE('5px solid rgb(228, 48, 48)');
                setError('Failed to Sign Up!')}, 500);
        }
        catch {
            setError('Failed to Sign Up!');
        }
        setLoading(false)
    }

    function isAuth() {
            if (user) {
                // User is signed in.
                console.log("you are signed in")
              } else {
                // No user is signed in.
                console.log("you are not signed in")
              };
    }
    isAuth();

    return (
        <div>
            <header className='Page_Header'>
                <img className="Logo-oben" src={Logo} alt="site-logo" />
                <h1 className="page_title">Sign Up</h1>
                <Link to='/login' className="link-box">Log In</Link>
            </header>

            <div className="rechteck">

                {user && <div style={{color: 'red'}}>{user.email}</div>}

                {error && <PasswordAlert/>}
                <div className="main-seperator"/>
                <div className="Login_Base_Scroll">
                    <div className="Login_Base">
                        <p style={{fontSize: '25px'}} />
                            <form onSubmit={handleSubmit}>

                                    <div className="Add_Folder_Form_Text" htmlFor="email">Email Adress:</div>
                                    <p style={{ fontSize: '5px' }} />
                                    <input className="Add_Folder_Form_Input" type="email" id="email" name="email"
                                        placeholder='Please enter Email Adress...'
                                        style={{border: redBorderE}}
                                        onChange={
                                            (e) => {setEmail(e.target.value);
                                            setEmailInUse(false);
                                            setRedBorderE('5px solid rgba(58,109,112,1)');
                                        }} />
                                    {emailInUse && <p className="passwords-no-match">Invalid Email!</p>}
                                    <p style={{ fontSize: '25px' }}/>
                            
                                    <div className="Add_Folder_Form_Text" htmlFor="password">Password:</div>
                                    <p style={{fontSize: '5px'}} />
                                    <input className="Add_Folder_Form_Input" type="password" id="password" name="password"
                                        placeholder="Please Enter Password..." maxLength={50}
                                        style={{border: redBorder}}
                                        onChange={(e) => {setPassword(e.target.value);
                                            setShortPassword(false); setSamePassword(false);
                                            setRedBorder('5px solid rgba(58,109,112,1)'); setRedBorderC('5px solid rgba(58,109,112,1)');
                                        }} />
                                    {samePassword && <p className="passwords-no-match">Passwords do not match!</p>}
                                    {shortPassword && <p className="passwords-no-match">Password should be at least 6 characters long!</p>}
                                    <p style={{fontSize: '25px'}} />
                            
                                    <div className="Add_Folder_Form_Text" htmlFor="password">Confirm Password:</div>
                                    <p style={{fontSize: '5px'}} />
                                    <input className="Add_Folder_Form_Input" type="password" id="password-confirm" name="password"
                                        placeholder="Please Enter Password Again..." maxLength={50}
                                        style={{border: redBorderC}}
                                        onChange={(e) => {setPasswordAgain(e.target.value);
                                            setShortPassword(false); setSamePassword(false);
                                            setRedBorder('5px solid rgba(58,109,112,1)'); setRedBorderC('5px solid rgba(58,109,112,1)');
                                        }} />
                                    {samePassword && <p className="passwords-no-match">Passwords do not match!</p>}
                                    <p style={{fontSize: '25px'}} />

                                <button type="submit" className="LoginButton" disabled={loading}>Sign Up</button>
                            </form>
                        <WithGoogle login={props.login}/>
                        <p className="no-account">Already have an account? You can log in&nbsp;</p>
                        <Link to='/login' className="no-account" style={{color: '#265272', cursor: 'pointer'}}>here</Link>
                        <p className="no-account">!</p>
                    </div>
                </div>
            </div>

            <footer>
                <Footer/>
            </footer>
        </div>
    );
}

export default SignUpPage;