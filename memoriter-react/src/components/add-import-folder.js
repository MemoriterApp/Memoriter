import React from 'react';


function AddImportFolder({closeModal}) {

    const onImportFolder = () => {
        closeModal();
        console.log('folder has been imported')
   };

    return (

        <div className='Delete_Folder_Confirm' style={{borderColor: 'transparent'}}>
            <h2 className='Add_folder_Form_Header'>Do you want to add this folder?</h2>
            <button className='Delete_Folder_Confirm_Yes' onClick={()=> onImportFolder()}>Yes</button>
            <div style={{ display: 'inline', color: 'transparent', cursor: 'default' }}>====</div>
            <button className='Delete_Folder_Confirm_No'>No</button>
            <p style={{ fontSize: '10px' }} />
        </div>

    );
}

export default AddImportFolder;