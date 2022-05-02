import React from "react";
import Logo from './Logo.png';
import MailForm from "../components/mailForm";
import WithGoogle from "../components/WithGoogle";


function SignUpPage(props) {
    return (
        <div>
            <header>
                <img className="Logo-oben-login" src={Logo} alt=''/>
                <div className="link-box">
                        <span className="Signup1">Signup</span>
                        <span className="Login1">Login</span>
                </div>
            </header>
            <body>
                <MailForm/>
                    <div className="password-form1">
                        <form className="paswword-form">
                            <label className="password-label" htmlFor="password">password</label>
                            <input className="password-input" type="password" id="password" name="password"></input>
                        </form>
                    </div>
                <button type="submit" className="LoginButton">sign up</button>
                <WithGoogle login={props.login}/>
            </body>
        </div>
    );
}

export default SignUpPage;