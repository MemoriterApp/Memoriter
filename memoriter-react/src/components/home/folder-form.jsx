import { useState } from 'react';
import '../../styles/home/folder-form.css';
import Backdrop from '../backdrop';

const FolderForm = ({ folder, onConfirm, onCancel }) => {
  
  // name of the folder
  const [title, setTitle] = useState(folder.title);

  // function to apply the input value as folder name
  const onSubmitFolder = (event) => {
    event.preventDefault();
    onConfirm(title);
  };

  return (
    <>
      <form className='folder-form' onSubmit={onSubmitFolder}>
        <h2 className='folder-form-title'>Create New Folder</h2>
        <label className='folder-form-input-label' htmlFor='folder-form-input'>
          Folder Name:
        </label>
        <input
          className='folder-form-input'
          id='folder-form-input'
          value={title}
          placeholder='New Folder'
          autoFocus
          autoComplete='off'
          maxLength='100'
          onChange={(event) => setTitle(event.target.value)}
        />
        <button className='folder-form-button' type='submit'>
          Done
        </button>
      </form>
      <Backdrop onClick={() => onCancel()}/>
    </>
  );
};
export default FolderForm;