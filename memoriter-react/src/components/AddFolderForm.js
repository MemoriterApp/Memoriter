import React from 'react';
import { useState } from 'react';

const AddFolderForm = ({ onAddFolder }) => {

    const [title, setTitle] = useState('')

    const onSubmitFolder = (changeName) => {
        changeName.preventDefault()
        onAddFolder({ title })
    }

    return (
        <form className='Add_Folder_Form_Body' onSubmit={onSubmitFolder}>
            <div>
                <h2 className='Add_Folder_Form_Header'>Create New Folder</h2>
                <div className='Add_Folder_Form_Text'>Folder Name: </div>
                <p style={{fontSize: '5px'}} />
                <input className='Add_Folder_Form_Input' type='text' placeholder='New Folder' maxLength='100' 
                    value={title} onChange={(changeName) => setTitle(changeName.target.value)} />
            </div>
            <p style={{fontSize: '25px'}} />
            <input className='Add_Folder_Form_Submit' type='submit' value='Done' />
            <p style={{fontSize: '10px'}} />
        </form>
    );
}

export default AddFolderForm;