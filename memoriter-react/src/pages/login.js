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
                <div className="Login_Base">
                    <p style={{fontSize: '25px'}} />
                    <MailForm/>
                    <PasswordForm/>
                    <button className="LoginButton">Log In</button>
                </div>
            </div>

            <footer>
                <Footer/>
            </footer>
        </div>
    );

}

export default LoginPage;
