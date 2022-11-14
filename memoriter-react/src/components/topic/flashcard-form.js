import { useState } from 'react';
import Backdrop from '../backdrop';

const FlashcardForm = ({ type, flashcard, syncedFolderID, onConfirm, onCancel }) => {
  
  const [title, setTitle] = useState(flashcard.title); // flashcard title
  const [content, setContent] = useState(flashcard.content); // flashcard content

  // folder of the flashcard
  const [syncedFolder] = useState(syncedFolderID);

  // function to apply the input value as folder name
  const onSubmitFlashcard = (event) => {
    event.preventDefault();
    onConfirm(title, content, syncedFolder);
  };

  return (
    <>
      <form className='Flashcard_Open_Body' onSubmit={onSubmitFlashcard}>
        <div>
          <h2 className='Add_Flashcard_Form_Header'>{type} Flashcard</h2>
          <p style={{ fontSize: '30px' }} />
          <textarea
            rows='2'
            className='Add_Flashcard_Form_Title'
            placeholder='Flashcard Title...'
            maxLength='100'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          <p style={{ fontSize: '20px' }} />

          <textarea
            className='flashcard-form-content'
            placeholder='Flashcard Content...'
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
          <p className='flashcard-form-md'>
            This editor supports <a href='https://commonmark.org/help/' target='_blank' rel='noreferrer'>Markdown syntax</a>.
          </p>
        </div>
        <button className='Add_Flashcard_Form_Submit' type='submit'>Done</button>
        <div
          className='Add_Flashcard_Form_Submit'
          style={{ border: 'none', marginTop: '0px', left: '5px', padding: '5px', backgroundColor: 'transparent' }}
        />
      </form>
      <Backdrop onClick={() => onCancel()}/>
    </>
  );
};
export default FlashcardForm;