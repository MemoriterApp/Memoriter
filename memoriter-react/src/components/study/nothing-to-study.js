import React from 'react';
import { useNavigate } from 'react-router';

//file uses css from spaced-rep.css
function NothingToStudy() {

    const navigate = useNavigate();
    return (
        <>
            <div className='finished-box'>
                <h1 className='finished_statistics' style={{ fontSize: '4vh' }}>
                    There are no flashcards to study today
                </h1>
                <p className='finished_statistics'>Come back tomorrow to study again</p>
            </div>
            <button className='finished-button'
                style={{ top: '77%', width: '14vw', backgroundColor: 'rgb(126, 128, 134)' }}
                onClick={() => navigate('/topic')}
            >Return to Overview</button>
        </>

    );
}

export default NothingToStudy;