import { useState, useRef, useEffect } from 'react';
import { Remarkable } from 'remarkable';
import edit from '../../images/edit.svg';
import deleteIcon from '../../images/delete.svg';
import alignLeft from '../../images/text-align-left.svg';
import alignRight from '../../images/text-align-right.svg';
import alignCenter from '../../images/text-align-center.svg';
import alignJustify from '../../images/text-align-justify.svg';
import FlashcardForm from './flashcard-form';
import Confirm from '../confirm';
import Backdrop from '../backdrop';
import BackdropOpenFlashcard from '../backdropOpenFlashcard';
import BackdropfsOpenFlashcard from '../backdropfsOpenFlashcard';

const Flashcard = ({
  flashcard,
  type,
  onPosLeft,
  onPosRight,
  flashcardCount,
  onDeleteFlashcard,
  onEditFlashcard,
  onOpenFlashcard,
  onCloseFlashcard,
  onNextFlashcard,
  onPrevFlashcard,
  openFlashcardView,
  onPosAdjust,
  onChangeTextAlign,
}) => {
  const refHeight = useRef(null); //reference to html id to get the height of the inner flashcard rectangle
  const [flashcardHeight, setFlashcardHeight] = useState(0); //height of the inner flashcard rectangle
  const [maxHeightGradient, setMaxHeightGradient] = useState('');

  const refContentHeight = useRef(null);
  const refTitleHeight = useRef(null);

  const markdown = new Remarkable();

  useEffect(() => {
    //sets the height of the flashcard on component render
    setFlashcardHeight(refHeight.current.clientHeight);
    if (
      refHeight.current.clientHeight >= 290 &&
      refTitleHeight.current.clientHeight + refContentHeight.current.clientHeight > 260
    ) {
      //checks if the flashcard has its max height and applies bottom text fade out gradient
      setMaxHeightGradient('flashcard-rechteck-gradient');
    } else {
      setMaxHeightGradient('');
    }
  }, []);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function openFlashcard() {
    onOpenFlashcard(flashcard.pos);
  }

  function closeFlashcard() {
    onCloseFlashcard();
    setModalIsOpenSO(false);
  }

  if (openFlashcardView === flashcard.pos) {
    if (modalIsOpen === false) {
      setModalIsOpen(true);
    }
  } else {
    if (modalIsOpen === true) {
      setModalIsOpen(false);
    }
  }

  const [modalIsOpenSO, setModalIsOpenSO] = useState(false);

  function settingsHandlerOpen() {
    setModalIsOpenSO(true);
  }
  function backdropClickOpen() {
    setModalIsOpenSO(false);
    setModalIsOpenE(false);
  }

  const [modalIsOpenS, setModalIsOpenS] = useState(false);

  function settingsHandler() {
    setModalIsOpenS(true);
  }
  function backdropClick() {
    setModalIsOpenS(false);
  }

  const [modalIsOpenD, setModalIsOpenD] = useState(false);

  function deleteFlashcardReq() {
    setModalIsOpenD(true);
    setModalIsOpenS(false);
    setModalIsOpenSO(false);
  }
  function backdropClickD() {
    setModalIsOpenD(false);
  }

  const [modalIsOpenE, setModalIsOpenE] = useState(false);
  const [modalIsOpenEbackdrop, setModalIsOpenEbackdrop] = useState(false);
  const [setModalIsOpenEbackdropfs] = useState(false);

  function editFlashcardReq() {
    setModalIsOpenE(true);
    setModalIsOpenEbackdrop(true);
    setModalIsOpenS(false);
    setModalIsOpenSO(false);
  }

  function backdropClickE() {
    setTitle(flashcard.title);
    //setContent(flashcard.content);
    setModalIsOpenE(false);
    setModalIsOpenEbackdrop(false);
    setModalIsOpenEbackdropfs(false);
  }

  const [title, setTitle] = useState(flashcard.title);

  const [content, setContent] = useState(flashcard.content);

  const [pos, setPos] = useState(flashcard.pos);

  if (flashcard.pos !== pos) {
    setPos(flashcard.pos);
  }

  const newPosId = sessionStorage.getItem('newPosFlashcard');
  const newPosIdDelete = sessionStorage.getItem('newPosFlashcard' + flashcard.id);

  if (newPosId === flashcard.id) {
    onPosAdjust(flashcard.id, flashcard.pos);
    sessionStorage.removeItem('newPosFlashcard');
  } else if (newPosIdDelete === flashcard.id) {
    onPosAdjust(flashcard.id, flashcard.pos);
    sessionStorage.removeItem('newPosFlashcard' + flashcard.id);
  }

  const [isMouseInside, setIsMouseInside] = useState(); //state to check if mouse hover over flashcard

  return (
    <div className='flashcard-body' style={{ height: `calc(${flashcardHeight}px + 35px)`, boxShadow: '0.25vw 0.75vh 10px #777777cc' }}>
      {' '}
      {/*height is set by the useEffect based on the inner rectangle height*/}
      <div className='Flashcard-settings-bar'>
        <div className='Flashcard_Settings' onClick={settingsHandler}>
          <span className='dot' />
          <span className='dot' />
          <span className='dot' />
        </div>
        <div
          className='Flashcard_Pos_Body_Left'
          onClick={() => {
            if (pos > 1) {
              setPos(pos - 1);
              onPosLeft(flashcard.id, pos);
            }
          }}
        >
          <div className='Flashcard_Pos_Arrow_Left' />
        </div>
        <div
          className='Flashcard_Pos_Body_Right'
          onClick={() => {
            if (pos < flashcardCount) {
              setPos(pos + 1);
              onPosRight(flashcard.id, pos);
            }
          }}
        >
          <div className='Flashcard_Pos_Arrow_Right' />
        </div>
      </div>
      <div
        className={`flashcard-rechteck ${maxHeightGradient}`}
        ref={refHeight}
        onClick={openFlashcard}
        onMouseEnter={() => setIsMouseInside(true)}
        onMouseLeave={() => setIsMouseInside(false)}
      >
        <h3 className='Flashcard_Title' ref={refTitleHeight}>
          {flashcard.title}
        </h3>
        {type === 'only-question' && !isMouseInside ? (
          <div
            className='flashcard-content'
            style={{ textAlign: flashcard.textAlign, opacity: '0' }}
            ref={refContentHeight}
            dangerouslySetInnerHTML={{ __html: markdown.render(flashcard.content).trimEnd().replace(/(\r\n|\n|\r)/gm, '') }}
          />
        ) : (
          <div
            className='flashcard-content'
            style={{ textAlign: flashcard.textAlign }}
            ref={refContentHeight}
            dangerouslySetInnerHTML={{ __html: markdown.render(flashcard.content).trimEnd().replace(/(\r\n|\n|\r)/gm, '') }}
          />
        )}
        {/*dangerouslySetInnerHTML parses the formatted html text*/}
      </div>
      <div>
        {modalIsOpen && (
          <div>
            <div className='Flashcard_Switch_Arrows'>
              <div className='Next_Flashcard' onClick={() => onNextFlashcard(flashcard.pos)} />
              <div className='Prev_Flashcard' onClick={() => onPrevFlashcard(flashcard.pos)} />
            </div>
            <div className='Flashcard_Open_Body'>
              <div className='Close_Flashcard_Button' onClick={closeFlashcard}>
                <div className='Close_Flashcard_Arrow' />
              </div>
              <div className='Flashcard_Open_Settings' onClick={settingsHandlerOpen}>
                <span className='big-dot' />
                <span className='big-dot' />
                <span className='big-dot' />
              </div>
              <p style={{ fontSize: '40px' }} />
              <h2 className='Flashcard_Open_Title'>{flashcard.title}</h2>
              <p style={{ fontSize: '40px' }} />
              <div
                className='Flashcard_Open_Content'
                style={{ textAlign: flashcard.textAlign }}
                dangerouslySetInnerHTML={{ __html: markdown.render(flashcard.content).trimEnd().replace(/(\r\n|\n|\r)/gm, '') }}
              />
              {/*dangerouslySetInnerHTML parses the formatted html text*/}
            </div>
          </div>
        )}
      </div>
      <div onClick={backdropClickD}>{modalIsOpenD && <BackdropOpenFlashcard />}</div>
      <div onClick={backdropClickOpen}>{modalIsOpenSO && <BackdropfsOpenFlashcard />}</div>
      {modalIsOpenSO && (
        <div className='flashcard-open-settings-overlay-position-field'>
          <div
            className='flashcard-open-settings-overlay-position-field-click'
            onClick={backdropClickOpen}
          />
          <div className='flashcard-settings-overlay'>
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
        </div>
      )}
      <div onClick={closeFlashcard}>{modalIsOpen && <Backdrop />}</div>
      <div>
        {modalIsOpenS && (
          <div className='flashcard-settings-overlay'>
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
                />{' '}
                Edit
              </p>
              <p onClick={deleteFlashcardReq} style={{ color: 'var(--current-red)', filter: 'none' }}>
                <img
                  style={{ height: '1.6rem', marginRight: '0.2rem', marginBottom: '-0.3rem' }}
                  src={deleteIcon}
                  alt=''
                />{' '}
                Delete
              </p>
            </div>
          </div>
        )}
      </div>
      {modalIsOpenE && <FlashcardForm
        type='Edit'
        flashcard={flashcard}
        onCancel={() => setModalIsOpenE(false)}
        onConfirm={(title, content) => {onEditFlashcard(flashcard.id, title, content); setModalIsOpenE(false)}}
      />}
      {modalIsOpenD && (
        <Confirm
          title='Do you really want to delete this flashcard?'
          onConfirm={() => onDeleteFlashcard(flashcard.id, flashcard.pos)}
          onCancel={backdropClickD}
        />
      )}
      <div onClick={backdropClick}>{modalIsOpenS && <Backdrop />}</div>
    </div>
  );
};
export default Flashcard;