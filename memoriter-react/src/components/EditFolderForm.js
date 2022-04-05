import React from 'react';

const EditFolderForm = () => {

    return (
        <form className='Add_Folder_Form_Body'>
            <div>
                <h2 className='Add_Folder_Form_Header'>Edit Folder</h2>
                <div className='Add_Folder_Form_Text'>Folder Name: </div>
                <p style={{fontSize: '5px'}} />
                <input className='Add_Folder_Form_Input' type='text' placeholder='New Folder' maxLength='100' />
            </div>
            <p style={{fontSize: '25px'}} />
            <input className='Add_Folder_Form_Submit' type='submit' value='Done' />
        </form>
    );
}

export default EditFolderForm;
