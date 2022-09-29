import Logo from '../images/memoriter-logo.svg';
import Footer from '../components/Footer';
import FlashcardStudy from '../components/flashcard-study';
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { firebase } from '../utils/firebase'
import { collection, getDocs, query, where, updateDoc, deleteDoc, doc } from 'firebase/firestore/lite';
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
            setFlashcards(allFlashcards.docs
                .sort(() => Math.random() - 0.5) //shuffles the data
                .map((doc) => ({ ...doc.data(), id: doc.id}))) //gets the database flashcards
        };

        getFlashcards();
        localStorage.setItem('lastPage', '/study');
    }, []);

    const [started, setStarted] = useState(false); //state to set if the session was started or not
    const [finished, setFinished] = useState(false); //state to set if the session is completed (all cards learned)

    //for ensdscreen stats
    const [studiedFlashcards, setStudiedFlashcards] = useState(0); //number of correctly answered flashcards
    const [incorrectFlashcards, setIncorrectFlashcards] = useState(0); //number of incorrectly answered flashcards

    if (!started) { //autostarts the study mode
        setStarted(true); //shows flashcard component
    }

    function incorrect(incorrectFlashcard) { //function if an answer was defined as incorrect (reshuffles the array)
        //removes the incorrect flashcard and moves it to the end, new flashcard shows up
        setFlashcards([...flashcards
            .filter((flashcard) => flashcard.id !== incorrectFlashcard.id) //removes the old flashcard
            .sort(() => Math.random() - 0.5), incorrectFlashcard]) //reshuffles the array and creates the copy
            //the advantage of this method is the fact that a flashcard will not show the next timo if incorrect is clicked
        setIncorrectFlashcards(incorrectFlashcards + 1);
    }

    function correct(id) { //function if an answer was defined as correct, removes the correctly answered card
        if (flashcards.length === 1) { //determines if the endscreen for laerned all cards is shown or not if a flashcard is marked as correct
            setFlashcards((flashcards) => flashcards.filter((flashcard) => flashcard.id !== id));
            setStudiedFlashcards(studiedFlashcards + 1);
            setFinished(true); //shows endscreen
        } else {
            setFlashcards((flashcards) => flashcards.filter((flashcard) => flashcard.id !== id));
            setStudiedFlashcards(studiedFlashcards + 1);
        }
    }

    async function startAgain() {
        setFinished(false);
        const allFlashcards = await getDocs(flashcardsCollectionRef)
        setFlashcards(
            allFlashcards.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            .sort(() => Math.random() - 0.5));
        setStudiedFlashcards(0);
        setIncorrectFlashcards(0);
    }

    //Change text align
    const changeTextAlign = async (id, textAlign) => {
        const flashcardDoc = doc(db, 'flashcards', id);

        //based on the current text align, the text align will changed to a different value
        if (textAlign === 'left') {
            const newAll = { textAlign: 'right', textAlignSymbol: '> >', textAlignColor: 'rgb(228, 48, 48)' };
            await updateDoc(flashcardDoc, newAll);
            setFlashcards(flashcards.map((flashcard) => flashcard.id === id
                ? { ...flashcard, textAlign: 'right', textAlignSymbol: '> >', textAlignColor: 'rgb(228, 48, 48)' } : flashcard))
        } else if (textAlign === 'right') {
            const newAll = { textAlign: 'center', textAlignSymbol: '> <', textAlignColor: 'rgb(228, 198, 48)' };
            await updateDoc(flashcardDoc, newAll);
            setFlashcards(flashcards.map((flashcard) => flashcard.id === id
                ? { ...flashcard, textAlign: 'center', textAlignSymbol: '> <', textAlignColor: 'rgb(228, 198, 48)' } : flashcard))
        } else if (textAlign === 'center') {
            const newAll = { textAlign: 'jusify', textAlignSymbol: '< >', textAlignColor: 'rgb(48, 158, 228)' };
            await updateDoc(flashcardDoc, newAll);
            setFlashcards(flashcards.map((flashcard) => flashcard.id === id
                ? { ...flashcard, textAlign: 'justify', textAlignSymbol: '< >', textAlignColor: 'rgb(48, 158, 228)' } : flashcard))
        } else if (textAlign === 'justify') {
            const newAll = { textAlign: 'left', textAlignSymbol: '< <', textAlignColor: 'rgb(48, 118, 48)' };
            await updateDoc(flashcardDoc, newAll);
            setFlashcards(flashcards.map((flashcard) => flashcard.id === id
                ? { ...flashcard, textAlign: 'left', textAlignSymbol: '< <', textAlignColor: 'rgb(48, 118, 48)' } : flashcard))
        } else {
            const newAll = { textAlign: 'left', textAlignSymbol: '< <', textAlignColor: 'rgb(48, 118, 48)' };
            await updateDoc(flashcardDoc, newAll);
            setFlashcards(flashcards.map((flashcard) => flashcard.id === id
                ? { ...flashcard, textAlign: 'left', textAlignSymbol: '< <', textAlignColor: 'rgb(48, 118, 48)' } : flashcard))
        }
    };

    //Edit Flashcard
    const editFlashcard = async (id, title, content) => {
        const flashcardDoc = doc(db, 'flashcards', id);
        const newAll = { title: title, content: content };
        await updateDoc(flashcardDoc, newAll);
        setFlashcards(flashcards.map((flashcard) => flashcard.id === id
            ? { ...flashcard, title: title, content: content } : flashcard))
    };

    //Delete Flashcard
    const deleteFlashcard = async (id, pos) => {
        const flashcardDoc = doc(db, 'flashcards', id);
        await deleteDoc(flashcardDoc);
        setFlashcards((flashcards) =>
            flashcards
                .map((flashcard) =>
                    flashcard.pos > pos
                        ? (sessionStorage.setItem('newPosFlashcard' + flashcard.id, flashcard.id),
                            { ...flashcard, pos: flashcard.pos - 1 }) : flashcard
                )
                .filter((flashcard) => flashcard.id !== id)
        )
    };

    return (
        <div>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name='keywords' content='memoriter, study, files, subjects, overview, effective, studying, school, university, flashcards'></meta>
                <meta name='description' content='Flashcards for Memoriter'/>
            </head>

            <body>
                <header className='Page_Header'>
                    {syncedFolderTitle !== '' ? (
                        <h1 className="page_title">{syncedFolderTitle}</h1>
                    ) : (
                        <h1 className="page_title">New Folder</h1>
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

                {started && <> {/*nur die flashcard, wo die position im array der variable currentNumber entspricht, wird angezeigt*/}
                    {flashcards.slice(0, 1).map((flashcard) => (
                        <FlashcardStudy key={flashcard.id} flashcard={flashcard}
                            onIncorrect={() => incorrect(flashcard)} onCorrect={() => correct(flashcard.id)}
                            onEditFlashcard={editFlashcard} onDeleteFlashcard={deleteFlashcard} onChangeTextAlign={changeTextAlign}/>
                    ))}
                </>}

                {finished && <div>
                    <div className='finished-box'>
                        <p className='finished_statistics' style={{fontSize:'5.3vh'}}>
                            Results
                        </p>
                        <p className='finished_statistics'>
                            Studied Flashcards: {studiedFlashcards}
                        </p>
                        <p className='finished_statistics'>
                            Repetitions: {studiedFlashcards + incorrectFlashcards}
                        </p>
                        <p className='finished_statistics'>
                            Average Correctness: fomrula
                        </p>
                        <p className='finished_statistics' style={{ color:'#dc4c4d'}}>
                            Incorrect: {incorrectFlashcards}
                        </p>
                    </div>

                    <button className='finished-button'
                        style={{ top: '70%'}}
                        onClick={() => startAgain()}
                    >Study Again</button>

                    <button className='finished-button'
                        style={{top: '77.5%', width: '14vw', backgroundColor:'rgb(126, 128, 134)'}}
                        onClick={() => navigate('/topic')}
                    >Return to Overview</button>
                </div>}

                <Footer/>
            </body>
            
        </div>
    );
}

export default StudyPage;