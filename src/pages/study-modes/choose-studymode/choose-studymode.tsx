import { useNavigate, } from 'react-router-dom';
import './choose-studymode.css';

function ChooseStudyMode({folderId}: {folderId: string}) {

    //uses the css from changePreview.css

    const navigate = useNavigate(); //useNavigate is used to navigate to a different page

    return (
        <>
            <div className='choose-studymode-box'>
                <h1 className='choose-studymode-heading'>CHOOSE A STUDY MODE</h1>

                <div className='choose-studymode-layout'>
                    <div className='choose-studymode-flashcard' style={{boxShadow: '0.25vw 0.75vh 10px var(--color-shadow-flashcard)'}}>
                        <div className='choose-studymode-flashcard-dots'>
                            <div className='big-dot'/>
                            <div className='big-dot'/>
                            <div className='big-dot'/>
                        </div>
                        <h2 style={{ textAlign: 'center', fontSize: '24px' }}>Regular flashcards</h2>
                        <p style={{ marginTop: '15px', textAlign: 'center' }} onClick={() => navigate(`/study/${folderId}`)}>Practice all of your flashcards, with questions and answers.</p>
                        <button style={{backgroundColor:'#875F95'}} className='choose-studymode-button' onClick={() => navigate(`/study/${folderId}`)}>REGULAR FLASHCARDS</button>
                    </div>

                    <div className='choose-studymode-flashcard' style={{boxShadow: '0.25vw 0.75vh 10px var(--color-shadow-flashcard)'}}>
                        <div className='choose-studymode-flashcard-dots'>
                            <div className='big-dot'/>
                            <div className='big-dot'/>
                            <div className='big-dot'/>
                        </div>
                        <h2 style={{ textAlign: 'center', fontSize: '24px' }}>Spaced repetition</h2>
                        <p style={{ marginTop: '15px', textAlign: 'center' }} onClick={() => navigate(`/spaced-repetition/${folderId}`) }>Practice your flashcards in intervals and remember everything.</p>
                        <button style={{bottom: '32px', backgroundColor:'#7C9B4A'}} className='choose-studymode-button' onClick={() => navigate(`/spaced-repetition/${folderId}`)}>SPACED REPETITION</button>
                    </div>
                </div>
                <div style={{position: 'relative', height: '10px', width: '100%'}}/>
            </div>
        </>

    );
}
export default ChooseStudyMode;