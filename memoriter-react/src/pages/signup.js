import React from "react";
import Logo from './Logo.png';
import Footer from "../components/Footer";
import MailForm from "../components/mailForm";
import WithGoogle from "../components/WithGoogle";
import { useRef } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import PasswordAlert from "../components/PassowrdAlter";


function SignUpPage(props) {
    const passwordRef = useRef();
    const passwordAgainRef = useRef()
    const emailRef = useRef()
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordAgainRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordAgainRef.current.value, passwordRef.current.value)
        }
        catch {
            setError('failed to create an account')
        }
        setLoading(false)

        signup(passwordRef.current.value, passwordAgainRef.current.value, emailRef.current.value)
    }

    return (
        <div>
            <header className='Page_Header'>
                <img className="Logo-oben" src={Logo} alt="site-logo" />
                <h1 className="page_title">Sign Up</h1>
                {error && <p>{error}</p>}
                <div className="link-box">
                        <span className="Signup1">Sign Up</span>
                        <span className="Login1">Login</span>
                </div>
            </header>

            <body className="rechteck">
                <div className="main-seperator"/>
                <div className="Login_Base">
                    <p style={{fontSize: '25px'}} />
                        <form onSubmit={handleSubmit}>
                            <div className="Add_Folder_Form_Text" htmlFor="email">Email Adress:</div>
                            <p style={{ fontSize: '5px' }} />
                            <input className="Add_Folder_Form_Input" ref={emailRef} type="email" id="email" name="email"
                                placeholder='Please enter Email Adress...' />
                            <p style={{ fontSize: '25px' }} />
                        </form>
                        <form>
                            <div className="Add_Folder_Form_Text" htmlFor="password">Password:</div>
                            <p style={{fontSize: '5px'}} />
                            <input className="Add_Folder_Form_Input" ref={passwordRef} type="password" id="password" name="password"
                                placeholder="Please Enter Password..."/>
                            <p style={{fontSize: '25px'}} />
                        </form>
                        <form>
                            <div className="Add_Folder_Form_Text" htmlFor="password">password again:</div>
                            <p style={{fontSize: '5px'}} />
                            <input className="Add_Folder_Form_Input" ref={passwordAgainRef} type="password" id="password" name="password"
                                placeholder="Please Enter Password again..."/>
                            <p style={{fontSize: '25px'}} />
                        </form>
                    <button type="submit" className="LoginButton" disabled={loading}>Sign Up</button>
                    <WithGoogle login={props.login}/>
                </div>
            </body>

            <footer>
                <Footer/>
            </footer>
        </div>
    );
}

export default SignUpPage;