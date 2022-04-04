import React from 'react';

const FolderHome = ({ folder }) => {
const settingsClick = () => {
    alert('Nein Simon so funktioniert das nicht')
}
const test = () => {
    alert('test')
}

    return (
        <div className='Folder_Body'>
            <button className='Button_Homepage' onClick={test}></button>
            {folder.name != '' ? ( 
                <button className='Button_Homepage_Text' onClick={test}>{folder.name}</button>
            ) : (
                <button className='Button_Homepage_Text' onClick={test}>New Folder</button>
            )}
            <div className='Button_Homepage_Settings' onClick={settingsClick}>
                <span className='dot'></span>
                <span className='dot'></span>
                <span className='dot'></span>
            </div>
        </div>
    );
}

export default FolderHome;