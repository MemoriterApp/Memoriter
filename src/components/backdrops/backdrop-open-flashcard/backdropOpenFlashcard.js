import React from 'react';
import './backdrop-open-flashcard.css'

function BackdropOpenFlashcard(props) {
    return (
        <div className='backdrop-open-flashcard' onClick={props.onClick} >
        </div>
    );
}

export default BackdropOpenFlashcard;