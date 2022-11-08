import Confirm from './confirm'
import Backdrop from './backdrop';
import edit from '../images/edit.svg';
import deleteIcon from '../images/delete.svg';
import alignLeft from '../images/text-align-left.svg';
import alignRight from '../images/text-align-right.svg';
import alignCenter from '../images/text-align-center.svg';
import alignJustify from '../images/text-align-justify.svg';
import { useState } from 'react';
import { Remarkable } from 'remarkable';

const FlashcardStudy = ({ flashcard, onIncorrect, onCorrect, onEditFlashcard, onDeleteFlashcard, onChangeTextAlign }) => {

  const markdown = new Remarkable();

    const [showAnswer, setShowAnswer] = useState(false); //state for showing the answer of the card

    //state for modals
    const [settingsOverlay, setSettingsOverlay] = useState(false);
    const [backdropOpen, setBackdropOpen] = useState(false);
    const [modalIsOpenEdit, setModalIsOpenEdit] = useState(false);
    const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false);

    function deleteFlashcardReq() {
        setSettingsOverlay(false);
        setBackdropOpen(true);
        setModalIsOpenDelete(true);
    };

    function editFlashcardReq() {
        setSettingsOverlay(false);
        setBackdropOpen(true);
        setModalIsOpenEdit(true);
    };

    //Editor Functions
    const [title, setTitle] = useState(flashcard.title)

    const [content, setContent] = useState(flashcard.content);

    return (
        <div>      
            <div className='study-flashcard-box' onClick={() => setShowAnswer(true)}>

                <div className='study-flashcard-dots' onClick={() => setSettingsOverlay(true)}>
                    <div className='big-dot'/>
                    <div className='big-dot'/>
                    <div className='big-dot'/>
                </div>

                <h2 style={{textAlign: 'center'}}>{flashcard.title}</h2>
            
                {showAnswer && <div>
                    <article style={{marginTop: '30px', textAlign: flashcard.textAlign}}
                        dangerouslySetInnerHTML={{__html: markdown.render(flashcard.content).trimEnd()}} /> {/*dangerouslySetInnerHTML parses the formatted html text*/}
                </div>}

                {settingsOverlay && 
                <div className='flashcard-settings-overlay' style={{transform: 'translate(-24px, 16px)'}}>
                <div className='folder-settings-sub'>
                  <p>
                    {flashcard.textAlign === 'left' || (
                      <img
                        className='flashcard-settings-overlay-text-align'
                        src={alignLeft}
                        alt=''
                        onClick={() => onChangeTextAlign(flashcard.id, 'left')}
                      />
                    )}
                    {flashcard.textAlign === 'right' || (
                      <img
                        className='flashcard-settings-overlay-text-align'
                        src={alignRight}
                        alt=''
                        onClick={() => onChangeTextAlign(flashcard.id, 'right')}
                      />
                    )}
                    {flashcard.textAlign === 'center' || (
                      <img
                        className='flashcard-settings-overlay-text-align'
                        src={alignCenter}
                        alt=''
                        onClick={() => onChangeTextAlign(flashcard.id, 'center')}
                      />
                    )}
                    {flashcard.textAlign === 'justify' || (
                      <img
                        className='flashcard-settings-overlay-text-align'
                        src={alignJustify}
                        alt=''
                        onClick={() => onChangeTextAlign(flashcard.id, 'justify')}
                      />
                    )}
                  </p>
                  <p onClick={editFlashcardReq}>
                    <img
                      style={{ height: '1.6rem', marginRight: '0.2rem', marginBottom: '-0.3rem' }}
                      src={edit}
                      alt=''
                    />
                    Edit
                  </p>
                  <p onClick={deleteFlashcardReq} style={{ color: 'var(--current-red)' }}>
                    <img
                      style={{ height: '1.6rem', marginRight: '0.2rem', marginBottom: '-0.3rem' }}
                      src={deleteIcon}
                      alt=''
                    />
                    Delete
                  </p>
                </div>
              </div>}
                <div onClick={() => setSettingsOverlay(false)}>
                    {settingsOverlay && <Backdrop/>}
                </div>


            </div>

            {showAnswer && <div>
                <div className='flex-container'>
                    <button
                        style={{ backgroundColor: 'var(--current-red)', marginRight: "40px" }}
                        className='correct-incorrect-button'
                        onClick={() => { setShowAnswer(false); onIncorrect(flashcard); }}
                    >Incorrect</button>
                    <button
                        style={{ backgroundColor: 'var(--current-green)' }}
                        className='correct-incorrect-button'
                        onClick={() => { setShowAnswer(false); onCorrect(flashcard.id); }}
                    >Correct</button>
                </div>
            </div>}

            <div>
                {modalIsOpenEdit && <form className='Edit_Flashcard_Open_Body'>
                    <div>
                        <h2 className='Add_Flashcard_Form_Header'>Edit Flashcard</h2>
                        <p style={{fontSize: '30px'}} />
                        <textarea rows='2' className='Add_Flashcard_Form_Title' placeholder='Flashcard Title...' maxLength='100'
                            value={title} onChange={(changeTitle) => setTitle(changeTitle.target.value)} />
                        <p style={{fontSize: '20px'}} />
                        
                        
                        <textarea
                className='flashcard-form-content'
                placeholder='Flashcard Content...'
                value={content}
                onChange={(changeContent) => setContent(changeContent.target.value)}
              />
                    
                    </div>
                    <input className='Add_Flashcard_Form_Submit' type='submit' value='Done' onClick={
                        () => { onEditFlashcard(flashcard.id, title, content);
                            setModalIsOpenEdit(false); setBackdropOpen(false);}}/>
                </form>}
            </div>

            {modalIsOpenDelete && <Confirm
                title='Do you really want to delete this flashcard?'
                onYesClick={() => onDeleteFlashcard(flashcard.id, flashcard.pos)}
                onNoClick={() => {setModalIsOpenDelete(false); setBackdropOpen(false);}}
            />}

            <div onClick={() => {
                setBackdropOpen(false);
                setModalIsOpenEdit(false);
                setModalIsOpenDelete(false);
            }}>
                {backdropOpen && <Backdrop/>}
            </div>

        </div>
    );
}

export default FlashcardStudy;