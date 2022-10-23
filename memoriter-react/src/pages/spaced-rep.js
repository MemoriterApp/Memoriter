import React from "react";
import '../css/spaced-rep.css';
import Footer from "../components/Footer";
import Logo from '../images/memoriter-logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import FlashcardSpacedRep from '../components/flashcard-spaced-rep';
import { firebase } from '../utils/firebase'
import { collection, getDocs, query, where, updateDoc, deleteDoc, doc } from 'firebase/firestore/lite';
import { useState, useEffect } from "react";
const { db } = firebase;



function SpacedRepMode() {

    const navigate = useNavigate();
    let lastPage = localStorage.getItem('lastPage');

    let syncedFolderTitle = localStorage.getItem('syncedFolderTitle');

    let syncedFolderID = localStorage.getItem('syncedFolderID');

    //firestore stuff
    // connection to the flashcards firestore
    const flashcardsCollectionRef = query(collection(db, "flashcards"), where("syncedFolder", "==", syncedFolderID));

    //Flashcard Data
    const [flashcards, setFlashcards] = useState([]);

    //for ensdscreen stats
    const [studiedFlashcards, setStudiedFlashcards] = useState(0); //number of correctly answered flashcards
    const [incorrectFlashcards, setIncorrectFlashcards] = useState(0); //number of incorrectly answered flashcards
    const [showAnswer, setShowAnswer] = useState(false); //state for showing the answer of the card

    //Use Effect für Notes
    useEffect(() => {
        const getFlashcards = async () => {
            const allFlashcards = await getDocs(flashcardsCollectionRef)
            setFlashcards(allFlashcards.docs
                .sort(() => Math.random() - 0.5) //shuffles the data
                .map((doc) => ({ ...doc.data(), id: doc.id}))) //gets the database flashcards
        };

        getFlashcards();
        localStorage.setItem('lastPage', '/study');
    }, []);

    const [started, setStarted] = useState(false); //state to set if the session was started or not
    const [finished, setFinished] = useState(false); //state to set if the session is completed (all cards learned)

    if (!started) { //autostarts the study mode
        setStarted(true); //shows flashcard component
    }

    function type(id) { //function if an answer was defined as correct, removes the correctly answered card
        if (flashcards.length === 1) { //determines if the endscreen for laerned all cards is shown or not if a flashcard is marked as correct
            setFlashcards((flashcards) => flashcards.filter((flashcard) => flashcard.id !== id));
            setStudiedFlashcards(studiedFlashcards + 1);
            setFinished(true); //shows endscreen
        } else {
            setFlashcards((flashcards) => flashcards.filter((flashcard) => flashcard.id !== id));
            setStudiedFlashcards(studiedFlashcards + 1);
        }
    }

    return (
        <>
            <header className='page-header'>
                <h1 className="page-title">
                    {syncedFolderTitle}
                </h1>
                    <Link to='/'>
                        <img className="header-logo" src={Logo} alt="site-logo"></img>
                    </Link>
             </header>
             <Link to={'/topic'}>
                    <div className="Zurückbutton_Body" style={{ top: '90px', left: '8px', zIndex: '10' }}>
                        <div className="Zurückbutton_Arrow" />
                    </div>
            </Link> 
            <main>

                {started && <> {/*nur die flashcard, wo die position im array der variable currentNumber entspricht, wird angezeigt*/}
                        {flashcards.slice(0, 1).map((flashcard) => (
                            <FlashcardSpacedRep key={flashcard.id} flashcard={flashcard}
                                onCorrect={() => type(flashcard.id)}/>
                        ))}
                </>}
            </main>
            <footer>
                <Footer />
            </footer><footer>
                <Footer />
            </footer>
        </>
    )
}

export default SpacedRepMode;