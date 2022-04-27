import React from "react";
import Logo from './Logo.png';

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
                <div className="mail-form1">
                    <form className="mail-form">
                        <label className="mail-label" for="email">Email</label>
                        <input className="mail-input" type="email" id="email" name="email"></input>
                    </form>
                </div>
                <div className="password-form1">
                     <form className="paswword-form">
                        <label className="password-label" for="password">password</label>
                        <input className="password-input" type="password" id="password" name="password"></input>
                     </form>
                </div>
            </body>
        </div>
    );

}

export default LoginPage;
