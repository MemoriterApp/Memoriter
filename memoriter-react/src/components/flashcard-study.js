import Backdropfs from './backdropfs';
import { useState } from 'react';
import parse from 'html-react-parser';

const FlashcardStudy = ({ flashcard, onIncorrect, onCorrect }) => {

    const [showAnswer, setShowAnswer] = useState(false);

    const [settingsOverlay, setSettingsOverlay] = useState(false);

    return (
        <div>
            <div className='study-flashcard-box'>
                <h2 style={{textAlign: 'center'}}>{flashcard.title}</h2>
                <div className='study-flashcard-dots' onClick={() => setSettingsOverlay(true)}>
                    <div className='big-dot'/>
                    <div className='big-dot'/>
                    <div className='big-dot'/>
                </div>
            
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

            {settingsOverlay && <div className='study-flashcard-settings-overlay'>
                <div className='folder-settings-sub'>
                    <p>Text Align:<br/>
                        {<span style={{color: flashcard.textAlignColor}}>{flashcard.textAlignSymbol}</span>} {flashcard.textAlign}</p>
                    <p><span style={{color: 'rgb(48, 158, 228)'}}>🖋</span> Edit</p>
                    <p style={{color: 'rgb(228, 48, 48)'}}>✕ Delete</p>
                </div>
            </div>}
            
            <div onClick={() => setSettingsOverlay(false)}>
                {settingsOverlay && <Backdropfs/>}
            </div>

        </div>
    );
}

export default FlashcardStudy;