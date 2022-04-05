import React from 'react';
import { useState } from 'react';
import AddFolderForm from './EditFolderForm';
import Backdrop from './backdrop';
import EditFolderForm from './EditFolderForm';

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
                {modalIsOpen && <EditFolderForm />}
            </div>
            <div  onClick={backdropClick}>
                {modalIsOpen && <Backdrop/>}
            </div>
        </div>
    );
}

export default FolderSettingsClick;