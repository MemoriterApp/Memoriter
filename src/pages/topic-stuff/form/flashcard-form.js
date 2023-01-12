import React from 'react';
import { Configuration, OpenAIApi } from 'openai';
import { useState, useEffect, useRef} from 'react';
import _ from 'lodash';
import Backdrop from '../../../components/backdrops/backdrop/backdrop';
import './flashcard-form.css';

const FlashcardForm = ({ type, flashcard, syncedFolderID, onConfirm, onCancel }) => {

    const [title, setTitle] = useState(flashcard.title); // flashcard title
    const [content, setContent] = useState(flashcard.content); // flashcard content

    const [syncedFolder] = useState(syncedFolderID); // folder of the flashcard

    // function to apply the input value as folder name
    const onSubmitFlashcard = (event) => {
        event.preventDefault();
        onConfirm(title, content, syncedFolder);
    };

    const configuration = new Configuration({
        // eslint-disable-next-line no-undef
        apiKey: process.env.REACT_APP_API_KEY,
        // eslint-disable-next-line no-undef
        organization: process.env.REACT_APP_ORGANIZATION_KEY,
    });

    const [suggestion, setSuggestion] = useState(''); // content suggestion from AI
    
    const openai = new OpenAIApi(configuration);
    const AiPrompt = `This is a flashcard. The question is: ${title}. The answer is:`;

    const generateSuggestion = async () => {
        try {
            const response = await openai.createCompletion({
                model: 'text-davinci-003',
                prompt: AiPrompt,
                temperature: 0.25,
                //eslint-disable-next-line camelcase
                max_tokens: 512,
            });
            setSuggestion(response.data.choices[0].text);
        } catch (error) {
            console.error(`Oops something went wrong: ${error.response}`);
        }
    };


    const timeout = useRef();
    // useEffect hook to trigger the generateContent function when the component is mounted
    useEffect(() => {
        clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
            generateSuggestion();
        }, 1100);
    }, [title]);

    return (
        <>
            <form className='flashcard-open-body' onSubmit={onSubmitFlashcard}>
                <div>
                    <h2 className='add-flashcard-form-header'>{type} Flashcard</h2>
                    <p style={{ fontSize: '30px' }} />
                    <textarea
                        rows='2'
                        className='add-flashcard-form-title'
                        placeholder='Flashcard Title...'
                        maxLength='100'
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <p style={{ fontSize: '20px' }} />

                    <textarea
                        className='flashcard-form-content'
                        placeholder={suggestion}
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                    />
                    <p className='flashcard-form-md'>
                        This editor supports 
                        <a href='https://commonmark.org/help/' target='_blank' rel='noreferrer'>Markdown syntax</a>.
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