import React from 'react';
import Backdrop from './backdrop';
import { useState } from 'react';
import { firebase } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import ChangePreview from './Settings/changePreview';
import { signOut } from 'firebase/auth';
import { useSelector, useDispatch } from 'react-redux';
import { changeTheme } from '../features/theme-slice';
import { displaySuccessMessage } from '../features/authentication-success-slice';

function SettingsClick() {

    const dispatch = useDispatch(); //used to manipulate global sate (react redux)

    const themeText = useSelector((state) => state.theme.value); //current light or dark mode text based on theme

    function onChangeTheme(theme) { //function to swap the current theme
        dispatch(changeTheme(theme)); //changes the theme
        localStorage.setItem('theme', theme); //the theme can be saved to localStorage
    }

    const [profile, openProfile] = useState(false);

    const [signOutView, openSignOutView] = useState(false);

    const [changePreview, openChangePreview] = useState(false);

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
            <div className='settings-title-box'>
                <h1 className='settings-title'>SETTINGS</h1>
            </div>
            <p className='settings-sub' onClick={() => openProfile(true)}>PROFILE</p>
            {(themeText === 'dark' || !themeText) && <p className='settings-sub' onClick={() => onChangeTheme('light')}>Theme:&shy; Dark</p>}
            
            {themeText === 'light' && <p className='settings-sub' onClick={() => onChangeTheme('dark')}>Theme:&shy; Light</p>}
            <p className='settings-sub' onClick={() => openChangePreview(true)}>CHANGE PREVIEW</p>
            <div className='sign-out-box'>
                <p className='settings-sub' style={{color:"white", top:"10px"}} onClick={() => openSignOutView(true)}>SIGN OUT</p>
            </div>
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

            {changePreview && <ChangePreview/>}

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