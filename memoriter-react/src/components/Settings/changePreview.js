import { useState } from "react";
import { useEffect } from "react";


function ChangePreview() {

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
            <div className='preview-type-box'>
                <h1 className='study-now-text' style={{ color: "white", fontSize: "28px", top: "10px", marginBottom: '40px' }}>CHOOSE PREVIEW TYPE</h1>

                <div className='study-flashcard-box' style={{transform: 'unset', top: '96px', left: '5%', right: 'unset', height: "266px", width: "174px",
                    overflow: 'visible', border: '5px solid var(--color-font-gray)', borderRadius: '8px'}}>
                    <div className='study-flashcard-dots' style={{ right: "4px", top: "-4px" }}>
                        <div className='big-dot' />
                        <div className='big-dot' />
                        <div className='big-dot' />
                    </div>
                    <h2 style={{ textAlign: 'center', fontSize: '24px' }}>What's the best type of pasta?</h2>
                    <p style={{ marginTop: '30px', textAlign: "center" }}>The ones shaped like wheels!</p>
                    <button className="preview-type-button" onClick={() => onlyQuestionEffect()}
                    onMouseEnter={() => setIsMouseInside(false)}>QUESTION VISIBLE</button>
                </div>

                <div className='study-flashcard-box' style={{transform: 'unset', top: '96px', left: 'unset', right: '5%', height: "266px", width: "174px",
                    overflow: 'visible', border: '5px solid var(--color-font-gray)', borderRadius: '8px'}}
                    onMouseEnter={() => setIsMouseInside(true)} onMouseLeave={() => setIsMouseInside(false)}>
                    <div className='study-flashcard-dots' style={{ right: "4px", top: "-4px" }}>
                        <div className='big-dot' />
                        <div className='big-dot' />
                        <div className='big-dot' />
                    </div>
                    <h2 style={{ textAlign: 'center', fontSize: '24px' }}>What's the best type of pasta?</h2>
                    {isMouseInside ? <p style={{ marginTop: '30px', textAlign: "center" }}>The ones shaped like wheels!</p> : null}
                    <button className="preview-type-button" onClick={() => onlyQuestionEffect()}
                    onMouseEnter={() => setIsMouseInside(false)}>QUESTION VISIBLE</button>
                </div>
                <div style={{position: 'relative', top: '400px', height: '10px', width: '100%'}}/>
            </div>
        </>
    )
}

export default ChangePreview;