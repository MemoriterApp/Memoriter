import Confirm from './confirm'
import Backdrop from './backdrop';
import Backdropfs from './backdrop-transparent';
import { useState } from 'react';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import { convertFromHTML, convertToHTML } from 'draft-convert';
import { spacedRepetition } from '../utils/spaced-repetition';

const FlashcardSpacedRep = ({ flashcard, onCorrect, onEditFlashcard, onDeleteFlashcard, onChangeTextAlign }) => {

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

    const [editorState, setEditorState] = useState(EditorState.createWithContent(convertFromHTML(flashcard.content)));

    const content = sessionStorage.getItem('flashcard-content');

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
        let className = 'text-editor-button';
          if (props.active) {
            className += ' text-editor-button-active';
            };
        return <div onMouseDown={onClickButton} className={className}
                    style={{fontWeight: props.label, fontStyle: props.label, textDecoration: props.label}}>
                        {props.label}
                </div>;
    };

    const INLINE_STYLES = [
        { label: "Bold", style: "BOLD", highlight: 'red' },
        { label: "Italic", style: "ITALIC" },
        { label: "Underline", style: "UNDERLINE" }
    ];
    
    const InlineStyleControls = (props) => {
        const currentStyle = editorState.getCurrentInlineStyle();
        return (
            <div>
                {INLINE_STYLES.map((type) => (
                <StyleButton
                    key={type.label}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                    active={currentStyle.has(type.style)}
                />
                ))}
            </div>
        );
    };

    const BLOCK_TYPES = [
        { label: "Bulleted List", style: "unordered-list-item" },
        { label: "Numbered List", style: "ordered-list-item" }
      ];
    
      const BlockStyleControls = (props) => {
        const selection = editorState.getSelection();
        const blockType = editorState
          .getCurrentContent()
          .getBlockForKey(selection.getStartKey())
          .getType();
        return (
          <div>
            {BLOCK_TYPES.map((type) => (
              <StyleButton
                key={type.label}
                label={type.label}
                onToggle={props.onToggle}
                style={type.style}
                active={type.style === blockType}
              />
            ))}
          </div>
        );
      };

    const onInlineClick = (e) => {
        let newState = RichUtils.toggleInlineStyle(editorState, e);
        setEditorState(newState);
    };

    const onBlockClick = (e) => {
        let newState = RichUtils.toggleBlockType(editorState, e);
        setEditorState(newState);
    };

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
                        dangerouslySetInnerHTML={{__html: flashcard.content}} /> {/*dangerouslySetInnerHTML parses the formatted html text*/}
                </div>}

                {settingsOverlay && 
                <div className='study-flashcard-settings-overlay'>
                    <div className='folder-settings-sub'>
                        <p onClick={() => onChangeTextAlign(flashcard.id, flashcard.textAlign)}>Text Align:<br/>
                            {<span style={{color: flashcard.textAlignColor}}>{flashcard.textAlignSymbol}</span>} {flashcard.textAlign}</p>
                        <p onClick={editFlashcardReq}><span style={{color: 'rgb(48, 158, 228)'}}>🖋</span> Edit</p>
                        <p style={{color: 'rgb(228, 48, 48)'}}
                            onClick={deleteFlashcardReq}
                        >✕ Delete</p>
                    </div>
                </div>}
                <div onClick={() => setSettingsOverlay(false)}>
                    {settingsOverlay && <Backdropfs/>}
                </div>


            </div>

            {showAnswer && <div>
                <div className='flex-container'>
                    {/*Colors will be reworked in the very near future */}
                    <button className='spaced-rep-button'
                        style={{ left: '28.25%', background:'#0e9c5a'}}
                        onClick={() => {setShowAnswer(false); onCorrect(flashcard.id, 0, flashcard.streak, flashcard.easiness, flashcard.interval); }}>
                        easy 
                    </button>
                    <button className='spaced-rep-button'
                        style={{ left: '42.75%', background:'#1f9c0e'}}
                        onClick={() => {setShowAnswer(false); onCorrect(flashcard.id, 1, flashcard.streak, flashcard.easiness, flashcard.interval); }}>
                        correct
                    </button>
                    <button className='spaced-rep-button'
                        style={{ left: '57.25%', background:'#9c420e', color:'white'}}
                        onClick={() => {setShowAnswer(false); onCorrect(flashcard.id, 2, flashcard.streak, flashcard.easiness, flashcard.interval); }}>
                        almost correct
                    </button>
                    <button className='spaced-rep-button'
                        style={{ left: '71.75%', background:'#9c0e0e', color:'white'}}
                        onClick={() => {setShowAnswer(false); onCorrect(flashcard.id, 3, flashcard.streak, flashcard.easiness, flashcard.interval); }}>
                        incorrect
                    </button>
                    <button className='spaced-rep-button'
                        style={{ left: '80%', background:'#6c5e0e', color:'white'}}
                        onClick={() => {setShowAnswer(false); onCorrect(flashcard.id, 4, flashcard.streak, flashcard.easiness, flashcard.interval); }}>
                        incorrect
                    </button>
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
                        
                        
                        <div className='Add_Flashcard_Form_Content'>
                            <BlockStyleControls onToggle={onBlockClick}/>
                            <InlineStyleControls onToggle={onInlineClick}/>
                            <div style={{width: '100%', borderTop: '2px solid, rgba(112, 112 ,112 ,1)', margin: '10px 0 10px 0'}}/>
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

export default FlashcardSpacedRep;