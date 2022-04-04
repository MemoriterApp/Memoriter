import React from 'react';
import { useState } from 'react';
import AddFolderForm from './AddFolderForm';
import Backdrop from './backdrop';

const NewFolder = ({ NewFolderClick }) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    function NewFolderClick() {
        setModalIsOpen(true);
    }
    function backdropClick() {
        setModalIsOpen(false);
    }

    return (
        <div>
            <div className='New_Folder_Body'>
                <div className='New_Folder_Line'></div>
                <button className='Button_New_Folder' onClick={NewFolderClick}>
                        <div className='New_Folder_Plus_h'></div>
                        <div className='New_Folder_Plus_v'></div>
                </button>
                <button className='New_Folder_Text' onClick={NewFolderClick}>Create New Folder</button>
                <div>
                    {modalIsOpen && <AddFolderForm/>}
                </div>
                <div  onClick={backdropClick}>
                    {modalIsOpen && <Backdrop/>}
                </div>
             </div>
        </div>
    );
}

export default NewFolder;