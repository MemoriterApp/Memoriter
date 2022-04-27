import React from "react";
import Logo from './Logo.png';
import MailForm from "../components/mailForm";
import PasswordForm from "./passwordForm";

function LoginPage() {
    return(
        <div>
            <header>
                <img className="Logo-oben-login" src={Logo} alt=''/>
                <div className="link-box">
                        <span className="Signup">Signup</span>
                        <span className="Login">Login</span>
                </div>
            </header>
            <body>
                <MailForm/>
                <PasswordForm/>
                <button className="LoginButton">Login</button>
            </body>
        </div>
    );

}

export default LoginPage;
