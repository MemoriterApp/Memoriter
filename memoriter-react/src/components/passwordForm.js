import React from "react";

function PasswordForm() {
    return (
        <div>
            <div className="password-form1">
                     <form className="paswword-form">
                        <label className="password-label" for="password">password</label>
                        <input className="password-input" type="password" id="password" name="password"></input>
                     </form>
            </div>
            <p className="forgot-password">forgot password?</p>
        </div>
    );
}

export default PasswordForm;