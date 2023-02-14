import Confirm from '../../../../components/confirm/confirm';
import Backdrop from '../../../../components/backdrops/backdrop/backdrop';
import edit from '../../../../images/edit.svg';
import deleteIcon from '../../../../images/delete.svg';
import alignLeft from '../../../../images/text-align-left.svg';
import alignRight from '../../../../images/text-align-right.svg';
import alignCenter from '../../../../images/text-align-center.svg';
import alignJustify from '../../../../images/text-align-justify.svg';
import { useState } from 'react';
import marked from 'marked';
import FlashcardForm from '../../../topic-stuff/form/flashcard-form';
import './flashcard-spaced-rep.css';

const FlashcardSpacedRep = ({
    flashcard,
    onAnswer,
    onEditFlashcard,
    onDeleteFlashcard,
    onChangeTextAlign,
}: {
    flashcard: any,
    onAnswer: any,
    onEditFlashcard: any,
    onDeleteFlashcard: any,
    onChangeTextAlign: any,
}) => {

    const [showAnswer, setShowAnswer] = useState(false); //state for showing the answer of the card

    //state for modals
    const [settingsOverlay, setSettingsOverlay] = useState(false);
    const [modalIsOpenEdit, setModalIsOpenEdit] = useState(false);
    const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false);

    function deleteFlashcardReq() {
        setSettingsOverlay(false);
        setModalIsOpenDelete(true);
    }

    function editFlashcardReq() {
        setSettingsOverlay(false);
        setModalIsOpenEdit(true);
    }

    return (
        <div>
            <div className='study-flashcard-box' onClick={() => setShowAnswer(true)}>
                <div className='study-flashcard-dots' onClick={() => setSettingsOverlay(true)}>
                    <div className='big-dot' />
                    <div className='big-dot' />
                    <div className='big-dot' />
                </div>

                <h2 style={{ textAlign: 'center', cursor: 'auto' }}>{flashcard.title}</h2>

                {showAnswer && (
                    <div style={{ cursor: 'auto' }}>
                        <article
                            style={{ marginTop: '30px', textAlign: flashcard.textAlign }}
                            dangerouslySetInnerHTML={{ __html: marked.parse(flashcard.content).trimEnd().replace(/(\r\n|\n|\r)/gm, '') }}
                        />
                        {/*dangerouslySetInnerHTML parses the formatted html text*/}
                    </div>
                )}

                {settingsOverlay &&
                    <>
                        <div className='flashcard-settings-overlay'
                            style={{ transform: 'translate(-24px, 16px)' }}>
                            <div className='folder-settings-sub'>
                                <p>
                                    {flashcard.textAlign === 'left' || (
                                        <img
                                            className='flashcard-settings-overlay-text-align'
                                            src={alignLeft}
                                            alt=''
                                            onClick={() => onChangeTextAlign(flashcard._id, 'left')}
                                        />
                                    )}
                                    {flashcard.textAlign === 'right' || (
                                        <img
                                            className='flashcard-settings-overlay-text-align'
                                            src={alignRight}
                                            alt=''
                                            onClick={() => onChangeTextAlign(flashcard._id, 'right')}
                                        />
                                    )}
                                    {flashcard.textAlign === 'center' || (
                                        <img
                                            className='flashcard-settings-overlay-text-align'
                                            src={alignCenter}
                                            alt=''
                                            onClick={() => onChangeTextAlign(flashcard._id, 'center')}
                                        />
                                    )}
                                    {flashcard.textAlign === 'justify' || (
                                        <img
                                            className='flashcard-settings-overlay-text-align'
                                            src={alignJustify}
                                            alt=''
                                            onClick={() => onChangeTextAlign(flashcard._id, 'justify')}
                                        />
                                    )}
                                </p>
                                <p onClick={editFlashcardReq}>
                                    <img
                                        className='icon-settings'
                                        src={edit}
                                        alt=''
                                    />
                                Edit
                                </p>
                                <p onClick={deleteFlashcardReq} style={{ color: 'var(--current-red)', filter: 'none' }}>
                                    <img
                                        className='icon-settings'
                                        src={deleteIcon}
                                        alt=''
                                    />
                                Delete
                                </p>
                            </div>
                        </div>
                        <Backdrop onClick={() => setSettingsOverlay(false)} />
                    </>
                }
            </div>
            {showAnswer && (
                <div>
                    <div className='flex-container'>
                        <button
                            className='spaced-rep-button'
                            style={{background: '#24BD4A'}}
                            onClick={() => {
                                setShowAnswer(false);
                                onAnswer(flashcard, 4, flashcard.streak, flashcard.easiness, flashcard.interval);
                            }}
                        >
                        easy
                        </button>
                        <button
                            className='spaced-rep-button'
                            style={{background: '#6BC549'}}
                            onClick={() => {
                                setShowAnswer(false);
                                onAnswer(flashcard, 3, flashcard.streak, flashcard.easiness, flashcard.interval);
                            }}
                        >
                        correct
                        </button>
                        <button
                            className='spaced-rep-button'
                            style={{ background: '#CDD147'}}
                            onClick={() => {
                                setShowAnswer(false);
                                onAnswer(flashcard, 2, flashcard.streak, flashcard.easiness, flashcard.interval);
                            }}
                        >
                        mostly correct
                        </button>
                        <button
                            className='spaced-rep-button'
                            style={{background: '#BC6825'}}
                            onClick={() => {
                                setShowAnswer(false);
                                onAnswer(flashcard, 1, flashcard.streak, flashcard.easiness, flashcard.interval);
                            }}
                        >
                        almost correct
                        </button>
                        <button
                            className='spaced-rep-button'
                            style={{background: '#B1220F'}}
                            onClick={() => {
                                setShowAnswer(false);
                                onAnswer(flashcard, 0, flashcard.streak, flashcard.easiness, flashcard.interval);
                            }}
                        >
                        incorrect
                        </button>
                        {/*<div className='clr'></div>*/}
                    </div>
                </div>
            )}

            {modalIsOpenEdit && <FlashcardForm
                type='Edit'
                flashcard={flashcard}
                onCancel={() => setModalIsOpenEdit(false)}
                onConfirm={(title: any, content: any) => { onEditFlashcard(flashcard._id, title, content); setModalIsOpenEdit(false);}}
                folderID={undefined}
            />}

            {modalIsOpenDelete && (
                <Confirm
                    title='Do you really want to delete this flashcard?'
                    onConfirm={() => onDeleteFlashcard(flashcard._id, flashcard.pos)}
                    onCancel={() => {
                        setModalIsOpenDelete(false);
                    }}
                />
            )}

            <div
                onClick={() => {
                    setModalIsOpenEdit(false);
                    setModalIsOpenDelete(false);
                }}
            >
            </div>
        </div>
    );
};

export default FlashcardSpacedRep;
