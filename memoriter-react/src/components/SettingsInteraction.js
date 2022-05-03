import React from 'react';

function SettingsClick() {
    return (
        <div className='settings-overlay'>
            <h1 className='settings-title'>Set&shy;tings</h1>
            <p className='settings-sub'>Pro&shy;file</p>
            <p className='settings-sub'>change password</p>
            <p  className='settings-sub' style={{color: 'rgb(228, 48, 48)'}}>De&shy;lete Ac&shy;count</p>
            <p className='settings-sub'>Sign Out</p>
        </div>
    );
}

export default SettingsClick;