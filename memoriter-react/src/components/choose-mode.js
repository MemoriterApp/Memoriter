import { useNavigate, } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ChooseMode() {

    const navigate = useNavigate();

    const [isMouseInside, setIsMouseInside] = useState(); //state to check if mouse if over "only Question Preview"

    //states to check what preview mode
    const [isOnlyQuestion, setIsOnlyQuestion] = useState(false);
    const [isBoth, setIsBoth] = useState(false)

    //use Effekt to safe the state in local storage, so that it can be used in topic.js
    useEffect(() => {
        localStorage.setItem('onlyQuestion', JSON.stringify(isOnlyQuestion)); //sets the value of key 'OnlyQuestion' to 'isOnlyQuestion' state
    }, [isOnlyQuestion]);

    useEffect(() => {
        localStorage.setItem('both', JSON.stringify(isBoth)); //sets the value of key 'Both' to 'isBoth' state
    }, [isBoth]);

    function bothVisableEffect() {
        setIsBoth(!isBoth)
        window.location.reload()
    }

    function onlyQuestionEffect() {
        setIsOnlyQuestion(!isOnlyQuestion)
        window.location.reload()
    }

    return (
        <>
            {/*<div className='study-now' onClick={() => navigate('/study')}>
                    <p className='study-now-text'>regular study mode</p>
            </div>
            <div className='study-now' onClick={() => navigate('/spaced-rep-mode')}>
                    <p className='study-now-text'>spaced repition</p>
            </div>*/}

            <div className='preview-type-box'>
                <h1 className='preview-type-heading'>CHOOSE A STUDY MODE</h1>
                
                <div className='preview-type-layout'>
                    <div className='preview-type-flashcard'>
                        <div className='preview-type-flashcard-dots'>
                            <div className='big-dot'/>
                            <div className='big-dot'/>
                            <div className='big-dot'/>
                        </div>
                        <h2 style={{ textAlign: 'center', fontSize: '24px' }}>Regular flashcards</h2>
                        <p style={{ marginTop: '30px', textAlign: "center" }}>Practice all of your flashcards, with question and anwser.</p>
                        <button className="preview-type-button" onClick={() => navigate('/study')}
                        onMouseEnter={() => setIsMouseInside(false)}>FLASHCARDS</button>
                    </div>

                    <div className='preview-type-flashcard'
                        onMouseEnter={() => setIsMouseInside(true)} onMouseLeave={() => setIsMouseInside(false)}>
                        <div className='preview-type-flashcard-dots'>
                            <div className='big-dot'/>
                            <div className='big-dot'/>
                            <div className='big-dot'/>
                        </div>
                        <h2 style={{ textAlign: 'center', fontSize: '24px' }}>Spaced repetition</h2>
                         <p style={{ marginTop: '30px', textAlign: "center" }}>Practice your flashcards in intervals and remeber everything.</p>
                        <button style={{bottom: '30px'}} className="preview-type-button" onClick={() => navigate('/spaced-rep-mode')}
                        onMouseEnter={() => setIsMouseInside(false)}>SPACED REP.</button>
                    </div>
                </div>
                <div style={{position: 'relative', height: '10px', width: '100%'}}/>
            </div>
        </>
        
    )
}
export default ChooseMode;