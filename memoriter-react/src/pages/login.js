import React from "react";
import { useState } from "react";
import Logo from './Logo.png';
import WithGoogle from "../components/WithGoogle";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { firebase } from "../utils/firebase";
import PasswordAlert from "../components/PassowrdAlter";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

function LoginPage() {

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const [user, setUser] = useState({})

    onAuthStateChanged(firebase.auth, (currentUser) => {
        setUser(currentUser);
    })

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            const user = signInWithEmailAndPassword(firebase.auth, email, password);

        }
        catch {
            setError('failed to create an account')
        }
        setLoading(false)
    }

    return(
        <div>
            <header className='Page_Header'>
                <img className="Logo-oben" src={Logo} alt="site-logo" />
                <h1 className="page_title">Log In</h1>
                <Link to='/signup' className="link-box">Sign Up</Link>
            </header>
            <div className="rechteck">

                {user && <div style={{color: 'red'}}>{user.email}</div>}

                {error && <PasswordAlert/>}
                <div className="main-seperator"/>
                <div className="Login_Base_Scroll">
                    <div className="Login_Base">
                        <form onSubmit={handleSubmit}>
                            <div style={{height: '80px'}} />

                            <div className="Add_Folder_Form_Text" htmlFor="email">Email Adress:</div>
                            <p style={{ fontSize: '5px' }} />
                            <input className="Add_Folder_Form_Input" type="email" id="email" name="email"
                                placeholder='Please enter Email Adress...'
                                onChange={(e) => setEmail(e.target.value)} />
                            <p style={{ fontSize: '25px' }}/>

                            <div className="Add_Folder_Form_Text" htmlFor="password">Password:</div>
                            <p style={{fontSize: '5px'}} />
                            <input className="Add_Folder_Form_Input" type="password" id="password" name="password"
                                placeholder="Please Enter Password..." maxLength={50}
                                onChange={(e) => setPassword(e.target.value)} />
                            <p style={{fontSize: '25px'}} />

                            <p className="forgot-password">Forgot Password?</p>

                            <button type="submit" className="LoginButton" disabled={loading}>Log In</button>
                        </form>
                        <WithGoogle/>
                        <p className="no-account">Do you need an account? You can sign up&nbsp;</p>
                        <Link to='/signup' className="no-account" style={{color: '#265272', cursor: 'pointer'}}>here</Link>
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

export default LoginPage;
