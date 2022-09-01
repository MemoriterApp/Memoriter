import { useState } from 'react';
import parse from 'html-react-parser';

const FlashcardStudy = ({ flashcard, onIncorrect, onCorrect }) => {

    const [showAnswer, setShowAnswer] = useState(false);

    return (
        <div className='study-flashcard-box'>

            <h2 style={{textAlign: 'center'}}>{flashcard.title}</h2>
            
            {showAnswer || <button 
                style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', fontSize: '20px'}}
                onClick={() => setShowAnswer(true)}
            >Show Answer</button>}

            {showAnswer && <div>
                <article style={{marginTop: '30px'}}>{parse(flashcard.content)}</article>

                <button
                    style={{position: 'absolute', left: '80px', bottom: '50px', fontSize: '20px'}}
                    onClick={() => {setShowAnswer(false); onIncorrect(flashcard);}}
                >Incorrect</button>

                <button
                    style={{position: 'absolute', right: '80px', bottom: '50px', fontSize: '20px'}}
                    onClick={() => {setShowAnswer(false); onCorrect(flashcard.id);}}
                >Correct</button>
            </div>}

        </div>
    );
}

export default FlashcardStudy;