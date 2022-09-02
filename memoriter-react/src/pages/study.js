import Logo from './Logo.png';
import Footer from '../components/Footer';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { firebase } from '../utils/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore/lite';
import FlashcardStudy from '../components/flashcard-study';
const { db } = firebase;

const StudyPage = () => {

    const navigate = useNavigate();

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
        localStorage.setItem('lastPage', '/study');
    }, []);

    const [started, setStarted] = useState(false); //state to set if the session was started or not
    
    const [finished, setFinished] = useState(false); //state to set if the session is completed (all cards learned)

    function start() { //function for starting the session
        setStarted(true); //shows flashcard component
        setFlashcards(flashcards.sort(() => Math.random() - 0.5)); //shuffles the array
    }

    function incorrect(incorrectFlashcard) { //function if an answer was defined as incorrect (reshuffles the array)
        //removes the incorrect flashcard and moves it to the end, new flashcard shows up
        setFlashcards([...flashcards
            .filter((flashcard) => flashcard.id !== incorrectFlashcard.id) //removes the old flashcard
            .sort(() => Math.random() - 0.5), incorrectFlashcard]) //reshuffles the array and creates the copy
            //the advantage of this method is the fact that a flashcard will not show the next timo if incorrect is clicked
    }

    function correct(id) { //function if an answer was defined as correct, removes the correctly answered card
        if (flashcards.length === 1) { //determines if the endscreen for laerned all cards is shown or not if a flashcard is marked as correct
            setFlashcards((flashcards) => flashcards.filter((flashcard) => flashcard.id !== id));
            setFinished(true); //shows endscreen
        } else {
            setFlashcards((flashcards) => flashcards.filter((flashcard) => flashcard.id !== id));
        }
    }

    async function startAgain() {
        setFinished(false);
        const allFlashcards = await getDocs(flashcardsCollectionRef)
        setFlashcards(
            allFlashcards.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            .sort(() => Math.random() - 0.5))
    }

    return (
        <div>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name='keywords' content='memoriter, study, files, subjects, overview, effective, studying, school, university, flashcards'></meta>
                <meta name='description' content='Flashacrds for Memoriter'/>
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
                    onClick={() => start()}
                >Start Studying</button>}

                {started && <> {/*nur die flashcard, wo die position im array der variable currentNumber entspricht, wird angezeigt*/}
                    {flashcards.slice(0, 1).map((flashcard) => (
                        <FlashcardStudy key={flashcard.id} flashcard={flashcard}
                            onIncorrect={() => incorrect(flashcard)} onCorrect={() => correct(flashcard.id)}/>
                    ))}
                </>}

                {finished && <div>
                    <button 
                        style={{position: 'absolute', left: '50%', top: '45%', transform: 'translate(-50%, -50%)', fontSize: '24px'}}
                        onClick={() => startAgain()}
                    >Study Again</button>

                    <button 
                        style={{position: 'absolute', left: '50%', top: '55%', transform: 'translate(-50%, -50%)', fontSize: '24px'}}
                        onClick={() => navigate('/topic')}
                    >Return to Overview</button>
                </div>}

                <Footer/>
            </body>
            
        </div>
    );
}

export default StudyPage;