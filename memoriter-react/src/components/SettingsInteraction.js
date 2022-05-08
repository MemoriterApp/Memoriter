import React from 'react';
import Backdrop from './backdrop';
import { useState } from 'react';
import { firebase } from '../utils/firebase';
import { onAuthStateChanged } from "firebase/auth";

function SettingsClick() {

    const [profile, openProfile] = useState(false);

    const [user, setUser] = useState({})

    onAuthStateChanged(firebase.auth, (currentUser) => {
        setUser(currentUser);
    })

    return (
        <div className='settings-overlay'>
            <h1 className='settings-title'>Set&shy;tings</h1>
            <p className='settings-sub' onClick={() => openProfile(true)}>Pro&shy;file</p>
            <p className='settings-sub'>Chan&shy;ge Pass&shy;word</p>
            <p  className='settings-sub' style={{color: 'rgb(228, 48, 48)'}}>De&shy;lete Ac&shy;count</p>
            <p className='settings-sub'>Sign Out</p>
            {profile && <div>
                <div className='Add_Folder_Form_Body'>
                    <h2 className='Add_Folder_Form_Header'>Profile</h2>
                    <div className='Add_Folder_Form_Text'>User Id:</div>
                    <div className='Add_Folder_Form_Text' style={{color: '#bbb'}}>{user.uid}</div>
                    <p style={{fontSize: '15px'}} />
                    <div className='Add_Folder_Form_Text'>User Email:</div>
                    <div className='Add_Folder_Form_Text'style={{color: '#bbb'}}>{user.email}</div>
                    <p style={{fontSize: '25px'}} />
                </div>
                <Backdrop onClick={() => openProfile(false)} />
            </div>}
        </div>
    );
}

export default SettingsClick;