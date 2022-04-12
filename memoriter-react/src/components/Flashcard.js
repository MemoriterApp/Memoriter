import React from 'react';
import { useState } from 'react';
import Backdrop from './backdrop';

const Flashcard = ({ flashcard }) => {

    const [ modalIsOpen, setModalIsOpen ] = useState(false);

    function openFlashcard() {
        setModalIsOpen(true);
    }

    function closeFlashcard() {
        setModalIsOpen(false);
    }

    return (
        <div className='Flashcard_Body' onClick={openFlashcard}>
            <div className='Flashcard_Rechteck'>
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
        </div>
    );
}

export default Flashcard;