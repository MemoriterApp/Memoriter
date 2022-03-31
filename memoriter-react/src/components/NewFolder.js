import React from 'react';

const NewFolder = ({ NewFolderClick }) => {
    return (
        <div>
            <div className='New_Folder_Line'></div>
            <div onClick={NewFolderClick}>
                <button className='Button_New_Folder'>
                    <div className='New_Folder_Plus_h'></div>
                    <div className='New_Folder_Plus_v'></div>
                </button>
                <button className='New_Folder_Space'></button>
                <button className='New_Folder_Text'>Create New Folder</button>
             </div>
        </div>
    );
}

export default NewFolder;