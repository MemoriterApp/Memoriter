import Logo from './Logo.png';
import Footer from '../components/Footer';
import Backdropfs from '../components/backdropfs';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { firebase } from '../utils/firebase'
import { collection, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore/lite';
import parse from 'html-react-parser';
import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import { convertFromHTML, convertToHTML } from 'draft-convert';
import Backdrop from '../components/backdrop';
const { db } = firebase;

const StudyPage = () => {

    let syncedFolderTitle = localStorage.getItem('syncedFolderTitle');

    let syncedFolderID = localStorage.getItem('syncedFolderID');

    //firestore stuff
    // connection to the flashcards firestore
    const flashcardsCollectionRef = query(collection(db, "flashcards"), where("syncedFolder", "==", syncedFolderID));

    //Flashcard Data
    const [flashcards, setFlashcards] = useState([
        {
            id: '',
            title: '0',
            content: '0'
        }
    ])

    //Use Effect für Notes
    useEffect(() => {
        const getFlashcards = async () => {
            const allFlashcards = await getDocs(flashcardsCollectionRef)
            setFlashcards(allFlashcards.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        };

        getFlashcards();
        localStorage.setItem('lastPage', "/study");
    }, [])

    const [settingsHandlerOpen, setSettingsHandlerOpen] = useState(false);
    const [modalIsOpenE, setModalIsOpenE] = useState(false);

    const [title, setTitle] = useState(flashcards[0].title)

    const [editorState, setEditorState] = useState(EditorState.createWithContent(convertFromHTML(flashcards[0].content)));

    const content = sessionStorage.getItem('flashcard-content');

        //Editor Functions
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
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name='keywords' content='memoriter, study, files, subjects, overview, effective, studying, school, university, flashcards'></meta>
                <meta name='description' content='Flashacrds for Memoriter'></meta>
            </head>

            <body>
                <header className='Page_Header'>
                    {syncedFolderTitle !== '' ? (
                        <h1 className="page_title" >{syncedFolderTitle}</h1>
                    ) : (
                        <h1 className="page_title" >New Folder</h1>
                    )}
                    <Link to='/'>
                        <img className="Logo-oben" src={Logo} alt="site-logo"></img>
                    </Link>
                </header>
                <Link to='/topic'>
                    <div className="Zurückbutton_Body" style={{ top: '90px', left: '8px', zIndex: '10' }}>
                        <div className="Zurückbutton_Arrow" />
                    </div>
                </Link>

                <div className='study-flashcard-box'>
                    <div className='Flashcard_Open_Settings' onClick={() => setSettingsHandlerOpen(true)}>
                        <span className='big-dot'/>
                        <span className='big-dot'/>
                        <span className='big-dot'/>
                    </div>

                    <h2 style={{textAlign: 'center'}}>{flashcards[0].title}</h2>
                    <text style={{textAlign: flashcards[0].textAlign}}>{parse(flashcards[0].content)}</text>

                </div>

                {settingsHandlerOpen && <div>
                    <div className='flashcard-open-settings-overlay' style={{width: '90px', height: '100px', padding: '14px 0 14px 14px', right: 'calc(100vh / 3 * 2 + 96px)', top: '108px'}}>
                        <div className='folder-settings-sub'>
                            <p>Text Align:<br/>
                                {<span style={{color: flashcards[0].textAlignColor}}>{flashcards[0].textAlignSymbol}</span>} {flashcards[0].textAlign}</p>
                            <p onClick={() => setModalIsOpenE(true)}><span style={{color: 'rgb(48, 158, 228)'}}>🖋</span> Edit</p>
                            <p style={{color: 'rgb(228, 48, 48)'}}>✕ Delete</p>
                        </div>
                    </div>
                    
                    <div onClick={() => {setSettingsHandlerOpen(false);}}>
                        <Backdropfs onClick={() => {
                            setSettingsHandlerOpen(false);
                        }}/>
                    </div>
                </div>}

                {modalIsOpenE && <form className='Edit_Flashcard_Open_Body'>
                    <div>
                        <h2 className='Add_Flashcard_Form_Header'>Edit Flashcard</h2>
                        <p style={{fontSize: '30px'}} />
                        <textarea rows='2' className='Add_Flashcard_Form_Title' placeholder='Flashcard Title...' maxLength='100'
                            value={flashcards[0].title} onChange={(changeTitle) => setTitle(changeTitle.target.value)} />
                        <p style={{fontSize: '20px'}} />
                        
                        
                        <div className='Add_Flashcard_Form_Content'>
                            <BlockStyleControls onToggle={onBlockClick}/>
                            <InlineStyleControls onToggle={onInlineClick}/>
                            <div style={{width: '100%', borderTop: '2px solid rgba(112, 112 ,112 ,1)', margin: '10px 0 10px 0'}}/>
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
                        () => { /*onEditFlashcard(flashcards[0].id, flashcards[0].title, flashcards[0].content); */}}/>
                </form>}
                {modalIsOpenE && <div onClick={() => setModalIsOpenE(false)}>
                   <Backdrop/> 
                </div>}

                <Footer/>
            </body>
            
        </div>
    );
}

export default StudyPage;