import React from 'react';

//file uses css from spaced-rep.css
function NothingToStudy() {
    return (
        <div className='finished-box'> 
            <h1 className='finished_statistics' style={{ fontSize: '4vh' }}>
                There are no flashcards to study today
            </h1>
            <p className='finished_statistics'>Come back tomorrow to study again</p>
        </div>
    );
}

export default NothingToStudy;