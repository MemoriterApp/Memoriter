import React from 'react';
import Backdrop from './backdrop';
import { useState } from 'react';
import { firebase } from '../utils/firebase';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { getAuth, updateEmail } from "firebase/auth";

function SettingsClick() {

    const [profile, openProfile] = useState(false);

    const [signOutView, openSignOutView] = useState(false);

    const auth = getAuth();

    const user = auth.currentUser

    //states to check wether overlay is open
    const [changePassword, openChangePassword] = useState(false);
    const [changeEmail, openChangeEmail] = useState(false);

    //states to store user data
    const [newEmail, setNewEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('')
    const [accountPassword, setAccountPassword] = useState('')
    const [newPassword, setNewPassword] = useState('');

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
        
        if (newEmail !== confirmEmail) {
            alert('nope');
        } /*else if (accountPassword !== user.password) {
            alert('nope v2'); (not working yet, cannot get current password)
        }*/ else {
            updateEmail(auth.currentUser, newEmail).then(() => {
                return(
                    openChangeEmail(false),
                    setNewEmail(''),
                    setConfirmEmail(''),
                    setAccountPassword(''))
            });
        }
    }

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
                        <h1 className='Settings-profile-header' style={{ fontSize: '21px', textAlign: 'left', margin: '5px' }}>Personal Info</h1>
                        <div className='Settings-line'></div>
                        <p style={{ fontSize: '10px' }} />
                        <div style={{textAlign: 'left'}}>
                            <div className='Settings-profile-text' style={{ margin: '5px'}}>Personal Email:</div>
                            <div className='Settings-profile-text' style={{ color: '#bbb',  margin: '5px' }}>{user.email}</div>
                            <div className='Settings-profile-text' style={{ margin: '5px' }} onClick={() => openChangeEmail(true)}>Edit</div>
                        </div>

                        {changeEmail && <div>
                            <div className='Settings-changemail-body'>

                            <div className='Settings-profile-text' style={{ color: '#bbb', margin: '20px', textAlign: 'center' }}>Update "{user.email}"</div>

                            <form onSubmit={newEmailSubmit}>

                                <input className='Settings-changemail-form Add_Folder_Form_Input'
                                    placeholder="New Email"
                                    type="mail"
                                    id="email"
                                    name="email"
                                    onChange={event => setNewEmail(event.target.value)}
                                    value={newEmail}
                                />
                                <br/>
                                <br/>
                                <input className='Settings-changemail-form Add_Folder_Form_Input'
                                    placeholder="Confirm Email"
                                    type="mail"
                                    id="confirmEmail"
                                    name="confirmEmail"
                                    onChange={event => setConfirmEmail(event.target.value)}
                                    value={confirmEmail}
                                />
                                <br/>
                                <br/>
                                <input className='Settings-changemail-form Add_Folder_Form_Input'
                                    placeholder="Account Password"
                                    type="password"
                                    id="accountPassword"
                                    name="accountPassword"
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
                                        setAccountPassword('')}}
                                >Cancel</button>

                                <button 
                                    className='Settings-changemail-change'
                                    type='submit'
                                    >Update Email</button>

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
                        <h1 className='Settings-profile-header' style={{ fontSize: '21px', textAlign: 'left', margin: '5px' }}>Password</h1>
                        <div className='Settings-line'></div>
                        <p style={{ fontSize: '10px' }} />
                        <div className='Settings-profile-text' style={{ margin: '5px',}} onClick={() => openChangePassword(true)}>Change Password</div>

                        {/*form to enter new password */}

                        {changePassword && <div>
                            <div className='Settings-changemail-body' style={{ height: '350px' }}>
                                <div className='Settings-profile-text' style={{ color: '#bbb', margin: '20px', textAlign: 'center' }}>Change Password</div>
                                <form>
                                    <br></br>
                                    <input className='Settings-changemail-form Add_Folder_Form_Input'
                                        placeholder="Old Password"
                                        type="mail"
                                        id="nmail"
                                        name="nmail"
                                        onChange={event => setNewEmail(event.target.value)}
                                        value={newEmail}
                                    />
                                </form>
                                <form>
                                    <br></br>
                                    <input className='Settings-changemail-form Add_Folder_Form_Input'
                                        placeholder="New Password"
                                        type="password"
                                        id="npassword"
                                        name="npassword"
                                        onChange={event => setNewPassword}
                                        value={newPassword}
                                    />
                                </form>
                                <form>
                                    <br></br>
                                    <input className='Settings-changemail-form Add_Folder_Form_Input'
                                        placeholder="Confirm New Password"
                                        type="password"
                                        id="npassword"
                                        name="npassword"
                                        onChange={event => setNewPassword}
                                        value={newPassword}
                                    />
                                </form>
                                {/* <Link to='/signup' className="no-account">forgot current password?</Link> */}
                                <button className='Settings-changemail-cancel' onClick={() => openChangePassword(false)}>Cancel</button>
                                <button className='Settings-changemail-change' style={{ width: '130px' }} onClick={ErrorEvent}>Confirm</button>
                            </div>
                            <Backdrop onClick={() => openChangePassword(false)} />
                        </div>}

                        <p style={{ fontSize: '30px' }} />
                    </div>
                    <div style={{textAlign: 'left'}}>
                        <h1 className='Settings-profile-header' style={{ fontSize: '21px',  margin: '5px'}}>Account</h1>
                        <div className='Settings-line'></div>
                        <p style={{ fontSize: '20px' }} />
                        <div className='Settings-profile-text' style={{ color: '#d83232', margin: '5px' }} onClick={() => openSignOutView(true)}>Delete Account</div>
                        <div className='Settings-profile-text' style={{ fontSize: '15px', color: 'rgb(88, 167, 172)', margin: '5px' }} >If you delete your account, your data will be gone forever!</div>
                    </div>
                </div>
            </div> }      
        </div>
    );
}
export default SettingsClick;