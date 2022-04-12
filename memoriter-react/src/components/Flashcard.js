import React from 'react';
import { useState } from 'react';
import Backdrop from './backdrop';
import Backdropfs from './backdropfs';

const Flashcard = ({ flashcard, onPosLeft, onPosRight, flashcardCount }) => {

    const [ modalIsOpen, setModalIsOpen ] = useState(false);

    function openFlashcard() {
        setModalIsOpen(true);
    }

    function closeFlashcard() {
        setModalIsOpen(false);
    }

    const [modalIsOpenS, setModalIsOpenS] = useState(false);

    function settingsHandler() {
        setModalIsOpenS(true);
    }
    function backdropClick() {
        setModalIsOpenS(false);
    }

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
                {modalIsOpen && <div className='Flashcard_Open_Body'>
                    <p style={{fontSize: '40px'}} />
                    <h2 className='Flashcard_Open_Title'>{flashcard.title}</h2>
                    <p style={{fontSize: '40px'}} />
                    <p className='Flashcard_Open_Content'>{flashcard.content}</p>
                </div>}
            </div>
            <div onClick={closeFlashcard}>
                {modalIsOpen && <Backdrop/>}
            </div>

            <div>
                {modalIsOpenS && <div className='flashcard-settings-overlay'>
                    <div className='folder-settings-sub'>
                        <p>Edit</p>
                        <p>Delete</p>
                    </div>
                </div>}
            </div>
            <div onClick={backdropClick}>
                {modalIsOpenS && <Backdropfs/>}
            </div>
        </div>
    );
}

export default Flashcard;