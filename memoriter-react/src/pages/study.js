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

    const [currentNumber, setCurrentNumber] = useState(1); //state, welche flashcard angezeigt wird

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

                <> {/*nur eine flashcard der Liste wird angezeigt*/}
                    {flashcards.map((flashcard) => (
                        flashcard.pos === currentNumber ? (
                            <div className='study-flashcard-box'>
                                <h2 style={{textAlign: 'center'}}>{flashcard.title}</h2>
                                <article>{parse(flashcard.content)}</article>
                            </div>
                        ) : (
                            <div style={{display: 'none'}}/>
                        )
                    ))}
                </>

                <Footer/>
            </body>
            
        </div>
    );
}

export default StudyPage;