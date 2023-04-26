import { FormEvent, useState, useEffect, useRef } from 'react';
import Backdrop from '../../../components/backdrops/backdrop/backdrop';
import { Flashcard } from '../../../types';
import { getFlashcardSuggestion } from '../../../technical/utils/mongo';
import './flashcard-form.css';
import sparkles from '../../../images/icons/sparkles.svg'

const FlashcardForm = ({ type, flashcard, folderID, onConfirm, onCancel }: { type: String, flashcard?: Flashcard, folderID: String, onConfirm: any, onCancel?: any }) => {

    const [title, setTitle] = useState<string>(flashcard ? flashcard.title : ''); // flashcard title
    const [content, setContent] = useState<string>(flashcard ? flashcard.content : ''); // flashcard content

    // folder of the flashcard
    const [folder] = useState(folderID);

    // function to apply the input value as folder name
    const onSubmitFlashcard = (event: FormEvent) => {
        event.preventDefault();
        onConfirm(title, content, folder);
    };

    const [suggestion, setSuggestion] = useState(''); // content suggestion from AI
    const [isSuggestionOn, setIsSuggestionOn] = useState(false); // whether the suggestion is on or off

  

    // get flashcard suggestion
    const generateSuggestion = async () => {
        try {
            const suggestionResponse = await getFlashcardSuggestion(title);
            console.log(suggestionResponse);
            setSuggestion(suggestionResponse);
        } catch (error) {
            console.error('Error generating suggestion:', error);
            setSuggestion('');
        }
    };


    // useEffect hook to trigger the generateContent function when the component is mounted
    useEffect(() => {
        
        if (isSuggestionOn && title) {
            const timeout = window.setTimeout(() => {
                generateSuggestion();
            }, 1100);
            return () => clearTimeout(timeout);
        }
        else {
            setSuggestion('');
        }
    }, [isSuggestionOn, title]);



    return (
        <>
            <form className='flashcard-open-body' onSubmit={onSubmitFlashcard}>
                <div>
                    <h2 className='add-flashcard-form-header'>{type} Flashcard</h2>
                    <img className='generate-on-off-button'
                        src={sparkles}
                        alt='sparkles'
                        style={{ filter: isSuggestionOn ? 'none' : 'grayscale(100%)' }}
                        onClick={() => setIsSuggestionOn(!isSuggestionOn)}
                    />
                    <p style={{ fontSize: '30px' }} />
                    <textarea
                        rows={2}
                        className='add-flashcard-form-title'
                        placeholder='Flashcard Title...'
                        maxLength={200}
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <p style={{ fontSize: '20px' }} />

                    <textarea
                        className='flashcard-form-content'
                        placeholder={suggestion ? suggestion : 'Flashcard content...'}
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        onKeyDown={(event) => {
                            if (event.key === 'Tab') {
                                event.preventDefault();
                                setContent(suggestion);
                            }
                        }}
                    />
                    <p className='flashcard-form-md'>
                        This editor supports <a href='https://commonmark.org/help/' target='_blank' rel='noreferrer'>Markdown syntax</a>.
                    </p>
                </div>
                <button className='add-flashcard-form-submit' type='submit'>Done</button>
                <div
                    className='add-flashcard-form-submit'
                    style={{ border: 'none', marginTop: '0px', left: '5px', padding: '5px', backgroundColor: 'transparent' }}
                />
            </form>
            <Backdrop onClick={() => onCancel()} />
        </>
    );
};
export default FlashcardForm;