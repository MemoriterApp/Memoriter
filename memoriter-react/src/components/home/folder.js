import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../css/folder.css';
import edit from '../../images/edit.svg';
import deleteIcon from '../../images/delete.svg';
import Confirm from '../confirm';
import Backdrop from '../backdrop';
import FolderForm from './folder-form';

const Folder = ({
  folder,
  onDeleteFolder,
  onEditFolder,
  onPosUp,
  onPosDown,
  folderCount,
  onPosAdjust,
}) => {
  
  // function that gets called when the user clicks on a folder
  const onOpenFolder = () => {
    localStorage.setItem('syncedFolderID', folder.id); //set the folder id in local storage
    localStorage.setItem('syncedFolderTitle', folder.title); //set the folder title in local storage
  };

  // modalIsOpen is the state of the modal if if is open or not
  const [modalIsOpen, setModalIsOpen] = useState(false);

  // function that gets called when the user clicks on the settings button
  const settingsHandler = () => {
    setModalIsOpen(true);
  };
  // function that gets called when the user clicks on the backdrop
  const backdropClick = () => {
    setModalIsOpen(false);
  };

  // function when the folder is edited
  const editFolder = (newTitle) => {
    onEditFolder(folder.id, newTitle);
    setEditModal(false);
  };

  // modalIsOpenD is the state of the modal if if is open or not
  const [modalIsOpenD, setModalIsOpenD] = useState(false);

  // function that gets called when the user clicks on the delete button
  function deleteFolderReq() {
    setModalIsOpenD(true);
    setModalIsOpen(false);
  };

  // modalIsOpenE is the state of the modal if if is open or not
  const [editModal, setEditModal] = useState(false);

  // function that gets called when the user clicks on the edit button
  const editFolderReq = () => {
    setEditModal(true);
    setModalIsOpen(false);
  };

  // pos is the state of the position of the folder
  const [pos, setPos] = useState(folder.pos);

  // if the position of the folder is not the same as the state of the position of the folder
  if (folder.pos !== pos) {
    setPos(folder.pos); // set the state of the position of the folder to the position of the folder
  }

  // get the id of the folder that has the new position
  const newPosId = sessionStorage.getItem('newPosFolder');
  // get the id of the folder that has the new position
  const newPosIdDelete = sessionStorage.getItem('newPosFolder' + folder.id);

  // if the id of the folder that has the new position is the same as the id of the folder
  if (newPosId === folder.id) {
    onPosAdjust(folder.id, folder.pos); //adjust the position of the folder
    sessionStorage.removeItem('newPosFolder'); //remove the id of the folder that has the new position from the session storage
  } else if (newPosIdDelete === folder.id) { //if the id of the folder that has the new position is the same as the id of the folder
    onPosAdjust(folder.id, folder.pos); //adjust the position of the folder
    sessionStorage.removeItem('newPosFolder' + folder.id); //remove the id of the folder that has the new position from the session storage
  };

  return (
    <section className='folder'>
      <Link to='/topic' onClick={onOpenFolder}>
        <button className='button-homepage' />
        {folder.title !== '' ? ( // checks if the title of the folder is not empty
          <button className='button-homepage-text'>{folder.title}</button>
        ) : (
          <button className='button-homepage-text'>New folder</button>
        )}
      </Link>

      <div className='new-cards-indicator'>
        <Link to='/study-spaced-repetition' className='indicator'>
          <p className='indicator-number'>12</p>
        </Link>
      </div>

      <div
        className='folder-pos-body-up'
        onClick={() => {
          if (pos > 1) {
            setPos(pos - 1);
            onPosUp(folder.id, pos);
          }
        }}
      >
        <div className='folder-pos-arrow-up' />
      </div>
      <div
        className='folder-pos-body-down'
        onClick={() => {
          if (pos < folderCount) {
            setPos(pos + 1);
            onPosDown(folder.id, pos);
          }
        }}
      >
        <div className='folder-pos-arrow-down' />
      </div>
      <div className='button-homepage-settings' onClick={settingsHandler}>
        <span className='dot' />
        <span className='dot' />
        <span className='dot' />
      </div>

      <div>
        {modalIsOpen && (
          <div className='folder-settings-overlay'>
            <div className='folder-settings-sub'>
              <p onClick={editFolderReq}>
                <img
                  style={{ height: '1.6rem', marginRight: '0.2rem', marginBottom: '-0.3rem' }}
                  src={edit}
                  alt=''
                />
                Edit
              </p>
              <p onClick={deleteFolderReq} style={{ color: 'var(--current-red)', filter: 'none' }}>
                <img
                  style={{ height: '1.6rem', marginRight: '0.2rem', marginBottom: '-0.3rem' }}
                  src={deleteIcon}
                  alt=''
                />
                Delete
              </p>
            </div>
          </div>
        )}
      </div>

      {editModal && <FolderForm
      type='Edit'
        folder={folder}
        onCancel={() => setEditModal(false)}
        onConfirm={editFolder}
      />}

      {modalIsOpenD && 
        <Confirm
          title='Do you really want to delete this folder?'
          onConfirm={() => onDeleteFolder(folder.id, folder.pos)}
          onCancel={() => setModalIsOpenD(false)}
        />
      }

      <div onClick={backdropClick}>{modalIsOpen && <Backdrop />}</div>
    </section>
  );
};
export default Folder;