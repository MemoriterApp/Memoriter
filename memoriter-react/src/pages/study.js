import Logo from './Logo.png';
import Footer from '../components/Footer';
import Backdropfs from '../components/backdropfs';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { firebase } from '../utils/firebase'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore/lite';
import Flashcard from '../components/Flashcard';
const { db } = firebase;

const StudyPage = () => {

    let syncedFolderTitle = localStorage.getItem('syncedFolderTitle');

    let syncedFolderID = localStorage.getItem('syncedFolderID');

    //firestore stuff
    // connection to the flashcards firestore
    const flashcardsCollectionRef = query(collection(db, "flashcards"), where("syncedFolder", "==", syncedFolderID));

    //Flashcard Data
    const [flashcards, setFlashcards] = useState([])

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
    const [backdropfsOpen, setBackdropfsOpen] = useState(false);

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
                    <div className='Flashcard_Open_Settings' onClick={() => {setSettingsHandlerOpen(true); setBackdropfsOpen(true);}}>
                        <span className='big-dot'/>
                        <span className='big-dot'/>
                        <span className='big-dot'/>
                    </div>

                    <h1>{flashcards[0].title}</h1>

                    {settingsHandlerOpen && <div className='flashcard-open-settings-overlay-position-field'>
                        <div className='flashcard-open-settings-overlay-position-field-click'/>
                        <div className='flashcard-open-settings-overlay' style={{width: '90px', height: '100px', padding: '14px 0 14px 14px'}}>
                            <div className='folder-settings-sub'>
                                <p>Text Align:<br/>
                                    {<span style={{color: flashcards[0].textAlignColor}}>{flashcards[0].textAlignSymbol}</span>} {flashcards[0].textAlign}</p>
                                <p><span style={{color: 'rgb(48, 158, 228)'}}>🖋</span> Edit</p>
                                <p style={{color: 'rgb(228, 48, 48)'}}>✕ Delete</p>
                            </div>

                        </div>
                    </div>}
                </div>
                {backdropfsOpen && <Backdropfs onClick={() => {
                    setBackdropfsOpen(false);
                    setSettingsHandlerOpen(false);
                }}/>}

                <Footer/>
            </body>
            
        </div>
    );
}

export default StudyPage;