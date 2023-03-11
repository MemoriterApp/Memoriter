import './spaced-rep.css';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../../../components/footer/footer';
import Logo from '../../../../images/memoriter-logo.svg';
import Backdrop from '../../../../components/backdrops/backdrop/backdrop';
import FlashcardSpacedRep from '../flashcard/flashcard-spaced-rep';
import NothingToStudy from '../nothing-to-study/nothing-to-study';
import TutorialSpacedRep from '../tutorial/tutorial-spaced-rep';
import { firebase, getFlashcards, removeFlashcard, updateFlashcard } from '../../../../technical/utils/mongo';
import { useState, useEffect } from 'react';
import { spacedRepetition } from '../../../../technical/utils/spaced-repetition';
import FinishedViewSpacedRep from '../finished-view/finished-view-spaced-rep';
import { Flashcard } from '../../../../types';

function SpacedRepMode() {

    const navigate = useNavigate();

    useEffect(() => {
        const user = firebase.auth.currentUser;

        if (!user) {
            return navigate('/login');
        }
    });

    let folderTitle = localStorage.getItem('folderTitle');
    let folderID = localStorage.getItem('folderID');

    const [tutorialSpacedRepetition, setTutorialSpacedRepetition] = useState(false);

    //Flashcard Data
    const [flashcards, setFlashcards] = useState<any[]>([]);

    //for ensdscreen stats
    const [studiedFlashcards, setStudiedFlashcards] = useState(0); //number of correctly answered flashcards
    const [incorrectFlashcards, setIncorrectFlashcards] = useState(0); //number of incorrectly answered flashcards


    //Use Effect für Notes
    useEffect(() => {
        const fetchFlashcards = async () => {
            const allFlashcards = await getFlashcards(folderID);
            setFlashcards(allFlashcards.sort(() => Math.random() - 0.5)); // gets the database flashcards and randomizes their order
        };
        fetchFlashcards();
        localStorage.setItem('lastPage', '/study');
    }, []);

    // answer function
    const flashcardAnswer = (answeredFlashcard: Flashcard, type: number, streak: number, easiness: number, interval: number) => {
        if (spacedRepetition(answeredFlashcard._id, type, streak, easiness, interval)) {
            // correct(-ish) answer: flashcard gets removed from the session array
            if (flashcards.length === 1) { //determines if the endscreen for laerned all cards is shown or not if a flashcard is marked as correct
                setFlashcards((flashcards) => flashcards.filter((flashcard) => flashcard._id !== answeredFlashcard._id));
                setStudiedFlashcards(studiedFlashcards + 1);
                setFinished(true); //shows endscreen
            } else {
                setFlashcards((flashcards) => flashcards.filter((flashcard) => flashcard._id !== answeredFlashcard._id));
                setStudiedFlashcards(studiedFlashcards + 1);
            }
        } else {
            //removes the incorrect flashcard and moves it to the end, new flashcard shows up
            setFlashcards([
                ...flashcards
                    .filter((flashcard) => flashcard._id !== answeredFlashcard._id) //removes the old flashcard
                    .sort(() => Math.random() - 0.5), answeredFlashcard
            ]); //reshuffles the array and creates the copy
            //the advantage of this method is the fact that a flashcard will not show the next timo if incorrect is clicked
            setIncorrectFlashcards(incorrectFlashcards + 1);
        }
    };
    // the flashcard properties must be used as function arguments
    // type depends on the clicked button, it can be 0 to 4, 0 is completely incorrect, 4 is very easy

    const [started, setStarted] = useState(false); //state to set if the session was started or not
    const [finished, setFinished] = useState(false); //state to set if the session is completed (all cards learned)

    if (!started) { //autostarts the spaced rep mode
        setStarted(true); //shows flashcard component
    }

    // filters the flashcards for only the not studied ones to show up
    const [filtered, setFiltered] = useState(false);
    if (flashcards.length > 0 && !filtered) {
        setFlashcards([
            ...flashcards
                .filter((flashcard: Flashcard) => (new Date(flashcard.nextDate) <= new Date()) || !flashcard.nextDate)
        ]);
        setFiltered(true);
    }

    //Change text align
    const changeTextAlign = async (id: string, textAlign: any) => {
        await updateFlashcard(id, { textAlign: textAlign });
        setFlashcards(flashcards.map((flashcard) => flashcard._id === id ? { ...flashcard, textAlign: textAlign } : flashcard));
    };
    //Edit Flashcard
    const editFlashcard = async (id: string, title: any, content: any) => {
        const newAll = { title: title, content: content };
        await updateFlashcard(id, newAll);
        setFlashcards(flashcards.map((flashcard) => flashcard._id === id
            ? { ...flashcard, title: title, content: content } : flashcard));
    };
    //Delete Flashcard
    const deleteFlashcard = async (id: string, pos: number) => {
        await removeFlashcard(id);
        setFlashcards((flashcards) =>
            flashcards
                .map((flashcard) =>
                    flashcard.pos > pos
                        ? (sessionStorage.setItem('newPosFlashcard' + flashcard._id, flashcard._id),
                            { ...flashcard, pos: flashcard.pos - 1 }) : flashcard
                )
                .filter((flashcard) => flashcard._id !== id)
        );
    };

    //function to set the date when last studied when the session is finished
    useEffect(() => {
        const currentDate = new Date();
        localStorage.setItem('lastStudyDate', currentDate.toString());
    }, [finished]);



    return (
        <>
            <header className='page-header'>
                <h1 className='page-title'>
                    {folderTitle}
                </h1>
                <Link to='/'>
                    <img className='header-logo' src={Logo} alt='site-logo'></img>
                </Link>
                <p className='study-remaining'>Remaining: {flashcards.length}</p>
            </header>
            
            <Link to='/' >
                <div className='back-button'/> 
            </Link>


            <main>
                {started && <> {/*Only the flashcards where pos in Array = currentNumber are being shown*/}
                    {flashcards.slice(0, 1).map((flashcard) => (
                        <FlashcardSpacedRep
                            key={flashcard._id}
                            flashcard={flashcard}
                            onAnswer={flashcardAnswer}
                            onEditFlashcard={editFlashcard}
                            onDeleteFlashcard={deleteFlashcard}
                            onChangeTextAlign={changeTextAlign}
                        />
                    ))}

                    <button className='tutorial-button' title='Tutorial'
                        onClick={() => setTutorialSpacedRepetition(true)}>
                        ?
                    </button>
                    {flashcards.length === 0 && <NothingToStudy />}
                </>}

                {tutorialSpacedRepetition &&
                    <>
                        <TutorialSpacedRep />
                        <Backdrop onClick={() => setTutorialSpacedRepetition(false)} />
                    </>
                }

                {finished && <FinishedViewSpacedRep
                    studiedFlashcards={studiedFlashcards}
                    incorrectFlashcards={incorrectFlashcards} />}
            </main>
            <Footer />
        </>
    );
}

export default SpacedRepMode;