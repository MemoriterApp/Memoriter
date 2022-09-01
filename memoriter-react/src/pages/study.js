import Logo from './Logo.png';
import Footer from '../components/Footer';
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { firebase } from '../utils/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import FlashcardStudy from '../components/flashcard-study';
const { db } = firebase;

const StudyPage = () => {

    let syncedFolderTitle = localStorage.getItem('syncedFolderTitle');

    let syncedFolderID = localStorage.getItem('syncedFolderID');


    //firestore stuff
    // connection to the flashcards firestore
    const flashcardsCollectionRef = query(collection(db, "flashcards"), where("syncedFolder", "==", syncedFolderID));

    //Flashcard Data
    const [flashcards, setFlashcards] = useState([]);

    //Use Effect für Notes
    useEffect(() => {
        const getFlashcards = async () => {
            const allFlashcards = await getDocs(flashcardsCollectionRef)
            setFlashcards(allFlashcards.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        };

        getFlashcards();
        localStorage.setItem('lastPage', "/study");
    }, []);

    const [started, setStarted] = useState(false); //state to set if the session was started or not

    function start() {
        setFlashcards(flashcards.sort(() => Math.random() - 0.5));
    }

    function incorrect() { //function if an answer was defined as incorrect (reshuffles the array)
        setFlashcards(flashcards.sort(() => Math.random() - 0.5)); //TODO: fix incorrect reshuffle
    }

    function correct(id) { //function if an answer was defined as correct, removes the correctly answered card
        setFlashcards((flashcards) => flashcards.filter((flashcard) => flashcard.id !== id));
    }

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
                    <p className='study-remaining'>Remaining: {flashcards.length}</p>
                </header>
                <Link to='/topic'>
                    <div className="Zurückbutton_Body" style={{ top: '90px', left: '8px', zIndex: '10' }}>
                        <div className="Zurückbutton_Arrow" />
                    </div>
                </Link>

                {started || <button 
                    style={{position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', fontSize: '24px'}}
                    onClick={() => {setStarted(true); start();}}
                >Start Studying</button>}

                {started && <> {/*nur die flashcard, wo die position im array der variable currentNumber entspricht, wird angezeigt*/}
                    {flashcards.sort(() => Math.random() - 0.5).slice(0, 1).map((flashcard) => (
                        <FlashcardStudy key={flashcard.id} flashcard={flashcard}
                            onIncorrect={() => incorrect()} onCorrect={() => correct(flashcard.id)}/>
                    ))}
                </>}

                <Footer/>
            </body>
            
        </div>
    );
}

export default StudyPage;