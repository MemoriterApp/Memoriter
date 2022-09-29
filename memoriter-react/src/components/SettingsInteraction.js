import React from 'react';
import Backdrop from './backdrop';
import { useState } from 'react';
import { firebase } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { displaySuccessMessage } from '../features/authentication-success-slice';

function SettingsClick() {

    const dispatch = useDispatch(); //used to manipulate global sate (react redux)

    const [profile, openProfile] = useState(false);

    const [signOutView, openSignOutView] = useState(false);

    const user = firebase.auth.currentUser;

    const navigate = useNavigate();

    const logOut = async () => {
        await signOut(firebase.auth);
        localStorage.removeItem('syncedFolderID');
        localStorage.removeItem('syncedFolderTitle');

        dispatch(displaySuccessMessage('Successfully signed out!')); //sets state for the sign-in-main component to read to display a success message
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
                <div className='Add_Folder_Form_Body'>
                    <h2 className='Add_Folder_Form_Header'>Profile</h2>
                    <div className='Add_Folder_Form_Text'>User ID:</div>
                    <div className='Add_Folder_Form_Text' style={{color: 'var(--color-font-gray)'}}>{user.uid}</div>
                    <p style={{fontSize: '15px'}} />
                    <div className='Add_Folder_Form_Text'>User Email:</div>
                    <div className='Add_Folder_Form_Text'style={{color: 'var(--color-font-gray)'}}>{user.email}</div>
                    <p style={{fontSize: '25px'}} />
                </div>
                <Backdrop onClick={() => openProfile(false)} />
            </div>}
        </div>
    );
}

export default SettingsClick;