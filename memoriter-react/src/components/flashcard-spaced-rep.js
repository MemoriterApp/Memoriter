import Confirm from './confirm';
import Backdrop from './backdrop';
import edit from '../images/edit.svg';
import deleteIcon from '../images/delete.svg';
import alignLeft from '../images/text-align-left.svg';
import alignRight from '../images/text-align-right.svg';
import alignCenter from '../images/text-align-center.svg';
import alignJustify from '../images/text-align-justify.svg';
import { useState } from 'react';
import { Remarkable } from 'remarkable';
import FlashcardForm from './topic/flashcard-form';

const FlashcardSpacedRep = ({
  flashcard,
  onAnswer,
  onEditFlashcard,
  onDeleteFlashcard,
  onChangeTextAlign,
}) => {
  
  const markdown = new Remarkable();

  const [showAnswer, setShowAnswer] = useState(false); //state for showing the answer of the card

  //state for modals
  const [settingsOverlay, setSettingsOverlay] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [modalIsOpenEdit, setModalIsOpenEdit] = useState(false);
  const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false);

  function deleteFlashcardReq() {
    setSettingsOverlay(false);
    setBackdropOpen(true);
    setModalIsOpenDelete(true);
  }

  function editFlashcardReq() {
    setSettingsOverlay(false);
    setBackdropOpen(true);
    setModalIsOpenEdit(true);
  }

  return (
    <div>
      <div className='study-flashcard-box' onClick={() => setShowAnswer(true)}>
        <div className='study-flashcard-dots' onClick={() => setSettingsOverlay(true)}>
          <div className='big-dot' />
          <div className='big-dot' />
          <div className='big-dot' />
        </div>

        <h2 style={{ textAlign: 'center', cursor: 'auto' }}>{flashcard.title}</h2>

        {showAnswer && (
          <div style={{ cursor: 'auto' }}>
            <article
              style={{ marginTop: '30px', textAlign: flashcard.textAlign }}
              dangerouslySetInnerHTML={{ __html: markdown.render(flashcard.content).trimEnd().replace(/(\r\n|\n|\r)/gm, '') }}
            />{' '}
            {/*dangerouslySetInnerHTML parses the formatted html text*/}
          </div>
        )}

        {settingsOverlay && 
          <div
            className='flashcard-settings-overlay'
            style={{ transform: 'translate(-24px, 16px)' }}
          >
            <div className='folder-settings-sub'>
              <p>
                {flashcard.textAlign === 'left' || (
                  <img
                    className='flashcard-settings-overlay-text-align'
                    src={alignLeft}
                    alt=''
                    onClick={() => onChangeTextAlign(flashcard.id, 'left')}
                  />
                )}
                {flashcard.textAlign === 'right' || (
                  <img
                    className='flashcard-settings-overlay-text-align'
                    src={alignRight}
                    alt=''
                    onClick={() => onChangeTextAlign(flashcard.id, 'right')}
                  />
                )}
                {flashcard.textAlign === 'center' || (
                  <img
                    className='flashcard-settings-overlay-text-align'
                    src={alignCenter}
                    alt=''
                    onClick={() => onChangeTextAlign(flashcard.id, 'center')}
                  />
                )}
                {flashcard.textAlign === 'justify' || (
                  <img
                    className='flashcard-settings-overlay-text-align'
                    src={alignJustify}
                    alt=''
                    onClick={() => onChangeTextAlign(flashcard.id, 'justify')}
                  />
                )}
              </p>
              <p onClick={editFlashcardReq}>
                <img
                  style={{ height: '1.6rem', marginRight: '0.2rem', marginBottom: '-0.3rem' }}
                  src={edit}
                  alt=''
                />
                Edit
              </p>
              <p onClick={deleteFlashcardReq} style={{ color: 'var(--current-red)', filter: 'none' }}>
                <img
                  style={{ height: '1.6rem', marginRight: '0.2rem', marginBottom: '-0.3rem' }}
                  src={deleteIcon}
                  alt=''
                />
                Delete
              </p>
            </div>
          </div>
        }
        <div onClick={() => setSettingsOverlay(false)}>{settingsOverlay && <Backdrop />}</div>
      </div>

      {showAnswer && (
        <div>
          <div className='flex-container'>
            <button
              className='spaced-rep-button'
              style={{ left: '25%', background: '#0d8f52' }}
              onClick={() => {
                setShowAnswer(false);
                onAnswer(flashcard, 4, flashcard.streak, flashcard.easiness, flashcard.interval);
              }}
            >
              easy
            </button>
            <button
              className='spaced-rep-button'
              style={{ left: '37.5%', background: '#0d8f18' }}
              onClick={() => {
                setShowAnswer(false);
                onAnswer(flashcard, 3, flashcard.streak, flashcard.easiness, flashcard.interval);
              }}
            >
              correct
            </button>
            <button
              className='spaced-rep-button'
              style={{ left: '50%', background: '#778f0d' }}
              onClick={() => {
                setShowAnswer(false);
                onAnswer(flashcard, 2, flashcard.streak, flashcard.easiness, flashcard.interval);
              }}
            >
              mostly correct
            </button>
            <button
              className='spaced-rep-button'
              style={{ left: '62.5%', background: '#8f520d', color: 'white' }}
              onClick={() => {
                setShowAnswer(false);
                onAnswer(flashcard, 1, flashcard.streak, flashcard.easiness, flashcard.interval);
              }}
            >
              almost correct
            </button>
            <button
              className='spaced-rep-button'
              style={{ left: '75%', background: '#8f0d0d', color: 'white' }}
              onClick={() => {
                setShowAnswer(false);
                onAnswer(flashcard, 0, flashcard.streak, flashcard.easiness, flashcard.interval);
              }}
            >
              incorrect
            </button>
          </div>
        </div>
      )}

      {modalIsOpenEdit && <FlashcardForm
        type='Edit'
        flashcard={flashcard}
        onCancel={() => setModalIsOpenEdit(false)}
        onConfirm={(title, content) => {onEditFlashcard(flashcard.id, title, content); setModalIsOpenEdit(false); setBackdropOpen(false);}}
      />}

      {modalIsOpenDelete && (
        <Confirm
          title='Do you really want to delete this flashcard?'
          onConfirm={() => onDeleteFlashcard(flashcard.id, flashcard.pos)}
          onCancel={() => {
            setModalIsOpenDelete(false);
            setBackdropOpen(false);
          }}
        />
      )}

      <div
        onClick={() => {
          setBackdropOpen(false);
          setModalIsOpenEdit(false);
          setModalIsOpenDelete(false);
        }}
      >
        {backdropOpen && <Backdrop />}
      </div>
    </div>
  );
};

export default FlashcardSpacedRep;
