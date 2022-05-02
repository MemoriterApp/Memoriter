import React from 'react';

function MailForm() {
    return(
        <div className="mail-form1">
        <form className="mail-form">
            <label className="mail-label" htmlFor="email">Email</label>
            <input className="mail-input" type="email" id="email" name="email"></input>
        </form>
        </div>
    );
}

export default MailForm;