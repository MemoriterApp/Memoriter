import React from 'react';
import { useState } from 'react';

const AddFlashcardForm = ({ onAddFlashcard }) => {

    const [title, setTitle] = useState('')

    const [content, setContent] = useState('')

    const onSubmitFlashcard = (changeContent) => {
        changeContent.preventDefault()
        onAddFlashcard({ title, content })
    }

    return (
        <form className='Flashcard_Open_Body' onSubmit={onSubmitFlashcard}>
            <div>
                <h2 className='Add_Flashcard_Form_Header'>Create New Flashcard</h2>
                <p style={{fontSize: '30px'}} />
                <textarea rows='2' className='Add_Flashcard_Form_Title' placeholder='Flashcard Title...' maxLength='100'
                    value={title} onChange={(changeContent) => setTitle(changeContent.target.value)} />
                <p style={{fontSize: '20px'}} />
                <textarea className='Add_Flashcard_Form_Content' placeholder='Flashcard Content...'
                    value={content} onChange={(changeContent) => setContent(changeContent.target.value)} />
            </div>
            <input className='Add_Flashcard_Form_Submit' type='submit' value='Done' />
        </form>
    );
}

export default AddFlashcardForm;