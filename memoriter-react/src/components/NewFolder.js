import React from 'react';

const Newfolder = ({NewFolderClick}) => {
    return (
        <div>
            <div className='New_Folder_Line'></div>
            <div onClick={NewFolderClick}>
                <button className='Button_New_Folder'>
                    <div className='New_Folder_Plus_h'></div>
                    <div className='New_Folder_Plus_v'></div>
                    <div className='New_Folder_Space'></div>
                    <div className='New_Folder_Text'>Create New Folder</div>
                </button>
             </div>
        </div>
    );
}

export default Newfolder;