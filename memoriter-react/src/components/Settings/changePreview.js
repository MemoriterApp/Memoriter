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
                <h1 className='study-now-text' style={{ color: "white", fontSize: "35px", top: "20px" }}>CHOOSE PREVIEW TYPE</h1>

                <div style={{ position: "absolute", left: "20%" }}>

                    <div className='study-flashcard-box-border' style={{ height: "40vh", width: "25vh", marginBlock: "1%" }}></div>
                    <div className='study-flashcard-box' style={{ height: "40vh", width: "25vh" }}>
                        <div className='study-flashcard-dots' style={{ right: "2%", top: "3%" }}>
                            <div className='big-dot' />
                            <div className='big-dot' />
                            <div className='big-dot' />
                        </div>
                        <h2 style={{ textAlign: 'center' }}>What's the best type of pasta?</h2>
                        <div>
                            <article style={{ marginTop: '30px', textAlign: "center" }}>The ones shaped like wheels!</article>
                        </div>
                    </div>

                    <button className="preview-type-button" onClick={()=> bothVisableEffect()}>BOTH VISIBLE</button>
                </div>

                <div style={{ position: "absolute", left: "65%" }}>

                    <div className='study-flashcard-box-border' style={{ height: "40vh", width: "25vh" }}></div>
                    <div className='study-flashcard-box' style={{ height: "40vh", width: "25vh" }} onMouseEnter={() => setIsMouseInside(true)} onMouseLeave={() => setIsMouseInside(false)}>
                        <div className='study-flashcard-dots' style={{ right: "2%", top: "3%" }}>
                            <div className='big-dot' />
                            <div className='big-dot' />
                            <div className='big-dot' />
                        </div>
                        <h2 style={{ textAlign: 'center' }}>What's the best type of pasta?</h2>

                        <div>
                            {isMouseInside ? <article style={{ marginTop: '30px', textAlign: "center" }}>The ones shaped like wheels!</article> : null}
                        </div>

                    </div>

                    <button className="preview-type-button" onClick={() => onlyQuestionEffect()}>QUESTION VISIBLE</button>
                </div>

            </div>
        </>
    )
}

export default ChangePreview;