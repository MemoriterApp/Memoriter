import React from 'react';
import Backdropfs from './backdropfs';
import Backdrop from './backdrop';
import { useState } from 'react';

//NICHT ERSCHRECKEN: ICH MUSSTE, DAMIT ALLES FUNKTIONIERT, ALLES IN DIESEM COMPONENT ZUSAMMENFÜGEN!

const FolderHome = ({ folder, onDeleteFolder }) => {
    const test = () => {
        alert('test')
    }
    const [modalIsOpen, setModalIsOpen] = useState(false);

    function settingsHandler() {
        setModalIsOpen(true);
    }
    function backdropClick() {
        setModalIsOpen(false);
    }

    const [modalIsOpenE, setModalIsOpenE] = useState(false);

    function EditFolderClick() {
      setModalIsOpenE(true);
    }
    function backdropClickE() {
      setModalIsOpenE(false);
    }

    const [modalIsOpenD, setModalIsOpenD] = useState(false);

    function DeleteFolderReq() {
      setModalIsOpenD(true);
    }
    function backdropClickD() {
      setModalIsOpenD(false);
    }

    return (
        <div className='Folder_Body'>
            <button className='Button_Homepage' onClick={test}></button>
            {folder.name != '' ? ( 
                <button className='Button_Homepage_Text' onClick={test}>{folder.name}</button>
            ) : (
                <button className='Button_Homepage_Text' onClick={test}>New Folder</button>
            )}
            <div className='Button_Homepage_Settings' onClick={settingsHandler}>
                <span className='dot'></span>
                <span className='dot'></span>
                <span className='dot'></span>
            </div>

            <div>
                {modalIsOpen && <div className='folder-settings-overlay'>
                    <div className='folder-settings-sub'>
                        <p onClick={EditFolderClick}>Edit</p>
                        <p onClick={DeleteFolderReq}>Delete</p>
                    </div>

                    <div>
                        {modalIsOpenE && <form className='Add_Folder_Form_Body'>
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

                    <div>
                        {modalIsOpenD && <form className='Delete_Folder_Confirm'>
                            <h2 className='Add_folder_Form_Header'>Do you really want to delete this folder?</h2>
                            <input className='Delete_Folder_Confirm_Yes 'type='submit' value='Yes' onClick={() => onDeleteFolder(folder.id)} />
                            <input className='Delete_Folder_Confirm_No' type='submit' value='No' onClick={backdropClickD} />
                        </form>}
                    </div>

                <div  onClick={backdropClickE}>
                    {modalIsOpenE && <Backdrop/>}
                </div>
                <div  onClick={backdropClickD}>
                    {modalIsOpenD && <Backdrop/>}
                </div>
            </div>}
                {modalIsOpen && <Backdropfs/>}
            </div>
            <div  onClick={backdropClick}>
                {modalIsOpen && <Backdropfs/>}
            </div>
        </div>
    );
}

export default FolderHome;