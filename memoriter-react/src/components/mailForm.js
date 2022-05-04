import React from 'react';
import { useRef } from 'react';

function MailForm() {
    const emailRef = useRef()
    return(
        <form>
            <div className="Add_Folder_Form_Text" htmlFor="email">Email Adress:</div>
            <p style={{fontSize: '5px'}} />
            <input className="Add_Folder_Form_Input" ref={emailRef} type="email" id="email" name="email"
                placeholder='Please enter Email Adress...'/>
            <p style={{fontSize: '25px'}} />
        </form>
    );
}

export default MailForm;