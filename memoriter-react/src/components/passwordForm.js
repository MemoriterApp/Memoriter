import React from "react";

function PasswordForm() {
    return (
        <div>
            <form className="paswword-form">
                <div className="Add_Folder_Form_Text" htmlFor="password">Password:</div>
                <p style={{fontSize: '5px'}} />
                <input className="Add_Folder_Form_Input" type="password" id="password" name="password"
                    placeholder="Please Enter Password..."/>
                <p style={{fontSize: '25px'}} />
            </form>
            <p className="forgot-password">Forgot Password?</p>
        </div>
    );
}

export default PasswordForm;