import React from 'react';
import edit from '../../images/edit.svg'
import archive from '../../images/icons/archive-icon.svg'
import deleteIcon from '../../images/delete.svg'
import Confirm from '../confirm';
import Backdrop from '../backdrop.jsx';

import { useState } from 'react';

function SettingsFolder({title, folder, onDeleteFolder, onEditFolder, backdropClickEdit, onChangeName, backdropClick, onArchive, onDearchive}) {

    
    const [editModalIsOpen, setEditModalIsOpen] = useState(false); // is the state of the modal if if is open or not
    const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false); //is the state of the modal if if is open or not

  return (
    <>
         <div>
                 <div className='folder-settings-overlay'>
                    <div className='folder-settings-sub'>
                        <p onClick={() => {setEditModalIsOpen(true)}}>
                            <img
                                style={{ height: '1.6rem', marginRight: '0.2rem', marginBottom: '-0.3rem' }}
                                src={edit}
                                alt=''
                            />
                            Edit
                        </p>
                        {!folder.archived && <p onClick={() => onArchive(folder.id)}>
                            <img
                                style={{ height: '1.6rem', marginRight: '0.2rem', marginBottom: '-0.3rem' }}
                                src={archive}
                                alt=''
                            />
                            Archive</p>}
                        {folder.archived && <p onClick={() => onDearchive(folder.id)}>
                            <img
                                style={{ height: '1.6rem', marginRight: '0.2rem', marginBottom: '-0.3rem' }}
                                src={archive}
                                alt=''
                            />
                            De-archive</p>}
                        <p onClick={() => {setDeleteModalIsOpen(true)}} style={{color: 'rgb(228, 48, 48)'}}>
                            <img
                                style={{ height: '1.6rem', marginRight: '0.2rem', marginBottom: '-0.3rem' }}
                                src={deleteIcon}
                                alt=''
                            />
                            Delete
                        </p>
                    </div>
                </div>
            </div>

            <div>
                {editModalIsOpen && <form className='add-folder-form-body'>
                    <div>
                        <h2 className='add-folder-form-header'>Edit Folder</h2>
                        <div className='add-folder-form-text'>Rename Folder: </div>
                        <p style={{fontSize: '5px'}} />
                        <input className='add-folder-form-input' autoFocus type='text' maxLength='100' placeholder='New Folder'
                            defaultValue={title} onChange={event => onChangeName(event.target.value)} /> {/*sends the user input via OnchangeName to the parent component*/}
                    </div>
                        <p style={{fontSize: '25px'}} />
                        <input className='add-folder-form-submit' type='button' value='Done' onClick={
                            () => { onEditFolder(folder.id, title); setEditModalIsOpen(false); backdropClick() }} />
                        <p style={{fontSize: '10px'}} />
                        </form>}
            </div>
        

            {deleteModalIsOpen && <Confirm
                title='Do you really want to delete this folder?'
                onYesClick={() => onDeleteFolder(folder.id, folder.pos)}
                onNoClick={() => {setDeleteModalIsOpen(false)}}
            />}

            <div  onClick={backdropClickEdit}>
                {editModalIsOpen && <Backdrop/>}
            </div>
            <div  onClick={() => {setDeleteModalIsOpen(false)}}>
                {deleteModalIsOpen && <Backdrop/>}
            </div>
    </>
  );
}

export default SettingsFolder;