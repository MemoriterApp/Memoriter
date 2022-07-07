import React from 'react';
import Backdrop from './backdrop';
import { useState } from 'react';
import { firebase } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { signOut, getAuth, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider, deleteUser } from "firebase/auth";

function SettingsClick() {

    const [profile, openProfile] = useState(false);

    const [signOutView, openSignOutView] = useState(false);

    const auth = getAuth();

    const user = auth.currentUser

    //states to check wether overlay is open
    const [changePassword, openChangePassword] = useState(false);
    const [changeEmail, openChangeEmail] = useState(false);
    const [deleteAccount, openDeleteAccount] = useState(false);
    const [deleteAccountConfirm, openDeleteAccountConfirm] = useState(false);

    //states to store user data
    const [newEmail, setNewEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [accountPassword, setAccountPassword] = useState('')

    //error states
    const [redBorderNewData, setRedBorderNewData] = useState({});
    const [redBorderAccountPassword, setRedBorderAccountPassword] = useState({});
    
    //success states
    const [updatedEmail, setUpdatedEmail] = useState(false);
    const [updatedPassword, setUpdatedPassword] = useState(false);
    
    //logout stuff
    const navigate = useNavigate();

    const logOut = async () => {
        await signOut(firebase.auth);
        localStorage.removeItem('syncedFolderID');
        localStorage.removeItem('syncedFolderTitle');
        navigate('/login');
    }

    //change email function
    async function newEmailSubmit(e) {
        e.preventDefault();

        const credential = EmailAuthProvider.credential( //required input for password confirm
            user.email,
            accountPassword
        )

        if (newEmail === '') {
            setRedBorderNewData({borderColor: 'rgb(228, 48, 48)'});
            setRedBorderAccountPassword({});
        } else if (newEmail !== confirmEmail) {
            setRedBorderNewData({borderColor: 'rgb(228, 48, 48)'});
            setRedBorderAccountPassword({});
        } else {
            reauthenticateWithCredential(auth.currentUser, credential)
                .then(result => {
                    updateEmail(auth.currentUser, newEmail).then(() => {
                        return(
                            openChangeEmail(false),
                            setNewEmail(''),
                            setConfirmEmail(''),
                            setAccountPassword(''),
                            setRedBorderNewData({}),
                            setRedBorderAccountPassword({}),
                            setUpdatedEmail(true))
                });  
            })
                .catch(error => {
                    switch (error.code) {
                        case error.code:
                            setRedBorderNewData({});
                            setRedBorderAccountPassword({borderColor: 'rgb(228, 48, 48)'});
                            break;
                    }
            })
        }
    }

    //change password function
    async function newPasswordSubmit(e) {
        e.preventDefault();

        const credential = EmailAuthProvider.credential( //required input for password confirm
            user.email,
            accountPassword
        )

        if (newPassword === '') {
            setRedBorderNewData({borderColor: 'rgb(228, 48, 48)'});
            setRedBorderAccountPassword({});
        } else if (newPassword !== confirmPassword) {
            setRedBorderNewData({borderColor: 'rgb(228, 48, 48)'});
            setRedBorderAccountPassword({});
        } else {
            reauthenticateWithCredential(auth.currentUser, credential)
                .then(result => {
                    updatePassword(auth.currentUser, newPassword).then(() => {
                        return(
                            openChangePassword(false),
                            setNewPassword(''),
                            setConfirmPassword(''),
                            setAccountPassword(''),
                            setRedBorderNewData({}),
                            setRedBorderAccountPassword({}),
                            setUpdatedPassword(true))
                });  
            })
                .catch(error => {
                    switch (error.code) {
                        case error.code:
                            setRedBorderNewData({});
                            setRedBorderAccountPassword({borderColor: 'rgb(228, 48, 48)'});
                            break;
                    }
            })
        }
    }

    //delete account password confirm
    async function deleteAccountPasswordSubmit(e) {
        e.preventDefault();

        const credential = EmailAuthProvider.credential( //required input for password confirm
            user.email,
            accountPassword
        )

        reauthenticateWithCredential(auth.currentUser, credential)
                .then(result => {
                    updateEmail(auth.currentUser, newEmail).then(() => {
                        return(
                            openDeleteAccountConfirm(true))
                });  
            })
                .catch(error => {
                    switch (error.code) {
                        case error.code:
                            setRedBorderAccountPassword({borderColor: 'rgb(228, 48, 48)'});
                            break;
                    }
            })
    }
//delete user function (https://firebase.google.com/docs/auth/web/manage-users?hl=en)
/*deleteUser(user).then(() => {
    console.log("user has been deleted")
  }).catch((error) => {
    console.log("an error has occurred")
  });*/

    return (
        <div className='settings-overlay'>
            <h1 className='settings-title'>Set&shy;tings</h1>
            <p className='settings-sub' onClick={() => openProfile(true)}>Pro&shy;file</p>
            {/*<p className='settings-sub'>Chan&shy;ge Pass&shy;word</p>*/}
            {/*<p  className='settings-sub' style={{color: 'rgb(228, 48, 48)'}}>De&shy;lete Ac&shy;count</p>*/}
            <p className='settings-sub' onClick={() => openSignOutView(true)}>Sign Out</p>
            {signOutView && <div>
                <div className='Delete_Folder_Confirm'>
                    <h2 className='Add_folder_Form_Header'>Do you really want to &nbsp;sign out?</h2>
                    <button className='Delete_Folder_Confirm_Yes' onClick={logOut}>Yes</button>
                    <div style={{ display: 'inline', color: 'transparent', cursor: 'default' }}>====</div>
                    <button className='Delete_Folder_Confirm_No' onClick={() => openSignOutView(false)}>No</button>
                    <p style={{ fontSize: '10px' }} />
                </div>
                <Backdrop onClick={() => openSignOutView(false)} />
            </div>}

            {profile && <div>
                <div className='Settings-profile-body'>
                    <h2 className='Add_Folder_Form_Header' style={{ fontSize: '30px' }}>Profile</h2>
                    <div>
                        <h1 className='Settings-profile-header' style={{ fontSize: '21px', textAlign: 'left', margin: '5px' }}>
                            Personal Info
                            {updatedEmail && <span className='Settings-profile-header' style={{position: 'absolute', color: 'rgb(45, 119, 45)', right: '0', margin: '0px 5px 5px 5px'}}>Email Updated!</span>}
                        </h1>

                        <div className='Settings-line'></div>
                        <p style={{ fontSize: '10px' }} />
                        <div style={{textAlign: 'left'}}>
                            <div className='Settings-profile-text' style={{ margin: '5px'}}>Personal Email:</div>
                            <div className='Settings-profile-text' style={{ color: '#bbb',  margin: '5px' }}>{user.email}</div>
                            <div className='Settings-profile-text' style={{ margin: '5px' }}
                                onClick={() => {
                                    openChangeEmail(true);
                                    setUpdatedEmail(false);
                                    setUpdatedPassword(false);
                                }}>Edit</div>
                        </div>

                        {changeEmail && <div>
                            <div className='Settings-changemail-body'>

                            <div className='Settings-profile-text' style={{ color: '#bbb', margin: '20px', textAlign: 'center' }}>Update "{user.email}"</div>

                            <form onSubmit={newEmailSubmit}>

                                <input className='Settings-changemail-form Add_Folder_Form_Input'
                                    placeholder="New Email..."
                                    type="mail"
                                    id="email"
                                    name="email"
                                    style={redBorderNewData}
                                    onChange={event => setNewEmail(event.target.value)}
                                    value={newEmail}
                                />
                                <br/>
                                <br/>
                                <input className='Settings-changemail-form Add_Folder_Form_Input'
                                    placeholder="Confirm New Email..."
                                    type="mail"
                                    id="confirmEmail"
                                    name="confirmEmail"
                                    style={redBorderNewData}
                                    onChange={event => setConfirmEmail(event.target.value)}
                                    value={confirmEmail}
                                />
                                <br/>
                                <br/>
                                <input className='Settings-changemail-form Add_Folder_Form_Input'
                                    placeholder="Password..."
                                    type="password"
                                    id="accountPassword"
                                    name="accountPassword"
                                    style={redBorderAccountPassword}
                                    onChange={event => setAccountPassword(event.target.value)}
                                    value={accountPassword}
                                />

                                <br/>

                                <button
                                    className='Settings-changemail-cancel'
                                    onClick={() => {
                                        openChangeEmail(false);
                                        setNewEmail('');
                                        setConfirmEmail('');
                                        setAccountPassword('');
                                        setRedBorderNewData({});
                                        setRedBorderAccountPassword({});}}
                                >Cancel</button>

                                <button 
                                    className='Settings-changemail-change'
                                    type='submit'
                                >Update</button>

                            </form>

                            </div>
                            <Backdrop onClick={() => openChangeEmail(false)} />
                        </div>}

                        {/*<div className='Settings-profile-text'>User ID:</div>
                        <div className='Settings-profile-text' style={{color: '#bbb'}}>{user.uid}</div>*/}
                        {/*<div>
                            <div className='Settings-profile-text'style={{float:'left',margin:'5px',}}>Username:</div>
                            <div className='Settings-profile-text'style={{float:'inline-start', margin:'5px'}}>Edit</div>
                        </div>*/}

                        {/*Wenn man etwas vor diesem punkt addiert muss man das <p> direkt hier drunter vergrößern */}
                        <p style={{ fontSize: '30px' }} />
                    </div>
                    <div style={{textAlign: 'left'}}>
                        <h1 className='Settings-profile-header' style={{ fontSize: '21px', textAlign: 'left', margin: '5px' }}>
                            Password
                            {updatedPassword && <span className='Settings-profile-header' style={{position: 'absolute', color: 'rgb(45, 119, 45)', right: '0', margin: '0px 5px 5px 5px'}}>Password Updated!</span>}
                        </h1>
                        <div className='Settings-line'></div>
                        <p style={{ fontSize: '10px' }} />
                        <div className='Settings-profile-text' style={{ margin: '5px',}}
                            onClick={() => {
                                openChangePassword(true);
                                setUpdatedEmail(false);
                                setUpdatedPassword(false);
                            }}>Change Password</div>

                        {/*form to enter new password */}

                        {changePassword && <div>
                            <div className='Settings-changemail-body' style={{ height: '350px' }}>
                                
                                <div className='Settings-profile-text' style={{ color: '#bbb', margin: '20px', textAlign: 'center' }}>Change Password</div>
                                
                                <form onSubmit={newPasswordSubmit}>

                                <input className='Settings-changemail-form Add_Folder_Form_Input'
                                    placeholder="Current Password..."
                                    type="password"
                                    id="accountPassword"
                                    name="accountPassword"
                                    style={redBorderAccountPassword}
                                    onChange={event => setAccountPassword(event.target.value)}
                                    value={accountPassword}
                                />
                                <br/>
                                <br/>
                                <input className='Settings-changemail-form Add_Folder_Form_Input'
                                    placeholder="New Password..."
                                    type="password"
                                    id="newPassword"
                                    name="newPassword"
                                    style={redBorderNewData}
                                    onChange={event => setNewPassword(event.target.value)}
                                    value={newPassword}
                                />
                                <br/>
                                <br/>
                                <input className='Settings-changemail-form Add_Folder_Form_Input'
                                    placeholder="Confirm New Password..."
                                    type="password"
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    style={redBorderNewData}
                                    onChange={event => setConfirmPassword(event.target.value)}
                                    value={confirmPassword}
                                />
                                <br/>

                                <button
                                    className='Settings-changemail-cancel'
                                    onClick={() => {
                                        openChangePassword(false);
                                        setNewPassword('');
                                        setConfirmPassword('');
                                        setAccountPassword('');
                                        setRedBorderNewData({});
                                        setRedBorderAccountPassword({});}}
                                >Cancel</button>

                                <button 
                                    className='Settings-changemail-change'
                                    type='submit'
                                >Update</button>

                            </form>
                            
                            </div>
                            <Backdrop onClick={() => openChangePassword(false)} />
                        </div>}

                        <p style={{ fontSize: '30px' }} />
                    </div>
                    <div style={{textAlign: 'left'}}>
                        <h1 className='Settings-profile-header' style={{ fontSize: '21px',  margin: '5px'}}>Account</h1>
                        <div className='Settings-line'></div>
                        <p style={{ fontSize: '20px' }} />
                        <div className='Settings-profile-text' style={{ color: '#d83232', margin: '5px' }}
                            onClick={() => {
                                openDeleteAccount(true);
                                setUpdatedEmail(false);
                                setUpdatedPassword(false);
                            }}>Delete Account</div>
                        <div className='Settings-profile-text' style={{ fontSize: '15px', color: 'rgb(88, 167, 172)', margin: '5px' }} >If you delete your account, your data will be gone forever!</div>

                        {deleteAccount && <div>
                            <div className='Settings-changemail-body'>

                            <br/><br/><br/><br/>

                            <div className='Settings-profile-text' style={{ color: '#bbb', margin: '20px', textAlign: 'center' }}>Please enter your password to proceed!</div>

                            <form onSubmit={deleteAccountPasswordSubmit}>

                                <input className='Settings-changemail-form Add_Folder_Form_Input'
                                    placeholder="Password..."
                                    type="password"
                                    id="accountPassword"
                                    name="accountPassword"
                                    style={redBorderAccountPassword}
                                    onChange={event => setAccountPassword(event.target.value)}
                                    value={accountPassword}
                                />

                                <br/>

                                <button
                                    className='Settings-changemail-cancel'
                                    onClick={() => {
                                        openDeleteAccount(false);
                                        setNewEmail('');
                                        setConfirmEmail('');
                                        setAccountPassword('');
                                        setRedBorderNewData({});
                                        setRedBorderAccountPassword({});}}
                                >Cancel</button>

                                <button 
                                    className='Settings-changemail-change'
                                    type='submit'
                                >Proceed</button>

                                {deleteAccountConfirm && <div>
                                    success!
                                </div>}

                            </form>

                            </div>
                            <Backdrop onClick={() => openDeleteAccount(false)} />


                        </div>}
                    </div>
                </div>
            </div> }      
        </div>
    );
}
export default SettingsClick;