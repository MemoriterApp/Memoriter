import React from 'react';

const Flashcard = ({ flashcard }) => {
    return (
        <div className='Flashcard_Body'>
            <div className='Flashcard_Rechteck'>
                <h3 className='Flashcard_Title'>{flashcard.title}</h3>
                <p className='Flashcard_Content'>{flashcard.content}</p>
            </div>
        </div>
    );
}

export default Flashcard;