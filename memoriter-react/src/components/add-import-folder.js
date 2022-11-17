import React from 'react';


function AddImportFolder() {
    return (

        <div className='Delete_Folder_Confirm' style={{borderColor: 'transparent'}}>
            <h2 className='Add_folder_Form_Header'>Do you want to add this folder?</h2>
            <button className='Delete_Folder_Confirm_Yes'>Yes</button>
            <div style={{ display: 'inline', color: 'transparent', cursor: 'default' }}>====</div>
            <button className='Delete_Folder_Confirm_No'>No</button>
            <p style={{ fontSize: '10px' }} />
        </div>

    );
}

export default AddImportFolder;