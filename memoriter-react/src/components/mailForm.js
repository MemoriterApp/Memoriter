import React from 'react';

function MailForm() {
    return(
        <form>
            <div className="Add_Folder_Form_Text" htmlFor="email">Email Adress:</div>
            <p style={{fontSize: '5px'}} />
            <input className="Add_Folder_Form_Input" type="email" id="email" name="email"/>
            <p style={{fontSize: '25px'}} />
        </form>
    );
}

export default MailForm;