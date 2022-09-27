import { useState } from "react";


function ChangePreview() {

    const [isMouseInside, setIsMouseInside] = useState();

    return (
        <>
            <div className='preview-type-box'>
                <h1 className='study-now-text' style={{color:"white", fontSize:"35px", top:"20px"}}>CHOOSE PREVIEW TYPE</h1>

                <div style={{position:"absolute", left:"20%"}}>
                    <div className='study-flashcard-dots'>
                        <div className='big-dot'/>
                        <div className='big-dot'/>
                        <div className='big-dot'/>
                    </div>
                    <div className='study-flashcard-box-border' style={{height:"40vh", width:"25vh"}}></div>
                    <div className='study-flashcard-box' style={{height:"40vh", width:"25vh"}}>
                        <h2 style={{ textAlign: 'center' }}>What's the best type of pasta?</h2>
                         <div>
                            <article style={{ marginTop: '30px', textAlign: "center" }}>The ones shaped like wheels!</article>
                        </div>
                    </div>

                    <button className="preview-type-button">BOTH VISIBLE</button>
                </div>

                <div style={{position:"absolute", left:"70%"}}>
                    <div className='study-flashcard-dots'>
                        <div className='big-dot'/>
                        <div className='big-dot'/>
                        <div className='big-dot'/>
                    </div>
                    <div className='study-flashcard-box-border' style={{height:"40vh", width:"25vh"}}></div>
                    <div className='study-flashcard-box' style={{height:"40vh", width:"25vh"}} onMouseEnter={() => setIsMouseInside(true)} onMouseLeave={() => setIsMouseInside(false)}>
                        <h2 style={{ textAlign: 'center' }}>What's the best type of pasta?</h2>

                         <div>
                            {isMouseInside ? <article style={{ marginTop: '30px', textAlign: "center" }}>The ones shaped like wheels!</article>: null }
                        </div>

                    </div>

                    <button className="preview-type-button">QUESTION VISIBLE</button>
                </div>

            </div>
        </>
    )
}

export default ChangePreview;