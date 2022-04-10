import React from 'react';
import { useState } from 'react';

const AddFolderForm = ({ onAddFolder }) => {

    const [name, setName] = useState('')

    const onSubmitFolder = (changeName) => {
        changeName.preventDefault()
        onAddFolder({ name })
    }

    return (
        <form className='Add_Folder_Form_Body' onSubmit={onSubmitFolder}>
            <div>
                <h2 className='Add_Folder_Form_Header'>Create New Folder</h2>
                <div className='Add_Folder_Form_Text'>Folder Name: </div>
                <p style={{fontSize: '5px'}} />
                <input className='Add_Folder_Form_Input' type='text' placeholder='New Folder' maxLength='100' 
                    value={name} onChange={(changeName) => setName(changeName.target.value)} />
            </div>
            <p style={{fontSize: '25px'}} />
            <input className='Add_Folder_Form_Submit' type='submit' value='Done' />
        </form>
    );
}

export default AddFolderForm;