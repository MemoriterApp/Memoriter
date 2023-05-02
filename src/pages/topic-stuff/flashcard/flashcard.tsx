import { useState, useRef, useEffect } from 'react';
import marked from 'marked';
import FlashcardForm from '../form/flashcard-form';
import Confirm from '../../../components/confirm/confirm';
import Backdrop from '../../../components/backdrops/backdrop/backdrop';
import './flashcard.css';
import * as Type from '../../../types';
import OpenFlashcardSettings from '../../../components/flashcard-settings/open-flashcard/open-flashcard-settings';
import ClosedFlashcardSettings from '../../../components/flashcard-settings/closed-flashcard/closed-flashcard-settings';

const Flashcard = ({
    flashcard,
    type,
    onPosLeft,
    onPosRight,
    flashcardCount,
    onDeleteFlashcard,
    onEditFlashcard,
    onOpenFlashcard,
    onCloseFlashcard,
    onNextFlashcard,
    onPrevFlashcard,
    openFlashcardView,
    onPosAdjust,
    onChangeTextAlign,
}: {
    flashcard: Type.Flashcard,
    type?: String,
    onPosLeft: any,
    onPosRight: any,
    flashcardCount: any,
    onDeleteFlashcard: any,
    onEditFlashcard: any,
    onOpenFlashcard: any,
    onCloseFlashcard: any,
    onNextFlashcard: any,
    onPrevFlashcard: any,
    openFlashcardView: any,
    onPosAdjust: any,
    onChangeTextAlign: any,
}) => {
    const refHeight = useRef(null); //reference to html id to get the height of the inner flashcard rectangle
    const [flashcardHeight, setFlashcardHeight] = useState(0); //height of the inner flashcard rectangle
    const [maxHeightGradient, setMaxHeightGradient] = useState('');

    const refContentHeight = useRef(null);
    const refTitleHeight = useRef(null);

    useEffect(() => {
        //sets the height of the flashcard on component render
        setFlashcardHeight(refHeight.current.clientHeight);
        if (
            refHeight.current.clientHeight >= 290 &&
            refTitleHeight.current.clientHeight + refContentHeight.current.clientHeight > 260
        ) {
            //checks if the flashcard has its max height and applies bottom text fade out gradient
            setMaxHeightGradient('flashcard-rechteck-gradient');
        } else {
            setMaxHeightGradient('');
        }
    }, [onEditFlashcard]); // always triggered when the flashcard is edited

    const [flashcardIsOpen, setFlashcardIsOpen] = useState(false);
    const [flashcardIsOpenSettings, setFlashcardIsOpenSettings] = useState(false);
    const [settingsAreOpen, setSettingsAreOpen] = useState(false);
    const [deletingIsOpen, setDeletingIsOpen] = useState(false);
    const [editingIsOpen, setEditingIsOpen] = useState(false);

    function closeFlashcard() {
        onCloseFlashcard();
        setFlashcardIsOpenSettings(false);
    }

    if (openFlashcardView === flashcard.pos) {
        if (flashcardIsOpen === false) {
            setFlashcardIsOpen(true);
        }
    } else {
        if (flashcardIsOpen === true) {
            setFlashcardIsOpen(false);
        }
    }

    function deleteFlashcardReq() {
        setDeletingIsOpen(true);
        setSettingsAreOpen(false);
        setFlashcardIsOpenSettings(false);
    }

    function editFlashcardReq() {
        setEditingIsOpen(true);
        setSettingsAreOpen(false);
        setFlashcardIsOpenSettings(false);
    }

    const [pos, setPos] = useState(flashcard.pos);

    if (flashcard.pos !== pos) {
        setPos(flashcard.pos);
    }

    const newPosId = sessionStorage.getItem('newPosFlashcard');
    const newPosIdDelete = sessionStorage.getItem('newPosFlashcard' + flashcard._id);

    if (newPosId === flashcard._id) {
        onPosAdjust(flashcard._id, flashcard.pos);
        sessionStorage.removeItem('newPosFlashcard');
    } else if (newPosIdDelete === flashcard._id) {
        onPosAdjust(flashcard._id, flashcard.pos);
        sessionStorage.removeItem('newPosFlashcard' + flashcard._id);
    }

    const [isMouseInside, setIsMouseInside] = useState<boolean>(); //state to check if mouse hover over flashcard

    return (
        <div className='flashcard-body' style={{ height: `calc(${flashcardHeight}px + 35px)`, boxShadow: '0.25vw 0.75vh 10px var(--color-shadow-flashcard)' }}>
            {/*height is set by the useEffect based on the inner rectangle height*/}
            <div className='flashcard-settings-bar'>
                <div className='flashcard-settings' onClick={() => setSettingsAreOpen(true)}>
                    <span className='dot' />
                    <span className='dot' />
                    <span className='dot' />
                </div>
                <div
                    className='flashcard-pos-body-left'
                    onClick={() => {
                        if (pos > 1) {
                            setPos(pos - 1);
                            onPosLeft(flashcard._id, pos);
                        }
                    }}
                >
                    <div className='flashcard-pos-arrow-left' />
                </div>
                <div
                    className='flashcard-pos-body-right'
                    onClick={() => {
                        if (pos < flashcardCount) {
                            setPos(pos + 1);
                            onPosRight(flashcard._id, pos);
                        }
                    }}
                >
                    <div className='flashcard-pos-arrow-right' />
                </div>
            </div>
            <div
                className={`flashcard-rechteck ${maxHeightGradient}`}
                ref={refHeight}
                onClick={() => onOpenFlashcard(flashcard.pos)}
                onMouseEnter={() => setIsMouseInside(true)}
                onMouseLeave={() => setIsMouseInside(false)}
            >
                <h3 className='flashcard-title' ref={refTitleHeight}>
                    {flashcard.title}
                </h3>
                <div
                    className='flashcard-content'
                    style={{ textAlign: flashcard.textAlign as any, opacity: (type === 'only-question' && !isMouseInside) ? '0' : '1' }}
                    ref={refContentHeight}
                    dangerouslySetInnerHTML={{ __html: marked.parse(flashcard.content).trimEnd().replace(/(\r\n|\n|\r)/gm, '') }}
                />
                {/*dangerouslySetInnerHTML parses the formatted html text*/}
            </div>
            {flashcardIsOpen && (
                <div>
                    <div className='flashcard-switch-arrows'>
                        <div className='next-flashcard' onClick={() => onNextFlashcard(flashcard.pos)} />
                        <div className='prev-flashcard' onClick={() => onPrevFlashcard(flashcard.pos)} />
                    </div>
                    <div className='flashcard-open-body'>
                        <div className='flashcard-open-settings' onClick={() => setFlashcardIsOpenSettings(true)}>
                            <span className='big-dot' />
                            <span className='big-dot' />
                            <span className='big-dot' />    
                        </div>
                        <p style={{ fontSize: '40px' }} />
                        <h2 className='flashcard-open-title'>{flashcard.title}</h2>
                        <p style={{ fontSize: '40px' }} />
                        <div
                            className='flashcard-open-content'
                            style={{ textAlign: flashcard.textAlign as any }}
                            dangerouslySetInnerHTML={{ __html: marked.parse(flashcard.content).trimEnd().replace(/(\r\n|\n|\r)/gm, '') }}
                        />
                        {/*dangerouslySetInnerHTML parses the formatted html text*/}
                    </div>
                    <Backdrop onClick={closeFlashcard} />
                </div>
            )}
            {flashcardIsOpenSettings && (
                <OpenFlashcardSettings
                    flashcard={flashcard}
                    onChangeTextAlign={onChangeTextAlign}
                    onCancel={() => setFlashcardIsOpenSettings(false)}
                    onEdit={editFlashcardReq} onDelete={deleteFlashcardReq} />
            )}
            {settingsAreOpen && (
                <ClosedFlashcardSettings
                    flashcard={flashcard}
                    onChangeTextAlign={onChangeTextAlign}
                    onCancel={() => setSettingsAreOpen(false)}
                    onEdit={editFlashcardReq}
                    onDelete={deleteFlashcardReq} />
            )}
            {editingIsOpen && <FlashcardForm
                type='Edit'
                flashcard={flashcard}
                onCancel={() => setEditingIsOpen(false)}
                onConfirm={(title: any, content: any) => { onEditFlashcard(flashcard._id, title, content); setEditingIsOpen(false); }}
                folderID={undefined}
            />}
            {deletingIsOpen && (
                <Confirm
                    title='Do you really want to delete this flashcard?'
                    onConfirm={() => onDeleteFlashcard(flashcard._id, flashcard.pos)}
                    onCancel={() => setDeletingIsOpen(false)}
                />
            )}
        </div>
    );
};

export default Flashcard;