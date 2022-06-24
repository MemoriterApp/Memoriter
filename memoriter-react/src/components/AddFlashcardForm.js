import { Editor, EditorState, convertToRaw, RichUtils } from 'draft-js';
import { convertToHTML } from 'draft-convert'
import React from 'react';
import { useState } from 'react';
import './draft.css';

const AddFlashcardForm = ({ onAddFlashcard, syncedFolderID }) => {

    const [title, setTitle] = useState('')

    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    const content = sessionStorage.getItem('flashcard-content');
    const contentObj = sessionStorage.getItem('flashcard-content-obj');

    const [syncedFolder] = useState(syncedFolderID)

    const onSubmitFlashcard = (changeContent) => {
        changeContent.preventDefault()
        onAddFlashcard({ title, content, contentObj, syncedFolder })
    }

    function handleKeyCommand (command) {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    const StyleButton = (props) => {
        let onClickButton = (e) => {
          e.preventDefault();
          props.onToggle(props.style);
        };
        return <button onMouseDown={onClickButton}>{props.label}</button>;
    };

    const INLINE_STYLES = [
        { label: "Bold", style: "BOLD" },
        { label: "Italic", style: "ITALIC" },
        { label: "Underline", style: "UNDERLINE" }
    ];
    
    const InlineStyleControls = (props) => {
        return (
            <div>
                {INLINE_STYLES.map((type) => (
                <StyleButton
                    key={type.label}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
                ))}
            </div>
        );
    };
    const onInlineClick = (e) => {
        let nextState = RichUtils.toggleInlineStyle(editorState, e);
        setEditorState(nextState);
    };

    return (
        <form className='Flashcard_Open_Body' onSubmit={onSubmitFlashcard}>
            <div>
                <h2 className='Add_Flashcard_Form_Header'>Create New Flashcard</h2>
                <p style={{fontSize: '30px'}} />
                <textarea rows='2' className='Add_Flashcard_Form_Title' placeholder='Flashcard Title...' maxLength='100'
                    value={title} onChange={(changeContent) => setTitle(changeContent.target.value)} />
                <p style={{fontSize: '20px'}} />
                
                
                {/*<textarea className='Add_Flashcard_Form_Content' placeholder='Flashcard Content...'
                    value={content} onChange={(changeContent) => setContent(changeContent.target.value)} />*/}
                
                <div className='Add_Flashcard_Form_Content'>
                    <InlineStyleControls onToggle={onInlineClick} />
                    <Editor
                        placeholder='Flashcard Content...'
                        editorState={editorState}
                        onChange={(editorState) => {
                            const contentState = editorState.getCurrentContent();
                            const saveContent = (contentState) => {
                                sessionStorage.setItem('flashcard-content-obj', JSON.stringify(convertToRaw(contentState)));
                                sessionStorage.setItem('flashcard-content', convertToHTML(contentState));
                            };
                            saveContent(contentState);
                            setEditorState(editorState);
                        }}
                        handleKeyCommand={handleKeyCommand}
                    />
                </div>

            
            </div>
                <input className='Add_Flashcard_Form_Submit' type='submit' value='Done' />
                <div className='Add_Flashcard_Form_Submit'
                    style={{border: 'none', marginTop: '0px', left: '5px'}}/>
        </form>
    );
}
export default AddFlashcardForm;