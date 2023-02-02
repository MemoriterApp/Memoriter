import { useNavigate } from 'react-router';
import './finished-view-spaced-rep.css';

function FinishedViewSpacedRep({ studiedFlashcards, incorrectFlashcards }: {studiedFlashcards: any, incorrectFlashcards: any}) {
    const navigate = useNavigate();
    return (
        <div>
            <div className='finished-box'>
                <p className='finished-statistics' style={{ fontSize: '5.3vh' }}>
                    Results
                </p>
                <p className='finished-statistics'>
                    Studied Flashcards: {studiedFlashcards}
                </p>
                <p className='finished-statistics'>
                    Repetitions: {studiedFlashcards + incorrectFlashcards}
                </p>
                <p className='finished-statistics' style={{ color: '#2d772d' }}>
                    Percent Correct: {(100 * (1 - (incorrectFlashcards / (studiedFlashcards + incorrectFlashcards)))).toFixed(2)}%
                </p>
                <p className='finished-statistics' style={{ color: '#dc4c4d' }}>
                    Incorrect: {incorrectFlashcards} ({(100 * (incorrectFlashcards / (studiedFlashcards + incorrectFlashcards))).toFixed(2)}%)
                </p>
            </div>

            <button className='finished-button'
                style={{ top: '70%', width: '14vw' }}
                onClick={() => navigate('/study')}
            >Study all flashcards</button>

            <button className='finished-button'
                style={{ top: '77.5%', width: '14vw', backgroundColor: 'rgb(126, 128, 134)' }}
                onClick={() => navigate('/topic')}
            >Return to Overview</button>
        </div>
    );
}

export default FinishedViewSpacedRep;