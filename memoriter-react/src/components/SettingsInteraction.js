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
                <div className='Add_Folder_Form_Body' style={{left:'50%', top:'27%', height:'350px', width:'450px'}}>
                    <h2 className='Add_Folder_Form_Header'>Profile</h2>
                    {/*<div className='Settings-profile-text'>User ID:</div>
                    <div className='Settings-profile-text' style={{color: '#bbb'}}>{user.uid}</div>*/}
                    <h1 className='Add_Folder_Form_Header' style={{fontSize: '20px'}}>Personal info</h1>
                    <p style={{fontSize: '15px'}} />
                    <div className='Settings-profile-text'>Personal email:
                    </div>
                    <div className='Settings-profile-text'style={{color: '#bbb'}}>{user.email}</div>
                    <p style={{fontSize: '15px'}} />
                    <div className='Settings-profile-text'>change password</div>
                    <p style={{fontSize: '15px'}} />
                    <div className='Settings-profile-text' >change email</div>
                    <p style={{fontSize: '15px'}} />
                    <div className='Settings-profile-text'style={{color:''}}>delete account</div>
                    <div className='Settings-profile-text' style={{fontSize: '15px', color:'lightblue'}} >If you delete your account, your data will be gone forever.</div>
                </div>
                <Backdrop onClick={() => openProfile(false)} />
            </div>}
        </div>
    );
}

export default SettingsClick;