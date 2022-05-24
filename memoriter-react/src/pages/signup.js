import React from "react";
import Logo from './Logo.png';
import Footer from "../components/Footer";
import WithGoogle from "../components/WithGoogle";
import { useState } from "react";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { firebase } from "../utils/firebase";


function SignUpPage(props) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const [invalidEmail, setInvalidEmail] = useState(false);
    const [emailInUse, setEmailInUse] = useState(false);
    const [redBorderEmail, setRedBorderEmail] = useState('5px solid rgba(58,109,112,1)');
    const [shortPassword, setShortPassword] = useState(false);
    const [redBorderPassword, setRedBorderPassword] = useState('5px solid rgba(58,109,112,1)');
    const [samePassword, setSamePassword] = useState(false);
    const [redBorderConfirm, setRedBorderConfirm] = useState('5px solid rgba(58,109,112,1)');

    const [user, setUser] = useState({})

    onAuthStateChanged(firebase.auth, (currentUser) => {
        setUser(currentUser);
    })

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
        } try {
            setError(false);
            setLoading(true);
            const user = createUserWithEmailAndPassword(firebase.auth, email, password)
            .catch(error => {   
                switch(error.code) {
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
             })
        } catch(err) {
            setLoading(false);
        }
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
                <Link to='/' className="link-box">Log In</Link>
            </header>

            <div className="rechteck">


                {error && <div className="File-Overview"
                    style={{color: 'rgb(228, 48, 48)', paddingTop: '19px'}}>
                    Failed to create an account!</div>}

                <div className="main-seperator"/>
                <div className="Login_Base_Scroll">
                    <div className="Login_Base">
                        <p style={{fontSize: '25px'}} />
                            <form onSubmit={handleSubmit}>

                                    <div className="Add_Folder_Form_Text" htmlFor="email">Email Adress:</div>
                                    <p style={{ fontSize: '5px' }} />
                                    <input className="Add_Folder_Form_Input" type="email" id="email" name="email"
                                        placeholder='Please enter Email Adress...'
                                        style={{border: redBorderEmail}}
                                        onChange={
                                            (e) => {setEmail(e.target.value);
                                            setInvalidEmail(false);
                                            setEmailInUse(false);
                                            setRedBorderEmail('5px solid rgba(58,109,112,1)');
                                        }} />
                                    {invalidEmail && <p className="passwords-no-match">Invalid Email!</p>}
                                    {emailInUse && <p className="passwords-no-match">Email already in use!</p>}
                                    <p style={{ fontSize: '25px' }}/>
                            
                                    <div className="Add_Folder_Form_Text" htmlFor="password">Password:</div>
                                    <p style={{fontSize: '5px'}} />
                                    <input className="Add_Folder_Form_Input" type="password" id="password" name="password"
                                        placeholder="Please Enter Password..." maxLength={50}
                                        style={{border: redBorderPassword}}
                                        onChange={(e) => {setPassword(e.target.value);
                                            setShortPassword(false); setSamePassword(false);
                                            setRedBorderPassword('5px solid rgba(58,109,112,1)');
                                            setRedBorderConfirm('5px solid rgba(58,109,112,1)');
                                        }} />
                                    {samePassword && <p className="passwords-no-match">Passwords do not match!</p>}
                                    {shortPassword && <p className="passwords-no-match">Password should be at least 6 characters long!</p>}
                                    <p style={{fontSize: '25px'}} />
                            
                                    <div className="Add_Folder_Form_Text" htmlFor="password">Confirm Password:</div>
                                    <p style={{fontSize: '5px'}} />
                                    <input className="Add_Folder_Form_Input" type="password" id="password-confirm" name="password"
                                        placeholder="Please Enter Password Again..." maxLength={50}
                                        style={{border: redBorderConfirm}}
                                        onChange={(e) => {setPasswordAgain(e.target.value);
                                            setShortPassword(false); setSamePassword(false);
                                            setRedBorderPassword('5px solid rgba(58,109,112,1)');
                                            setRedBorderConfirm('5px solid rgba(58,109,112,1)');
                                        }} />
                                    {samePassword && <p className="passwords-no-match">Passwords do not match!</p>}
                                    <p style={{fontSize: '25px'}} />

                                <button type="submit" className="LoginButton" disabled={loading} style={{top:"330px"}}>Sign Up</button>
                            </form>
                        <p className="no-account">Already have an account? You can log in&nbsp;</p>
                        <Link to='/' className="no-account" style={{color: '#265272', cursor: 'pointer'}}>here</Link>
                        <p className="no-account">!</p>
                    </div>
                    <form className="check_total">
                            <input type='checkbox' name='accept_privacy' value='accepted'></input>
                            <label className='check_text' htmlFor="accept_privacy">Accept the privacy policies!</label>
                    </form>
                </div>
            </div>

            <footer>
                <Footer/>
            </footer>
        </div>
    );
}

export default SignUpPage;