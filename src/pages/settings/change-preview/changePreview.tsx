import { useState, useEffect } from 'react';
import './changePreview.css';

function ChangePreview() {

    //this file is used to change the preview of the flashcards once you click on Setting and on the change preview button
    //uses css from changePreview.css

    const [isMouseInside, setIsMouseInside] = useState<boolean>(); //state to check if mouse if over "only Question Preview"

    //states to check what preview mode
    const [isOnlyQuestion, setIsOnlyQuestion] = useState(false);
    const [isBoth, setIsBoth] = useState(false);

    //use Effekt to safe the state in local storage, so that it can be used in topic.js
    useEffect(() => {
        localStorage.setItem('onlyQuestion', JSON.stringify(isOnlyQuestion)); //sets the value of key 'OnlyQuestion' to 'isOnlyQuestion' state
    }, [isOnlyQuestion]);

    useEffect(() => {
        localStorage.setItem('both', JSON.stringify(isBoth)); //sets the value of key 'Both' to 'isBoth' state
    }, [isBoth]);

    function bothVisableEffect() {
        setIsBoth(!isBoth);
        window.location.reload();
    }

    function onlyQuestionEffect() {
        setIsOnlyQuestion(!isOnlyQuestion);
        window.location.reload();
    }

    return (
        <>
            <div className='preview-type-box'>
                <h1 className='preview-type-heading'>CHOOSE PREVIEW TYPE</h1>

                <div className='preview-type-layout'>
                    <div className='preview-type-flashcard'>
                        <div className='preview-type-flashcard-dots'>
                            <div className='big-dot'/>
                            <div className='big-dot'/>
                            <div className='big-dot'/>
                        </div>
                        <h2 style={{ textAlign: 'center', fontSize: '24px' }}>What's the best type of pasta?</h2>
                        <p style={{ marginTop: '30px', textAlign: 'center' }}>The ones shaped like wheels!</p>
                        <button className='preview-type-button' onClick={() => bothVisableEffect()}
                            onMouseEnter={() => setIsMouseInside(false)}>BOTH VISIBLE</button>
                    </div>

                    <div className='preview-type-flashcard'
                        onMouseEnter={() => setIsMouseInside(true)} onMouseLeave={() => setIsMouseInside(false)}>
                        <div className='preview-type-flashcard-dots'>
                            <div className='big-dot'/>
                            <div className='big-dot'/>
                            <div className='big-dot'/>
                        </div>
                        <h2 style={{ textAlign: 'center', fontSize: '24px' }}>What's the best type of pasta?</h2>
                        {isMouseInside ? <p style={{ marginTop: '30px', textAlign: 'center' }}>The ones shaped like wheels!</p> : <p style={{ marginTop: '30px', textAlign: 'center', opacity: '0' }}>The ones shaped like wheels!</p>}
                        <button className='preview-type-button' onClick={() => onlyQuestionEffect()}
                            onMouseEnter={() => setIsMouseInside(false)}>QUESTION VISIBLE</button>
                    </div>
                </div>
                <div style={{position: 'relative', height: '10px', width: '100%'}}/>
            </div>
        </>
    );
}

export default ChangePreview;