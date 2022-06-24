import React from 'react';
import { useState } from 'react';
import Backdrop from './backdrop';
import Backdropfs from './backdropfs';
import BackdropOpenFlashcard from './backdropOpenFlashcard';
import BackdropfsOpenFlashcard from './backdropfsOpenFlashcard';
import parse from 'html-react-parser';
import { Editor, EditorState, RichUtils, convertToRaw, convertFromRaw } from 'draft-js';
import { convertFromHTML, convertToHTML } from 'draft-convert';

const Flashcard = ({ flashcard, onPosLeft, onPosRight, flashcardCount, onDeleteFlashcard, onEditFlashcard,
    onOpenFlashcard, onCloseFlashcard, onNextFlashcard, onPrevFlashcard, openFlashcardView, onPosAdjust }) => {

    const [ modalIsOpen, setModalIsOpen ] = useState(false);

    function openFlashcard() {
        onOpenFlashcard(flashcard.pos);
    }

    function closeFlashcard() {
        onCloseFlashcard();
        setModalIsOpenSO(false)
    }

    if (openFlashcardView === flashcard.pos) {
        if (modalIsOpen === false) {
            setModalIsOpen(true)
        }
    } else {
        if (modalIsOpen === true) {
            setModalIsOpen(false)
        }
    }

    const [modalIsOpenSO, setModalIsOpenSO ] = useState(false);

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
    function editOpenFlashcardReq() {
        setModalIsOpenE(true);
        setModalIsOpenEbackdropfs(true);
      }
    function backdropClickE() {
        setTitle(flashcard.title);
        //setContent(flashcard.content);
        setModalIsOpenE(false);
        setModalIsOpenEbackdrop(false);
        setModalIsOpenEbackdropfs(false);
    }

    const [title, setTitle] = useState(flashcard.title)

    const [editorState, setEditorState] = useState(EditorState.createWithContent(convertFromHTML(flashcard.content)));

    const content = sessionStorage.getItem('flashcard-content');

    const [ pos, setPos ] = useState(flashcard.pos)

    if (flashcard.pos !== pos) {
        setPos(flashcard.pos)
    }

    const newPosId = sessionStorage.getItem('newPosFlashcard');
    const newPosIdDelete = sessionStorage.getItem('newPosFlashcard' + flashcard.id)

    if (newPosId === flashcard.id) {
        onPosAdjust(flashcard.id, flashcard.pos);
        sessionStorage.removeItem('newPosFlashcard');
    } else if (newPosIdDelete === flashcard.id) {
        onPosAdjust(flashcard.id, flashcard.pos);
        sessionStorage.removeItem('newPosFlashcard' + flashcard.id);
    }

    //Editor Functions
    function handleKeyCommand (command) {
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
        return <div onMouseDown={onClickButton} className='text-editor-button'>{props.label}</div>;
    };

    const INLINE_STYLES = [
        { label: "Bold", style: "BOLD" },
        { label: "Italic", style: "ITALIC" },
        { label: "Underline", style: "UNDERLINE" }
    ];
    
    const InlineStyleControls = (props) => {
        return (
            <div>
                {INLINE_STYLES.map((type) => (
                <StyleButton
                    key={type.label}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
                ))}
            </div>
        );
    };

    const BLOCK_TYPES = [
        { label: "Bulleted List", style: "unordered-list-item" },
        { label: "Numbered List", style: "ordered-list-item" }
      ];
    
      const BlockStyleControls = (props) => {
        return (
          <div>
            {BLOCK_TYPES.map((type) => (
              <StyleButton
                key={type.label}
                active={type.style}
                label={type.label}
                onToggle={props.onToggle}
                style={type.style}
              />
            ))}
          </div>
        );
      };

    const onInlineClick = (e) => {
        let nextState = RichUtils.toggleInlineStyle(editorState, e);
        setEditorState(nextState);
    };

    const onBlockClick = (e) => {
        let nextState = RichUtils.toggleBlockType(editorState, e);
        setEditorState(nextState);
    };

    return (
        <div className='Flashcard_Body'>
            <div className='Flashcard_Settings_Bar'>
                <div className='Flashcard_Settings' onClick={settingsHandler}>
                    <span className='dot'></span>
                    <span className='dot'></span>
                    <span className='dot'></span>
                </div>
                <div className='Flashcard_Pos_Body_Left' onClick={
                    () => { if (pos > 1) {setPos(pos - 1); onPosLeft(flashcard.id, pos);} }
                }>
                    <div className='Flashcard_Pos_Arrow_Left' />
                </div>
                <div className='Flashcard_Pos_Body_Right' onClick={
                    () => { if (pos < flashcardCount) {setPos(pos + 1); onPosRight(flashcard.id, pos);} }
                }>
                    <div className='Flashcard_Pos_Arrow_Right' />
                </div>
            </div>
            <div className='Flashcard_Rechteck' onClick={openFlashcard}>
                <h3 className='Flashcard_Title'>{flashcard.title}</h3>
                <p className='Flashcard_Content'>{parse(flashcard.content)}</p>
            </div>

            <div>
                {modalIsOpen && <div>
                    <div className='Flashcard_Switch_Arrows'>
                        <div className='Next_Flashcard' onClick={() => onNextFlashcard(flashcard.pos)} />
                        <div className='Prev_Flashcard' onClick={() => onPrevFlashcard(flashcard.pos)} />
                    </div>
                    <div className='Flashcard_Open_Body'>
                        <div className='Close_Flashcard_Button' onClick={closeFlashcard}>
                            <div className='Close_Flashcard_Arrow'/>
                        </div>
                        <div className='Flashcard_Open_Settings' onClick={settingsHandlerOpen}>
                            <span className='big-dot'/>
                            <span className='big-dot'/>
                            <span className='big-dot'/>
                        </div>
                        <p style={{fontSize: '40px'}} />
                        <h2 className='Flashcard_Open_Title'>{flashcard.title}</h2>
                        <p style={{fontSize: '40px'}} />
                        <p className='Flashcard_Open_Content'>{parse(flashcard.content)}</p>
                        <div>

                        </div>
                    </div>
                </div>}
            </div>

            <div  onClick={backdropClickD}>
                {modalIsOpenD && <BackdropOpenFlashcard/>}
            </div>

            <div onClick={backdropClickOpen}>
                {modalIsOpenSO && <BackdropfsOpenFlashcard/>}
            </div>

            {modalIsOpenSO && <div className='flashcard-open-settings-overlay-position-field'>
                <div className='flashcard-open-settings-overlay-position-field-click' onClick={backdropClickOpen}/>
                <div className='flashcard-open-settings-overlay'>
                    <div className='folder-settings-sub'>
                        <p onClick={editOpenFlashcardReq}>Edit</p>
                        <p onClick={deleteFlashcardReq}>Delete</p>
                    </div>
                </div>
            </div>}

            <div onClick={closeFlashcard}>
                {modalIsOpen && <Backdrop/>}
            </div>

            <div>
                {modalIsOpenS && <div className='flashcard-settings-overlay'>
                    <div className='folder-settings-sub'>
                        <p onClick={editFlashcardReq}>Edit</p>
                        <p onClick={deleteFlashcardReq}>Delete</p>
                    </div>

                </div>}

                <div onClick={backdropClickE}>
                    {modalIsOpenEbackdrop && <Backdrop/>}
                </div>
            </div>

            <div>
                {modalIsOpenE && <form className='Edit_Flashcard_Open_Body'>
                    <div>
                        <h2 className='Add_Flashcard_Form_Header'>Edit Flashcard</h2>
                        <p style={{fontSize: '30px'}} />
                        <textarea rows='2' className='Add_Flashcard_Form_Title' placeholder='Flashcard Title...' maxLength='100'
                            value={title} onChange={(changeTitle) => setTitle(changeTitle.target.value)} />
                        <p style={{fontSize: '20px'}} />
                        
                        
                        <div className='Add_Flashcard_Form_Content'>
                            <BlockStyleControls onToggle={onBlockClick}/>
                            <InlineStyleControls onToggle={onInlineClick}/>
                            <div style={{width: '100%', borderTop: '2px solid rgba(112, 112 ,112 ,1)', margin: '10px 0 10px 0'}}/>
                            <Editor
                                placeholder='Flashcard Content...'
                                editorState={editorState}
                                onChange={(editorState) => {
                                    const contentState = editorState.getCurrentContent();
                                    const saveContent = (contentState) => {
                                        sessionStorage.setItem('flashcard-content-obj', JSON.stringify(convertToRaw(contentState)));
                                        sessionStorage.setItem('flashcard-content', convertToHTML(contentState));
                                    };
                                    saveContent(contentState);
                                    setEditorState(editorState);
                                }}
                                handleKeyCommand={handleKeyCommand}
                            />
                        </div>
                    
                    </div>
                    <input className='Add_Flashcard_Form_Submit' type='submit' value='Done' onClick={
                        () => { onEditFlashcard(flashcard.id, title, content);
                            setModalIsOpenE(false); setModalIsOpenS(false); setModalIsOpenSO(false); setModalIsOpenEbackdrop(false);} }/>
                </form>}
            </div>

            <div>
                {modalIsOpenD && <div className='Delete_Folder_Confirm'>
                    <h2 className='Add_folder_Form_Header'>Do you really want to delete this flashcard?</h2>
                    <button className='Delete_Folder_Confirm_Yes' onClick={
                        () => onDeleteFlashcard(flashcard.id, flashcard.pos)
                    }>Yes</button>
                    <div style={{display: 'inline', color: 'transparent', cursor: 'default'}}>====</div>
                    <button className='Delete_Folder_Confirm_No' onClick={backdropClickD}>No</button>
                    <p style={{fontSize: '10px'}} />
                 </div>}
            </div>
            
            <div onClick={backdropClick}>
                {modalIsOpenS && <Backdropfs/>}
            </div>

        </div>
    );
}

export default Flashcard;