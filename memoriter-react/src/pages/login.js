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
                <div>
                    
                </div>
            </body>
        </div>
    );

}

export default LoginPage;
