import Backdrop from './backdrop';
import Backdropfs from './backdropfs';
import { useState } from 'react';
import parse from 'html-react-parser';

const FlashcardStudy = ({ flashcard, onIncorrect, onCorrect, onDeleteFlashcard, onChangeTextAlign }) => {

    const [showAnswer, setShowAnswer] = useState(false); //state for showing the answer of the card

    const [settingsOverlay, setSettingsOverlay] = useState(false);

    const [backdropOpen, setBackdropOpen] = useState(false);
    const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false);

    function deleteFlashcardReq() {
        setSettingsOverlay(false);
        setBackdropOpen(true);
        setModalIsOpenDelete(true);
    }

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
                    <article style={{marginTop: '30px', textAlign: flashcard.textAlign}}>{parse(flashcard.content)}</article>
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
                    <p onClick={() => onChangeTextAlign(flashcard.id, flashcard.textAlign)}>Text Align:<br/>
                        {<span style={{color: flashcard.textAlignColor}}>{flashcard.textAlignSymbol}</span>} {flashcard.textAlign}</p>
                    <p><span style={{color: 'rgb(48, 158, 228)'}}>🖋</span> Edit</p>
                    <p style={{color: 'rgb(228, 48, 48)'}}
                        onClick={deleteFlashcardReq}
                    >✕ Delete</p>
                </div>
            </div>}
            
            <div onClick={() => setSettingsOverlay(false)}>
                {settingsOverlay && <Backdropfs/>}
            </div>

            <div>
                {modalIsOpenDelete && <div className='Delete_Folder_Confirm'>
                    <h2 className='Add_folder_Form_Header'>Do you really want to delete this flashcard?</h2>
                    <button className='Delete_Folder_Confirm_Yes' onClick={
                        () => onDeleteFlashcard(flashcard.id, flashcard.pos)
                    }>Yes</button>
                    <div style={{display: 'inline', color: 'transparent', cursor: 'default'}}>====</div>
                    <button className='Delete_Folder_Confirm_No'
                        onClick={() => {setModalIsOpenDelete(false); setBackdropOpen(false);}}>No</button>
                    <p style={{fontSize: '10px'}} />
                 </div>}
            </div>

            <div onClick={() => {
                setBackdropOpen(false);
                setModalIsOpenDelete(false);
            }}>
                {backdropOpen && <Backdrop/>}
            </div>

        </div>
    );
}

export default FlashcardStudy;