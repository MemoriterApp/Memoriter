import { useState } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const PasswordReset = ({closePasswordResetModal}) => {

    const auth = getAuth();

    const [email, setEmail] = useState('');

    const [redBorder, setRedBorder] = useState({});

    async function passwordReset(e) {
        e.preventDefault();

        if (email === '') {
            setRedBorder('rgb(228, 48, 48)');
        } else {
            sendPasswordResetEmail(auth, email)
                .then(() => {
                    return(
                        closePasswordResetModal(),
                        setRedBorder({}))
                })
                .catch(error => {
                    switch (error.code) {
                        case 'auth/user-not-found':
                            setRedBorder('rgb(228, 48, 48)')
                            break;
                        case error.code:
                            alert('An error has occurred, please try again later!" ('+error+')');
                            break;
                    }
                });
        }
    }

    return (
        <div className='settings-delete-account-confirm-body' style={{height: '360px'}}>

            <br/>
            <h2 className='Add_folder_Form_Header' style={{textAlign: 'center'}}>Password Reset</h2>
            <p className='settings-delete-account-confirm-text' style={{color: 'white', fontWeight: 'normal'}}>
                We will send you an email with further instructions how to reset your password.
            </p>
            <br/>

            <form onSubmit={passwordReset}>

                <input
                    className='Settings-changemail-form Add_Folder_Form_Input'
                    style={{left: '50%', transform: 'translateX(-50%)', width: '80%', borderColor: redBorder}}
                    type='email'
                    placeholder='Please enter account email...'
                    id="email"
                    name="email"
                    onChange={event => {setEmail(event.target.value)}}
                    value={email}
                />

                <br/>

                <button 
                    className='settings-delete-account-confirm-button'
                    style={{backgroundColor: 'rgba(39,75,101,1)', borderColor: 'rgba(39,75,101,1)'}}
                    type='submit'
                >Send Email</button>

                <br/>

                <button
                    className='settings-delete-account-confirm-button'
                    onClick={() => {closePasswordResetModal(); setRedBorder({});}}
                >Cancel</button>

            </form>
        </div>
    );
}

export default PasswordReset;