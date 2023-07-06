import { useNavigate } from 'react-router';
import './nothing-to-study.css';

function NothingToStudy() {

    const navigate = useNavigate();

    const nextDueDate = localStorage.getItem('nextDueDate');

    return (
        <>
            <div className='nothing-to-study-box'>
                <h1 className='nothing-to-study-text' style={{ fontSize: '4vh' }}>
                    There are no flashcards to study today
                </h1>
                <p className='nothing-to-study-text'>Next flashcards are due on the {nextDueDate}</p>
            </div>

            <button className='return-button'
                style={{ top: '70%', width: '14vw' }}
                onClick={() => navigate(window.location.pathname.replace('/spaced-repetition/', '/study/'))}>
                Study all flashcards
            </button>

            <button className='return-button'
                style={{ top: '77%', width: '14vw', backgroundColor: 'rgb(126, 128, 134)' }}
                onClick={() => navigate(window.location.pathname.replace('/spaced-repetition/', '/topic/'))}>
                Return to Overview
            </button>
        </>

    );
}

export default NothingToStudy;