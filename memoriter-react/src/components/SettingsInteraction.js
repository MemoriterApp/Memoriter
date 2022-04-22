import React from 'react';

function SettingsClick() {
    return (
        <div className='settings-overlay'>
            <h1 className='settings-title'>Set&shy;tings</h1>
            <p className='settings-sub'>Pro&shy;file</p>
            <p className='settings-sub'>Stats</p>
            <p className='settings-sub'>Chan&shy;ge User&shy;name</p>
            <p className='settings-sub'>Chan&shy;ge Pro&shy;file Pic&shy;ture</p>
            <p  className='settings-sub' style={{color: 'rgb(228, 48, 48)'}}>De&shy;lete Ac&shy;count</p>
            <p className='settings-sub'>Sign Out</p>
        </div>
    );
}

export default SettingsClick;