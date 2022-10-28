/* eslint-disable react/prop-types */
import React from 'react';
import Backdropfs from './backdrop-transparent';
import Backdrop from './backdrop';
import { useState} from 'react';
import { Link } from 'react-router-dom';

//NICHT ERSCHRECKEN: ICH MUSSTE, DAMIT ALLES FUNKTIONIERT, ALLES IN DIESEM COMPONENT ZUSAMMENFÜGEN!

const FolderHome = ({ folder, onDeleteFolder, onEditFolder, onPosUp, onPosDown, folderCount, onPosAdjust }) => {

  function onOpenFolder() {
    localStorage.setItem('syncedFolderID', folder.id);
    localStorage.setItem('syncedFolderTitle', folder.title);
  }

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function settingsHandler() {
    setModalIsOpen(true);
  }
  function backdropClick() {
    setModalIsOpen(false);
  }

  const [modalIsOpenD, setModalIsOpenD] = useState(false);

  function deleteFolderReq() {
    setModalIsOpenD(true);
    setModalIsOpen(false);
  }
  function backdropClickD() {
    setModalIsOpenD(false);
  }

  const [modalIsOpenE, setModalIsOpenE] = useState(false);

  function editFolderReq() {
    setModalIsOpenE(true);
    setModalIsOpen(false);
  }
  function backdropClickE() {
    setTitle(folder.title);
    setModalIsOpenE(false);
  }

  const [title, setTitle] = useState(folder.title);

  const [pos, setPos] = useState(folder.pos);

  

  if (folder.pos !== pos) {
    setPos(folder.pos);
  }

  const newPosId = sessionStorage.getItem('newPosFolder');
  const newPosIdDelete = sessionStorage.getItem('newPosFolder' + folder.id);

  if (newPosId === folder.id) {
    onPosAdjust(folder.id, folder.pos);
    sessionStorage.removeItem('newPosFolder');
  } else if (newPosIdDelete === folder.id) {
    onPosAdjust(folder.id, folder.pos);
    sessionStorage.removeItem('newPosFolder' + folder.id);
  }

  // eslint-disable-next-line no-unused-vars
  let syncedFolderID = localStorage.getItem('syncedFolderID'); //variable for the folder id and for the link
  // eslint-disable-next-line no-unused-vars
  const testNumber = 1; 
  return (
    <div className='Folder_Body'>
      <Link to={'/topic/'+syncedFolderID} onClick={onOpenFolder}>
        <button className='Button_Homepage'/>
        {folder.title !== '' ? (
          <button className='Button_Homepage_Text'>{folder.title}</button>
        ) : (
          <button className='Button_Homepage_Text'>New Folder</button>
        )}
      </Link>
            
      <div className='Folder_Pos_Body_Up' onClick={
        () => { if (pos > 1) {setPos(pos - 1); onPosUp(folder.id, pos);} }
      }>
        <div className='Folder_Pos_Arrow_Up' />
      </div>
      <div className='Folder_Pos_Body_Down' onClick={
        () => { if (pos < folderCount) {setPos(pos + 1); onPosDown(folder.id, pos);} }
      }>
        <div className='Folder_Pos_Arrow_Down'/>
      </div>
      <div className='Button_Homepage_Settings' onClick={settingsHandler}>
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
        {modalIsOpenE && <form className='Add_Folder_Form_Body'>
          <div>
            <h2 className='Add_Folder_Form_Header'>Edit Folder</h2>
            <div className='Add_Folder_Form_Text'>Rename Folder: </div>
            <p style={{fontSize: '5px'}} />
            <input className='Add_Folder_Form_Input' autoFocus type='text' maxLength='100' placeholder='New Folder'
              defaultValue={title} onChange={(changeName) => setTitle(changeName.target.value)} />
          </div>
          <p style={{fontSize: '25px'}} />
          <input className='Add_Folder_Form_Submit' type='button' value='Done' onClick={
            () => { onEditFolder(folder.id, title); setModalIsOpenE(false); setModalIsOpen(false); }} />
          <p style={{fontSize: '10px'}} />
        </form>}
      </div>

      <div>
        {modalIsOpenD && <div className='Delete_Folder_Confirm'>
          <h2 className='Add_folder_Form_Header'>Do you really want to delete this folder?</h2>
          <button className='Delete_Folder_Confirm_Yes' onClick={
            () => onDeleteFolder(folder.id, folder.pos)
          }>Yes</button>
          <div style={{display: 'inline', color: 'transparent', cursor: 'default'}}>====</div>
          <button className='Delete_Folder_Confirm_No' onClick={backdropClickD}>No</button>
          <p style={{fontSize: '10px'}} />
        </div>}
      </div>

      <div onClick={backdropClickE}>
        {modalIsOpenE && <Backdrop/>}
      </div>
      <div onClick={backdropClickD}>
        {modalIsOpenD && <Backdrop/>}
      </div>

      <div>
        {modalIsOpen && <Backdropfs/>}
      </div>
      <div onClick={backdropClick}>
        {modalIsOpen && <Backdropfs/>}
      </div>


    </div>
  );
};

export default FolderHome;