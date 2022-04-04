import React from 'react';

function SettingsClick() {
    return (
        <div className='settings-overlay'>
            <h1 className='settings-title'>Settings</h1>
            <div className='settings-sub'>
                <p>Profile</p>
                <p>change user name</p>
                <p>stats</p>
                <p>change profile picture</p>
                <p>delete account</p>
                <p>Sign out</p>
            </div>
        </div>
    );
}

export default SettingsClick;