import React from 'react';
import Backdrop from './backdrop';
import { useState } from 'react';
import HomepageSettingsClick from './FolderSettingsInteraction'


const FolderHome = ({ folder }) => {
    const test = () => {
        alert('test')
    }
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function settingsHandler() {
        setModalIsOpen(true);
    }
    function backdropClick() {
        setModalIsOpen(false);
    }

    return (
        <div className='Folder_Body'>
            <button className='Button_Homepage' onClick={test}></button>
            {folder.name != null ? ( 
                <button className='Button_Homepage_Text' onClick={test}>{folder.name}</button>
            ) : (
                <button className='Button_Homepage_Text' onClick={test}>New Folder</button>
            )}
            <div className='Button_Homepage_Settings' onClick={settingsHandler}>
                <span className='dot'></span>
                <span className='dot'></span>
                <span className='dot'></span>
            </div>
            <div>
                {modalIsOpen && <HomepageSettingsClick/>}
                {modalIsOpen && <Backdrop/>}
            </div>
            <div  onClick={backdropClick}>
                    {modalIsOpen && <Backdrop/>}
            </div>
        </div>
    );
}

export default FolderHome;