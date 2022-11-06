import { useState, useRef, useEffect } from 'react';
import edit from '../../images/edit.svg';
import deleteIcon from '../../images/delete.svg';
import alignLeft from '../../images/text-align-left.svg';
import alignRight from '../../images/text-align-right.svg';
import alignCenter from '../../images/text-align-center.svg';
import alignJustify from '../../images/text-align-justify.svg';
import Confirm from '../confirm';
import Backdrop from '../backdrop';
import BackdropOpenFlashcard from '../backdropOpenFlashcard';
import BackdropfsOpenFlashcard from '../backdropfsOpenFlashcard';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import { convertFromHTML, convertToHTML } from 'draft-convert';

const FlashcardQnlyQuestion = ({
  flashcard,
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

  const [editorState, setEditorState] = useState(
    EditorState.createWithContent(convertFromHTML(flashcard.content))
  );

  const content = sessionStorage.getItem('flashcard-content');

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

  //Editor Functions
  function handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  const StyleButton = (props) => {
    let onClickButton = (e) => {
      e.preventDefault();
      props.onToggle(props.style);
    };
    let className = 'text-editor-button';
    if (props.active) {
      className += ' text-editor-button-active';
    }
    return (
      <div
        onMouseDown={onClickButton}
        className={className}
        style={{ fontWeight: props.label, fontStyle: props.label, textDecoration: props.label }}
      >
        {props.label}
      </div>
    );
  };

  const INLINE_STYLES = [
    { label: 'Bold', style: 'BOLD', highlight: 'red' },
    { label: 'Italic', style: 'ITALIC' },
    { label: 'Underline', style: 'UNDERLINE' },
  ];

  const InlineStyleControls = (props) => {
    const currentStyle = editorState.getCurrentInlineStyle();
    return (
      <div>
        {INLINE_STYLES.map((type) => (
          <StyleButton
            key={type.label}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
            active={currentStyle.has(type.style)}
          />
        ))}
      </div>
    );
  };

  const BLOCK_TYPES = [
    { label: 'Bulleted List', style: 'unordered-list-item' },
    { label: 'Numbered List', style: 'ordered-list-item' },
  ];

  const BlockStyleControls = (props) => {
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();
    return (
      <div>
        {BLOCK_TYPES.map((type) => (
          <StyleButton
            key={type.label}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
            active={type.style === blockType}
          />
        ))}
      </div>
    );
  };

  const onInlineClick = (e) => {
    let newState = RichUtils.toggleInlineStyle(editorState, e);
    setEditorState(newState);
  };

  const onBlockClick = (e) => {
    let newState = RichUtils.toggleBlockType(editorState, e);
    setEditorState(newState);
  };

  const [isMouseInside, setIsMouseInside] = useState(); //state to check if mouse hover over flashcard

  return (
    <div className='flashcard-body' style={{ height: `calc(${flashcardHeight}px + 35px)` }}>
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
        {isMouseInside ? (
          <div
            className='Flashcard_Content'
            style={{ textAlign: flashcard.textAlign }}
            ref={refContentHeight}
            dangerouslySetInnerHTML={{ __html: flashcard.content }}
          />
        ) : (
          <div
            className='Flashcard_Content'
            style={{ textAlign: flashcard.textAlign, opacity: '0' }}
            ref={refContentHeight}
            dangerouslySetInnerHTML={{ __html: flashcard.content }}
          />
        )}{' '}
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
                dangerouslySetInnerHTML={{ __html: flashcard.content }}
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
              <p onClick={deleteFlashcardReq} style={{ color: 'var(--current-red)' }}>
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
              <p onClick={deleteFlashcardReq} style={{ color: 'var(--current-red)' }}>
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

        <div onClick={backdropClickE}>{modalIsOpenEbackdrop && <Backdrop />}</div>
      </div>
      <div>
        {modalIsOpenE && (
          <form className='Edit_Flashcard_Open_Body'>
            <div>
              <h2 className='Add_Flashcard_Form_Header'>Edit Flashcard</h2>
              <p style={{ fontSize: '30px' }} />
              <textarea
                rows='2'
                className='Add_Flashcard_Form_Title'
                placeholder='Flashcard Title...'
                maxLength='100'
                value={title}
                onChange={(changeTitle) => setTitle(changeTitle.target.value)}
              />
              <p style={{ fontSize: '20px' }} />

              <div className='Add_Flashcard_Form_Content'>
                <BlockStyleControls onToggle={onBlockClick} />
                <InlineStyleControls onToggle={onInlineClick} />
                <div
                  style={{
                    width: '100%',
                    borderTop: '2px solid rgba(112, 112 ,112 ,1)',
                    margin: '10px 0 10px 0',
                  }}
                />
                <Editor
                  placeholder='Flashcard Content...'
                  editorState={editorState}
                  onChange={(editorState) => {
                    const contentState = editorState.getCurrentContent();
                    const saveContent = (contentState) => {
                      sessionStorage.setItem(
                        'flashcard-content-obj',
                        JSON.stringify(convertToRaw(contentState))
                      );
                      sessionStorage.setItem('flashcard-content', convertToHTML(contentState));
                    };
                    saveContent(contentState);
                    setEditorState(editorState);
                  }}
                  handleKeyCommand={handleKeyCommand}
                />
              </div>
            </div>
            <input
              className='Add_Flashcard_Form_Submit'
              type='submit'
              value='Done'
              onClick={() => {
                onEditFlashcard(flashcard.id, title, content);
                setModalIsOpenE(false);
                setModalIsOpenS(false);
                setModalIsOpenSO(false);
                setModalIsOpenEbackdrop(false);
              }}
            />
          </form>
        )}
      </div>
      {modalIsOpenD && (
        <Confirm
          title='Do you really want to delete this flashcard?'
          onYesClick={() => onDeleteFlashcard(flashcard.id, flashcard.pos)}
          onNoClick={backdropClickD}
        />
      )}
      <div onClick={backdropClick}>{modalIsOpenS && <Backdrop />}</div>
    </div>
  );
};
export default FlashcardQnlyQuestion;