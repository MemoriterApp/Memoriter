import { useState, useRef, useEffect } from 'react';
import marked from 'marked';
import edit from '../../../images/edit.svg';
import deleteIcon from '../../../images/delete.svg';
import alignLeft from '../../../images/text-align-left.svg';
import alignRight from '../../../images/text-align-right.svg';
import alignCenter from '../../../images/text-align-center.svg';
import alignJustify from '../../../images/text-align-justify.svg';
import FlashcardForm from '../form/flashcard-form';
import Confirm from '../../../components/confirm/confirm';
import Backdrop from '../../../components/backdrops/backdrop/backdrop';
import BackdropOpenFlashcard from '../../../components/backdrops/backdrop-open-flashcard/backdropOpenFlashcard';
import BackdropTransparent from '../../../components/backdrops/backdrop-transparent/backdrop-transparent';
import './flashcard.css';
import * as Type from '../../../types';

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
    }, []);

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

    function backdropClickOpen() {
        setFlashcardIsOpenSettings(false);
        setEditingIsOpen(false);
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
                        <div className='close-flashcard-button' onClick={closeFlashcard}>
                            <div className='close-flashcard-arrow' />
                        </div>
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
                <>
                    <div className='flashcard-open-settings-overlay-position-field'>
                        <div
                            className='flashcard-open-settings-overlay-position-field-click'
                            onClick={backdropClickOpen}
                        />
                        <div className='flashcard-settings-overlay'>
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
                                        style={{ height: '1.6rem', marginRight: '0.2rem', marginBottom: '-0.3rem' }}
                                        src={edit}
                                        alt=''
                                    />
                                    Edit
                                </p>
                                <p onClick={deleteFlashcardReq} style={{ color: 'var(--current-red)', filter: 'none' }}>
                                    <img
                                        style={{ height: '1.6rem', marginRight: '0.2rem', marginBottom: '-0.3rem' }}
                                        src={deleteIcon}
                                        alt=''
                                    />
                                    Delete
                                </p>
                            </div>
                        </div>
                    </div>
                    <BackdropOpenFlashcard onClick={backdropClickOpen} />
                </>
            )}
            {settingsAreOpen && (
                <>
                    <div className='flashcard-settings-overlay'>
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
                                    style={{ height: '1.6rem', marginRight: '0.2rem', marginBottom: '-0.3rem' }}
                                    src={edit}
                                    alt=''
                                />{' '}
                                Edit
                            </p>
                            <p onClick={deleteFlashcardReq} style={{ color: 'var(--current-red)', filter: 'none' }}>
                                <img
                                    style={{ height: '1.6rem', marginRight: '0.2rem', marginBottom: '-0.3rem' }}
                                    src={deleteIcon}
                                    alt=''
                                />{' '}
                                Delete
                            </p>
                        </div>
                    </div>
                    <BackdropTransparent onClick={() => setSettingsAreOpen(false)} />
                </>
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