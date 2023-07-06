import './open-flashcard-settings.css';
import edit from '../../../images/edit.svg';
import deleteIcon from '../../../images/delete-red.svg';
import alignLeft from '../../../images/text-align-left.svg';
import alignRight from '../../../images/text-align-right.svg';
import alignCenter from '../../../images/text-align-center.svg';
import alignJustify from '../../../images/text-align-justify.svg';
import BackdropOpenFlashcard from '../../backdrops/backdrop-open-flashcard/backdropOpenFlashcard';

const OpenFlashcardSettings = ({
    onChangeTextAlign,
    flashcard,
    onCancel,
    onEdit,
    onDelete }:
    {
        onChangeTextAlign: any,
        flashcard: any,
        onCancel: any,
        onEdit: any,
        onDelete: any,
    }) => {
    return (
        <>
            <div className='flashcard-open-settings-overlay-position-field'>
                <div
                    className='flashcard-open-settings-overlay-position-field-click'
                    onClick={onCancel}
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
                        <p onClick={onEdit}>
                            <img
                                style={{ height: '1.6rem', marginRight: '0.2rem', marginBottom: '-0.3rem' }}
                                src={edit}
                                alt=''
                            />
                            Edit
                        </p>
                        <p onClick={onDelete} style={{ color: 'var(--current-red)', filter: 'none' }}>
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
            <BackdropOpenFlashcard onClick={onCancel} />
        </>
    );
};
export default OpenFlashcardSettings;