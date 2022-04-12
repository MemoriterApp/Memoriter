import React from 'react';
import { useState } from 'react';
import Backdrop from './backdrop';

const Flashcard = ({ flashcard }) => {

    const [ modalIsOpenC, setModalIsOpenC ] = useState(false);

    function openFlashcard() {
        setModalIsOpenC(true);
    }
    function closeFlashcard() {
        setModalIsOpenC(false);
    }

    return (
        <div className='Flashcard_Body' onClick={openFlashcard}>
            <div className='Flashcard_Rechteck'>
                <h3 className='Flashcard_Title'>{flashcard.title}</h3>
                <p className='Flashcard_Content'>{flashcard.content}</p>
            </div>

            <div>
                {modalIsOpenC && <div className='Flashcard_Open_Body'>
                <p style={{fontSize: '40px'}} />
                <h2 className='Flashcard_Open_Title'>{flashcard.title}</h2>
                <p style={{fontSize: '40px'}} />
                <p className='Flashcard_Open_Content'>{flashcard.content}</p>
                </div>}
            </div>
            <div onClick={closeFlashcard}>
                {modalIsOpenC && <Backdrop/>}
            </div>
        </div>
    );
}

export default Flashcard;