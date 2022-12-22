import { useNavigate, } from 'react-router-dom';
import '../../settings/change-preview/changePreview.css';

function ChooseStudyMode() {

    //uses the css from changePreview.css

    const navigate = useNavigate(); //useNavigate is used to navigate to a different page

    return (
        <>
            <div className='preview-type-box'>
                <h1 className='preview-type-heading'>CHOOSE A STUDY MODE</h1>
                
                <div className='preview-type-layout'>
                    <div className='preview-type-flashcard' style={{boxShadow: '0.25vw 0.75vh 10px var(--color-shadow-flashcard)'}}>
                        <div className='preview-type-flashcard-dots'>
                            <div className='big-dot'/>
                            <div className='big-dot'/>
                            <div className='big-dot'/>
                        </div>
                        <h2 style={{ textAlign: 'center', fontSize: '24px' }}>Regular flashcards</h2>
                        <p style={{ marginTop: '15px', textAlign: "center" }}>Practice all of your flashcards, with questions and answers.</p>
                        <button  style={{backgroundColor:'var(--current-purple)'}} className="preview-type-button" onClick={() => navigate('/study')}>REGULAR FLASHCARDS</button>
                    </div>

                    <div className='preview-type-flashcard' style={{boxShadow: '0.25vw 0.75vh 10px var(--color-shadow-flashcard)'}}>
                        <div className='preview-type-flashcard-dots'>
                            <div className='big-dot'/>
                            <div className='big-dot'/>
                            <div className='big-dot'/>
                        </div>
                        <h2 style={{ textAlign: 'center', fontSize: '24px' }}>Spaced repetition</h2>
                         <p style={{ marginTop: '15px', textAlign: "center" }}>Practice your flashcards in intervals and remember everything.</p>
                        <button style={{bottom: '32px', backgroundColor:'var(--current-blue-dark)'}} className="preview-type-button" onClick={() => navigate('/study-spaced-repetition')}>SPACED REPETITION</button>
                    </div>
                </div>
                <div style={{position: 'relative', height: '10px', width: '100%'}}/>
            </div>
        </>
        
    )
}
export default ChooseStudyMode;