import React from "react";
import Logo from './Logo.png';
import MailForm from "../components/mailForm";
import PasswordForm from "../components/passwordForm";
import WithGoogle from "../components/WithGoogle";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

function LoginPage() {
    return(
        <div>
            <header className='Page_Header'>
                <img className="Logo-oben" src={Logo} alt="site-logo" />
                <h1 className="page_title">Log In</h1>
                <Link to='/signup' className="link-box">Sign Up</Link>
            </header>
            <div className="rechteck">
                <div className="main-seperator"/>
                <div className="Login_Base_Scroll">
                    <div className="Login_Base">
                        <div style={{height: '80px'}} />
                        <MailForm/>
                        <PasswordForm/>
                        <button className="LoginButton">Log In</button>
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
