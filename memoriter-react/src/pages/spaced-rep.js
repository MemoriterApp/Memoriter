import React from 'react';
import '../css/spaced-rep.css';
import Footer from '../components/layout/footer';
import Logo from '../images/memoriter-logo.svg';
import { Link, useNavigate } from 'react-router-dom';
import Backdrop from '../components/backdrop';
import FlashcardSpacedRep from '../components/flashcard-spaced-rep';
import { firebase } from '../utils/firebase'
import { collection, getDocs, query, where, updateDoc, deleteDoc, doc } from 'firebase/firestore/lite';
import { useState, useEffect } from 'react';
import { spacedRepetition } from '../utils/spaced-repetition';
const { db } = firebase;



function SpacedRepMode() {

    const navigate = useNavigate();

    let syncedFolderTitle = localStorage.getItem('syncedFolderTitle');

    let syncedFolderID = localStorage.getItem('syncedFolderID');
    const [tutorialSpacedRepetition, setTutorialSpacedRepetition] = useState(false);

    //firestore stuff
    // connection to the flashcards firestore
    const flashcardsCollectionRef = query(collection(db, 'flashcards'), where('syncedFolder', '==', syncedFolderID));

    //Flashcard Data
    const [flashcards, setFlashcards] = useState([]);

    //for ensdscreen stats
    const [studiedFlashcards, setStudiedFlashcards] = useState(0); //number of correctly answered flashcards
    const [incorrectFlashcards, setIncorrectFlashcards] = useState(0); //number of incorrectly answered flashcards

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

    // answer function
    const flashcardAnswer = (answeredFlashcard, type, streak, easiness, interval) => {
        if (spacedRepetition(answeredFlashcard.id, type, streak, easiness, interval)) {
            // correct(-ish) answer: flashcard gets removed from the session array
            if (flashcards.length === 1) { //determines if the endscreen for laerned all cards is shown or not if a flashcard is marked as correct
                setFlashcards((flashcards) => flashcards.filter((flashcard) => flashcard.id !== answeredFlashcard.id));
                setStudiedFlashcards(studiedFlashcards + 1);
                setFinished(true); //shows endscreen
            } else {
                setFlashcards((flashcards) => flashcards.filter((flashcard) => flashcard.id !== answeredFlashcard.id));
                setStudiedFlashcards(studiedFlashcards + 1);
            };
        } else {
            //removes the incorrect flashcard and moves it to the end, new flashcard shows up
            setFlashcards([...flashcards
                .filter((flashcard) => flashcard.id !== answeredFlashcard.id) //removes the old flashcard
                .sort(() => Math.random() - 0.5), answeredFlashcard]) //reshuffles the array and creates the copy
                //the advantage of this method is the fact that a flashcard will not show the next timo if incorrect is clicked
            setIncorrectFlashcards(incorrectFlashcards + 1);
        };
    };
    // the flashcard properties must be used as function arguments
    // type depends on the clicked button, it can be 0 to 4, 0 is completely incorrect, 4 is very easy

    const [started, setStarted] = useState(false); //state to set if the session was started or not
    const [finished, setFinished] = useState(false); //state to set if the session is completed (all cards learned)

    if (!started) { //autostarts the spaced rep mode
        setStarted(true); //shows flashcard component
    };

    // filters the flashcards for only the not studied ones to show up
    const [filtered, setFiltered] = useState(false);
    if (flashcards.length > 0 && !filtered) {
        setFlashcards([...flashcards
            .filter((flashcard) => (flashcard.nextDate && flashcard.nextDate.toDate() <= new Date()) || !flashcard.nextDate)
        ])
        setFiltered(true);
    };

    //Change text align
    const changeTextAlign = async (id, textAlign) => {
        const flashcardDoc = doc(db, 'flashcards', id);
        await updateDoc(flashcardDoc, {textAlign: textAlign});
        setFlashcards(flashcards.map((flashcard) => flashcard.id === id ? { ...flashcard, textAlign: textAlign } : flashcard));
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

    
    /*Here Functions determine what text should be shown, when that button is pressed, instead of the given Text below. */
    const easy_change = () => {
        document.getElementById('title').innerHTML = 'Easy button';
        document.getElementById('text_1').innerHTML = 'This is used for answers that you can answer without thinking too hard.';
        document.getElementById('text_2').innerHTML = 'Examples:';
        document.getElementById('text_3').innerHTML = 'Q: Capital of Germany? <div> A: Berlin';
        document.getElementById('text_4').innerHTML = 'Q: What is the powerhouse of the Cell? <div>  A: The Mitochondria';
        
    }

    const ok_change = () => {
        document.getElementById('title').innerHTML = 'Correct button';
        document.getElementById('text_1').innerHTML = 'This is used for questions that you can answer, but needed some time to think about it. Your confidence in the answer is also high.';
        document.getElementById('text_2').innerHTML = 'Example:';
        document.getElementById('text_3').innerHTML = 'Q: What is 4*6.5? <div> A: 26';
        document.getElementById('text_4').innerHTML = '';
    }

    const medium_change = () => {
        document.getElementById('title').innerHTML = 'Mostly correct button';
        document.getElementById('text_1').innerHTML = 'This is used for questions where a small part of your answer is incorrect, or one of multiple correct one is incorrect.';
        document.getElementById('text_2').innerHTML = 'Example:';
        document.getElementById('text_3').innerHTML = 'Q: Placeholder Text<div> A: NOTHING givven';
        document.getElementById('text_4').innerHTML = '';
    }

    const almost_change = () => {
        document.getElementById('title').innerHTML = 'Almost correct button';
        document.getElementById('text_1').innerHTML = 'This is used for close calls, where you might have just misremembered the answer.';
        document.getElementById('text_2').innerHTML = 'Example:';
        document.getElementById('text_3').innerHTML = 'Q: gfgfgfgfgfgfgfgfgfgfgff <div> Your A: fr <div> Correct A: gt ';
        document.getElementById('text_4').innerHTML = '';

    }

    const hard_change = () => {
        document.getElementById('title').innerHTML = 'Incorrect button';
        document.getElementById('text_1').innerHTML = 'Here the answer is undoubtedly incorrect.';
        document.getElementById('text_2').innerHTML = 'Example:';
        document.getElementById('text_3').innerHTML = 'Q: Where do polar bears live? <div> Your A: Antarctica <div> Correct A: The Artcic';
        document.getElementById('text_4').innerHTML = '';
        
    }

    return (
        <>
            <header className='page-header'>
                <h1 className='page-title'>
                    {syncedFolderTitle}
                </h1>
                    <Link to='/'>
                        <img className='header-logo' src={Logo} alt='site-logo'></img>
                    </Link>
                    <p className='study-remaining'>Remaining: {flashcards.length}</p>
             </header>
             <Link to={'/topic'}>
                    <div className='Zurückbutton_Body' style={{ top: '90px', left: '8px', zIndex: '10' }}>
                        <div className='Zurückbutton_Arrow' />
                    </div>
            </Link> 


            <main>
                {started && <> {/*nur die flashcard, wo die position im array der variable currentNumber entspricht, wird angezeigt*/}
                        {flashcards.slice(0, 1).map((flashcard) => (
                            <FlashcardSpacedRep key={flashcard.id} flashcard={flashcard}
                                onAnswer={flashcardAnswer}
                                onEditFlashcard={editFlashcard} onDeleteFlashcard={deleteFlashcard} onChangeTextAlign={changeTextAlign}/>
                        ))}

                    <button className='tutorial-button' title='Tutorial'
                            onClick={() => setTutorialSpacedRepetition(true)}> 
                        ?
                    </button>
                </>}

                {tutorialSpacedRepetition && 
                    <div className='study-spaced-repetition-tutorial'>
                        {/*These are the first Texts you see when entering the tutorial popup. */}
                        <div className='tutorial-sub'>
                            <p id='title'  style={{fontSize:'28px'}}>Tutorial on Spaced Repetition buttons</p> 
                            <p id='text_1'></p>
                            <p id='text_2'>To start click on a colored button below.</p>
                            <p id='text_3'></p>
                            <p id='text_4'></p>
                        </div>

                        <button className='tutorial-spaced-repetition-buttons'
                                style={{ left: '-5%', background:'#0d8f52'}} onClick={easy_change}>Easy</button>
                        
                        <button className='tutorial-spaced-repetition-buttons'
                                style={{ left: '17.5%', background:'#0d8f18'}} onClick={ok_change}>✔</button>
                        
                        <button className='tutorial-spaced-repetition-buttons'
                                style={{ left: '40%', background:'#778f0d'}} onClick={medium_change}>mostly</button>
                        
                        <button className='tutorial-spaced-repetition-buttons'
                                style={{ left: '62.5%', background:'#8f520d'}} onClick={almost_change}>close</button>

                        <button className='tutorial-spaced-repetition-buttons'
                                style={{ left: '85%', background:'#8f0d0d'}} onClick={hard_change}>✖</button>
                    </div>
                }

                <div onClick={() => setTutorialSpacedRepetition(false)}>
                    {tutorialSpacedRepetition && <Backdrop/>}
                </div>

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
                        <p className='finished_statistics' style={{ color:'#2d772d'}}>
                            Percent Correct: {(100 * (1 - (incorrectFlashcards / (studiedFlashcards + incorrectFlashcards)))).toFixed(2)}%
                        </p>
                        <p className='finished_statistics' style={{ color:'#dc4c4d'}}>
                            Incorrect: {incorrectFlashcards} ({(100 * (incorrectFlashcards / (studiedFlashcards + incorrectFlashcards))).toFixed(2)}%)
                        </p>
                    </div>

                    <button className='finished-button'
                        style={{ top: '70%', width: '14vw'}}
                        onClick={() => navigate('/study')}
                    >Study all flashcards</button>

                    <button className='finished-button'
                        style={{top: '77.5%', width: '14vw', backgroundColor:'rgb(126, 128, 134)'}}
                        onClick={() => navigate('/topic')}
                    >Return to Overview</button>
                </div>}
            </main>
            <Footer/>
        </>
    )
}

export default SpacedRepMode;