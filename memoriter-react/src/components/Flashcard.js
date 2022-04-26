import React from 'react';
import { useState } from 'react';
import Backdrop from './backdrop';
import Backdropfs from './backdropfs';
import BackdropOpenFlashcard from './backdropOpenFlashcard';
import BackdropfsOpenFlashcard from './backdropfsOpenFlashcard';

const Flashcard = ({ flashcard, onPosLeft, onPosRight, flashcardCount, onDeleteFlashcard, onEditFlashcard,
    onOpenFlashcard, onCloseFlashcard, onNextFlashcard, onPrevFlashcard, openFlashcardView }) => {

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
    }
    function editOpenFlashcardReq() {
        setModalIsOpenE(true);
        setModalIsOpenEbackdropfs(true);
      }
    function backdropClickE() {
      setModalIsOpenE(false);
      setModalIsOpenEbackdrop(false);
      setModalIsOpenEbackdropfs(false);
    }

    const [title, setTitle] = useState(flashcard.title)

    const [content, setContent] = useState(flashcard.content)

    const [ pos, setPos ] = useState(flashcard.pos)

    if (flashcard.pos !== pos) {
        setPos(flashcard.pos)
    }

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
                <p className='Flashcard_Content'>{flashcard.content}</p>
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
                        <p className='Flashcard_Open_Content'>{flashcard.content}</p>
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

                    <div onClick={backdropClickE}>
                        {modalIsOpenEbackdrop && <Backdrop/>}
                    </div>
                </div>}
            </div>

            <div>
                {modalIsOpenE && <form className='Edit_Flashcard_Open_Body'>
                    <div>
                        <h2 className='Add_Flashcard_Form_Header'>Edit Flashcard</h2>
                        <p style={{fontSize: '30px'}} />
                        <textarea rows='2' className='Add_Flashcard_Form_Title' placeholder='Flashcard Title...' maxLength='100'
                            value={title} onChange={(changeTitle) => setTitle(changeTitle.target.value)} />
                        <p style={{fontSize: '20px'}} />
                        <textarea className='Add_Flashcard_Form_Content' placeholder='Flashcard Content...'
                            value={content} onChange={(changeContent) => setContent(changeContent.target.value)} />
                    </div>
                    <input className='Add_Flashcard_Form_Submit' type='submit' value='Done' onClick={
                        () => { onEditFlashcard(flashcard.id, title, content);
                            setModalIsOpenE(false); setModalIsOpenS(false); setModalIsOpenSO(false); } }/>
                </form>}
            </div>

            <div>
                {modalIsOpenD && <form className='Delete_Folder_Confirm'>
                    <h2 className='Add_folder_Form_Header'>Do you really want to delete this flashcard?</h2>
                    <input className='Delete_Folder_Confirm_Yes 'type='submit' value='Yes' onClick={
                        () => onDeleteFlashcard(flashcard.id, flashcard.pos)
                    }/>
                    <div style={{display: 'inline', color: 'transparent', cursor: 'default'}}>====</div>
                    <input className='Delete_Folder_Confirm_No' type='submit' value='No' onClick={backdropClickD} />
                    <p style={{fontSize: '10px'}} />
                 </form>}
            </div>

            <div onClick={backdropClick}>
                {modalIsOpenS && <Backdropfs/>}
            </div>
        </div>
    );
}

export default Flashcard;