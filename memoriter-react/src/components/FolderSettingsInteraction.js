import React from 'react';
import { useState } from 'react';
import Backdrop from './backdrop';

const FolderSettingsClick= () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);

  function EditFolderClick() {
      setModalIsOpen(true);
  }
  function backdropClick() {
      setModalIsOpen(false);
  }

    return (
        <div className='folder-settings-overlay'>
            <div className='folder-settings-sub'>
                <p onClick={EditFolderClick}>Edit</p>
                <p>Delete</p>
            </div>
            <div>
                {modalIsOpen && <form className='Add_Folder_Form_Body'>
                    <div>
                    <h2 className='Add_Folder_Form_Header'>Edit Folder</h2>
                    <div className='Add_Folder_Form_Text'>Folder Name: </div>
                    <p style={{fontSize: '5px'}} />
                    <input className='Add_Folder_Form_Input' type='text' maxLength='100' />
                    </div>
                    <p style={{fontSize: '25px'}} />
                    <input className='Add_Folder_Form_Submit' type='submit' value='Done' />
                </form>}
            </div>
            <div  onClick={backdropClick}>
                {modalIsOpen && <Backdrop/>}
            </div>
        </div>
    );
}

export default FolderSettingsClick;