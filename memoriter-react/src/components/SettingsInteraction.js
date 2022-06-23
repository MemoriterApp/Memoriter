import React from 'react';
import Backdrop from './backdrop';
import { useState } from 'react';
import { firebase } from '../utils/firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function SettingsClick() {

    const [profile, openProfile] = useState(false);

    const [signOutView, openSignOutView] = useState(false);

    const [user, setUser] = useState({});

    const [changePassword, openChangePassword] = useState(false)

    onAuthStateChanged(firebase.auth, (currentUser) => {
        setUser(currentUser);
    })

    const navigate = useNavigate();

    const logOut = async () => {
        await signOut(firebase.auth);
        localStorage.removeItem('syncedFolderID');
        localStorage.removeItem('syncedFolderTitle');
        navigate('/login');
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
                    <div style={{display: 'inline', color: 'transparent', cursor: 'default'}}>====</div>
                    <button className='Delete_Folder_Confirm_No' onClick={() => openSignOutView(false)}>No</button>
                    <p style={{fontSize: '10px'}} />
                </div>
                <Backdrop onClick={() => openSignOutView(false)} />
            </div>}

            {profile && <div>
                <div className='Settings-profile-body'>
                    <h2 className='Add_Folder_Form_Header'style={{fontSize: '30px'}}>Profile</h2>
                    <div> 
                        <h1 className='Settings-profile-header' style={{fontSize: '21px', textAlign:'left', margin:'5px'}}>Personal info</h1>
                        <div className ='Settings-line'></div>
                        <p style={{fontSize: '10px'}} />
                        <div> 
                            <div className='Settings-profile-text'style={{float:'left',margin:'5px',}}>Personal email:</div>
                            <div className='Settings-profile-text'style={{color: '#bbb',float:'inline-start', margin:'5px'}}>{user.email}</div>
                            <div className='Settings-profile-text'style={{float:'inline-start', margin:'5px'}}>Edit</div>
                        </div>
                        {/*<div className='Settings-profile-text'>User ID:</div>
                        <div className='Settings-profile-text' style={{color: '#bbb'}}>{user.uid}</div>*/}
                        {/*<div>
                            <div className='Settings-profile-text'style={{float:'left',margin:'5px',}}>Username:</div>
                            <div className='Settings-profile-text'style={{float:'inline-start', margin:'5px'}}>Edit</div>
                        </div>*/}
                        {/*Wenn man etwas vor diesem punkt addiert miuss man das <p> direkt hier drunter vergrößern */}
                        <p style={{fontSize: '70px'}} />
                    </div>
                        <div>
                        <h1 className='Settings-profile-header' style={{fontSize: '21px', textAlign:'left', margin:'5px'}}>Password</h1>
                        <div className ='Settings-line'></div>
                        <p style={{fontSize: '10px'}} />
                        <div className='Settings-profile-text'style={{ margin:'5px'}} onClick={() => openChangePassword(true)}>change password</div>
                        {/*form to enter new password */}
                            {changePassword && <div>
                                <form>
                                    <label for="npassword">enter new password:</label>
                                    <br></br>
                                    <input type="text" id="npassword" name="npassword"></input>
                                </form>
                            </div>}

                        <p style={{fontSize: '30px'}} />
                    </div>
                    <div>
                        <h1 className='Settings-profile-header' style={{fontSize: '21px', textAlign:'left', margin:'5px'}}>Account</h1>
                        <div className ='Settings-line'></div>
                        <p style={{fontSize: '20px'}} />
                        <div className='Settings-profile-text'style={{color:'#d83232', margin:'5px'}}>delete account</div>
                        <div className='Settings-profile-text' style={{fontSize: '15px', color:'rgb(88, 167, 172)',float:'left', margin:'5px'}} >If you delete your account, your data will be gone forever!</div>
                    </div>
                </div>

                <Backdrop onClick={() => openProfile(false)} />
            </div>}
        </div>
    );
}

export default SettingsClick;