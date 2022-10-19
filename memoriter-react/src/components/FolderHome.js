import '../css/folderHome.css'
import React from 'react';
import Backdropfs from './backdrop-transparent';
import Backdrop from './backdrop';
import { useState } from 'react';
import { Link } from 'react-router-dom';

//I had to move everything into a function, because I couldn't get it to work otherwise
//The Css of the this file is inside folderHome.css

const FolderHome = ({ folder, onDeleteFolder, onEditFolder, onPosUp, onPosDown, folderCount, onPosAdjust }) => {

    function onOpenFolder() { //function that gets called when the user clicks on a folder
        localStorage.setItem('syncedFolderID', folder.id) //set the folder id in local storage
        localStorage.setItem('syncedFolderTitle', folder.title) //set the folder title in local storage
    }

    const [modalIsOpen, setModalIsOpen] = useState(false); //modalIsOpen is the state of the modal if if is open or not

    function settingsHandler() { //function that gets called when the user clicks on the settings button
        setModalIsOpen(true);
    }
    function backdropClick() { //function that gets called when the user clicks on the backdrop
        setModalIsOpen(false);
    }

    const [modalIsOpenD, setModalIsOpenD] = useState(false); //modalIsOpenD is the state of the modal if if is open or not

    function deleteFolderReq() { //function that gets called when the user clicks on the delete button
      setModalIsOpenD(true);
      setModalIsOpen(false);
    }
    function backdropClickD() { //function that gets called when the user clicks on the backdrop
      setModalIsOpenD(false);
    }

    const [modalIsOpenE, setModalIsOpenE] = useState(false); //modalIsOpenE is the state of the modal if if is open or not

    function editFolderReq() { //function that gets called when the user clicks on the edit button
        setModalIsOpenE(true);
        setModalIsOpen(false);
    }
    function backdropClickE() { //function that gets called when the user clicks on the backdrop
        setTitle(folder.title);
        setModalIsOpenE(false);
    }

    const [ title, setTitle ] = useState(folder.title) //title is the state of the title of the folder

    const [ pos, setPos ] = useState(folder.pos) //pos is the state of the position of the folder

    if (folder.pos !== pos) { //if the position of the folder is not the same as the state of the position of the folder
        setPos(folder.pos)  //set the state of the position of the folder to the position of the folder
    }

    const newPosId = sessionStorage.getItem('newPosFolder'); //get the id of the folder that has the new position
    const newPosIdDelete = sessionStorage.getItem('newPosFolder' + folder.id) //get the id of the folder that has the new position

    if (newPosId === folder.id) { //if the id of the folder that has the new position is the same as the id of the folder
        onPosAdjust(folder.id, folder.pos); //adjust the position of the folder
        sessionStorage.removeItem('newPosFolder'); //remove the id of the folder that has the new position from the session storage
    } else if (newPosIdDelete === folder.id) { //if the id of the folder that has the new position is the same as the id of the folder
        onPosAdjust(folder.id, folder.pos); //adjust the position of the folder
        sessionStorage.removeItem('newPosFolder' + folder.id); //remove the id of the folder that has the new position from the session storage
    }

    return (
        <div className='folder-body'>
            <Link to='/topic' onClick={onOpenFolder}>
                <button className='button-homepage'/>
                {folder.title !== '' ? ( //Check if the title of the folder is not empty
                    <button className='button-homepage-text'>{folder.title}</button>
                ) : (
                    <button className='button-homepage-text'>New Folder</button>
                )}
            </Link>

            <section>
                <span className='new-cards-indicator'>
                    <Link to='/spaced-rep-mode'>
                        <span className='indicator'>
                            <p className='indicator-number'>12</p>
                        </span>
                    </Link>
                    <span className='indicator'>
                        <p className='indicator-number' style={{color:"orange"}}>10</p>
                    </span>
                    <span className='indicator'>
                        <p className='indicator-number' style={{color:"#bf2424"}}>30</p>
                    </span>
                </span>
            </section>
            
            <div className='folder-pos-body-up' onClick={
                () => { if (pos > 1) {setPos(pos - 1); onPosUp(folder.id, pos);} }
            }>
                <div className='folder-pos-arrow-up' />
            </div>
            <div className='folder-pos-body-down' onClick={
                () => { if (pos < folderCount) {setPos(pos + 1); onPosDown(folder.id, pos);} }
            }>
                <div className='folder-pos-arrow-down'/>
            </div>
            <div className='button-homepage-settings' onClick={settingsHandler}>
                <span className='dot'/>
                <span className='dot'/>
                <span className='dot'/>
            </div>

            <div>
                {modalIsOpen && <div className='folder-settings-overlay'>
                    <div className='folder-settings-sub'>
                        <p onClick={editFolderReq}><span style={{color: 'rgb(48, 158, 228)'}}>🖋</span> Edit</p>
                        <p onClick={deleteFolderReq} style={{color: 'rgb(228, 48, 48)'}}>✕ Delete</p>
                    </div>
                </div>}
            </div>

            <div>
                {modalIsOpenE && <form className='add-folder-form-body'>
                    <div>
                        <h2 className='add-folder-form-header'>Edit Folder</h2>
                        <div className='add-folder-form-text'>Rename Folder: </div>
                        <p style={{fontSize: '5px'}} />
                        <input className='add-folder-form-input' autoFocus type='text' maxLength='100' placeholder='New Folder'
                            defaultValue={title} onChange={(changeName) => setTitle(changeName.target.value)} />
                    </div>
                        <p style={{fontSize: '25px'}} />
                        <input className='add-folder-form-submit' type='button' value='Done' onClick={
                            () => { onEditFolder(folder.id, title); setModalIsOpenE(false); setModalIsOpen(false); }} />
                        <p style={{fontSize: '10px'}} />
                </form>}
            </div>

            <div>
                {modalIsOpenD && <div className='delete-folder-confirm'>
                    <h2 className='add-folder-form-header'>Do you really want to delete this folder?</h2>
                    <button className='delete-folder-confirm-yes' onClick={
                        () => onDeleteFolder(folder.id, folder.pos)
                    }>Yes</button>
                    <div style={{display: 'inline', color: 'transparent', cursor: 'default'}}>====</div>
                    <button className='delete-folder-confirm-no' onClick={backdropClickD}>No</button>
                    <p style={{fontSize: '10px'}} />
                 </div>}
            </div>

            <div  onClick={backdropClickE}>
                {modalIsOpenE && <Backdrop/>}
            </div>
            <div  onClick={backdropClickD}>
                {modalIsOpenD && <Backdrop/>}
            </div>

            <div>
                {modalIsOpen && <Backdropfs/>}
            </div>
            <div  onClick={backdropClick}>
                {modalIsOpen && <Backdropfs/>}
            </div>


        </div>
    );
}

export default FolderHome;