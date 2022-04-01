import React from 'react';

const NewFolder = ({ NewFolderClick }) => {
    return (
        <div>
            <div className='New_Folder_Body'>
                <div className='New_Folder_Line'></div>
                <button className='Button_New_Folder' onClick={NewFolderClick}>
                        <div className='New_Folder_Plus_h'></div>
                        <div className='New_Folder_Plus_v'></div>
                </button>
                <button className='New_Folder_Text' onClick={NewFolderClick}>Create New Folder</button>
             </div>
        </div>
    );
}

export default NewFolder;