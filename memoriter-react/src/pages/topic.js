import '../css/topic.css';
import { useState, useEffect, } from 'react';
import memoriterLogo from '../images/memoriter-logo.svg';
import BackButton from '../components/BackButton';
import SettingsIcon from '../components/Settings/SettingsIcon';
import Footer from '../components/Footer';
import FlashcardForm from '../components/flashcard-form';
import Backdrop from '../components/backdrop';
import { Link} from 'react-router-dom';
import Masonry from 'react-masonry-css';
import FlashcardOnlyQuestion from '../components/Flashcards/FlashcardOnlyQuestion';
import Flashcard from '../components/Flashcards/Flashcard';
import ChooseMode from '../components/choose-mode';
import { firebase } from '../utils/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore/lite';
const { db } = firebase;

//this file is the home page of the app where you see all your flashcards
//it uses css from topic.css

//things that need to be explained better by Simon:
//1. how does collum layout work? | it is based on a library and css media queries
//2. how does sorting flashcards work? | it is one the most basic ones (https://www.w3schools.com/js/js_array_sort.asp)
//3. What does openFlashReq. do? | it sets a number to the position of a flashcard which will be opened, the number can be modified with the arrows next to the open card
//4. genrell how does all of the positioning work? | every flashcard has a position prop in the database which is used by the sort method and is modified by the change position arrows
//5. edit flashcard how does it work? | like the one of the folders, just with a broken editor
//6. how does the huge if-else work? | based on the current text align it changes to a specific other one
//7. Could you also figure out why renaming the CSS Classes dosen't work? | the classes are reused sometimes, so you need to rename it for every use case




function TopicPage() {

    const user = firebase.auth.currentUser; //creates the user from the firebase auth

    const [columns, setColumns] = useState(6); //column count of the masonry layout
    const [width, setWidth] = useState(window.innerWidth); //get the width of the current browser window

    useEffect(() => { //detect window resize
        window.addEventListener('resize', () => setWidth(window.innerWidth)); //add event listener for window resize
        return () => window.removeEventListener('resize', () => setWidth(window.innerWidth)); //remove event listener for window resize
    }, []);

    if (width <= 505 && columns !== 1) { //sets the layout column count
        setColumns(1);
    } else if (width > 505 && width <= 850 && columns !== 2) {
        setColumns(2);
    } else if (width > 850 && width <= 1150 && columns !== 3) {
        setColumns(3);
    } else if (width > 1150 && width <= 1400 && columns !== 4) {
        setColumns(4);
    } else if (width > 1400 && width <= 1600 && columns !== 5) {
        setColumns(5);
    } else if (width > 1600 && width <= 1900 && columns !== 6) {
        setColumns(6);
    } else if (width > 1900 && columns !== 7) {
        setColumns(7);
    };

    //firebase stuff
    //link to db
    const flashcardCollectionRef = query(collection(db, "flashcards"), where("syncedFolder", "==", localStorage.getItem('syncedFolderID'))); //gets all flashcards from the synced folder

    //Flashcard Data
    const [flashcards, setFlashcards] = useState([]) //creates the flashcard state

    //Use Effect fpt notes resets the notes state when the page is loaded
    useEffect(() => {
        const getFlashcards = async () => { //gets all flashcards from the synced folder
            const allFlashcards = await getDocs(flashcardCollectionRef) 
            setFlashcards(allFlashcards.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        };

        getFlashcards(); //calls the function
        sessionStorage.setItem('flashcard-content', ''); 
        localStorage.setItem('lastPage', "/topic");
    }, []) // do not add dependencies, otherwise it will loop

    let syncedFolderTitle = localStorage.getItem('syncedFolderTitle'); //gets the title of the synced folder

    let syncedFolderID = localStorage.getItem('syncedFolderID'); //gets the id of the synced folder

    const [modalIsOpenA, setModalIsOpenA] = useState(false); //creates the state for the add flashcard modal
    const [chooseMode, openChooseMode] = useState(false); //creates the state for the choose study mode modal

    function NewFlashcardClick() { //opens the add flashcard modal
        setModalIsOpenA(true);
    }

    function backdropClick() { //closes the add flashcard modal
        setModalIsOpenA(false);
    }

    //Open Flashcard
    const [openFlashcard, setOpenFlashcard] = useState() //creates the state for the open flashcard

    const openFlashcardReq = (pos) => { //opens the flashcard   
        setOpenFlashcard(pos)
    }

    const closeFlashcardReq = () => { //closes the flashcard
        setOpenFlashcard(undefined)
    }

    const nextFlashcard = (pos) => { //opens the next flashcard
        if (pos < flashcards.length) {
            setOpenFlashcard(pos + 1)
        }
    }

    const prevFlashcard = (pos) => { //opens the previous flashcard
        if (pos > 1) {
            setOpenFlashcard(pos - 1)
        }
    }

    //Flashcard Position
    flashcards.sort(function (a, b) { return a.pos - b.pos }) //Sorting Flashcards

    const posLeft = async (id, pos) => { //Position left
        const flashcardDoc = doc(db, 'flashcards', id);
        const newPosLeft = { pos: pos - 1 };

        await updateDoc(flashcardDoc, newPosLeft);

        setFlashcards(flashcards.map((flashcard) => flashcard.id === id
            ? { ...flashcard, pos: (flashcard.pos - 1) } : flashcard.pos === (pos - 1)
                ? (sessionStorage.setItem('newPosFlashcard', flashcard.id),
                    { ...flashcard, pos: (flashcard.pos + 1) }) : flashcard))
    }

    const posRight = async (id, pos) => { //Position right
        const flashcardDoc = doc(db, 'flashcards', id);
        const newPosRight = { pos: pos + 1 };

        await updateDoc(flashcardDoc, newPosRight);

        setFlashcards(flashcards.map((flashcard) => flashcard.id === id
            ? { ...flashcard, pos: (flashcard.pos + 1) } : flashcard.pos === (pos + 1)
                ? (sessionStorage.setItem('newPosFlashcard', flashcard.id),
                    { ...flashcard, pos: (flashcard.pos - 1) }) : flashcard))
    }

    const posAdjust = async (id, pos) => { //Adjust Position
        const flashcardDoc = doc(db, 'flashcards', id);
        const newPosAdjust = { pos: pos };

        await updateDoc(flashcardDoc, newPosAdjust);
    }

    //Add Flashcard
    const addFlashcard = async (flashcard) => {
        const pos = flashcards.length + 1 //adds the flashcard to the end of the list
        
        await addDoc(collection(db, "flashcards"), {nextDate: new Date(), intervall: 1, easiness: 2.5, streak: 0, pos, title: flashcard.title, content: flashcard.content,
            textAlign: 'left', textAlignSymbol: '< <', textAlignColor: 'rgb(48, 118, 48)', syncedFolder: flashcard.syncedFolder, user: user.uid }) //sets the db files for the flashcard

        const allFlashcards = await getDocs(flashcardCollectionRef)
        setFlashcards(allFlashcards.docs.map((doc) => ({ ...doc.data(), id: doc.id }))) //refresh the flashcards state

        setModalIsOpenA(false) //closes the add flashcard modal once the flashcard has been added
    }

    //Edit Flashcard
    const editFlashcard = async (id, title, content) => {
        const flashcardDoc = doc(db, 'flashcards', id);
        const newAll = { title: title, content: content };
        await updateDoc(flashcardDoc, newAll);
        setFlashcards(flashcards.map((flashcard) => flashcard.id === id
            ? { ...flashcard, title: title, content: content } : flashcard))
    }

    //Change text align
    const changeTextAlign = async (id, textAlign) => {
        const flashcardDoc = doc(db, 'flashcards', id);
        await updateDoc(flashcardDoc, {textAlign: textAlign});
        setFlashcards(flashcards.map((flashcard) => flashcard.id === id ? { ...flashcard, textAlign: textAlign } : flashcard));
    };

    //Delete Flashcard
    const deleteFlashcard = async (id, pos) => { 
        const flashcardDoc = doc(db, 'flashcards', id);
        await deleteDoc(flashcardDoc); 
        setFlashcards((flashcards) => //refresh the flashcards state
            flashcards
                .map((flashcard) =>
                    flashcard.pos > pos
                        ? (sessionStorage.setItem('newPosFlashcard' + flashcard.id, flashcard.id),
                            { ...flashcard, pos: flashcard.pos - 1 }) : flashcard
                )
                .filter((flashcard) => flashcard.id !== id)
        )
    }

    //states to check what preview mode
    const [isOnlyQuestion, setIsOnlyQuestion] = useState(false);

    useEffect(() => { //checks if the preview mode is only question from local storage
        const onlyQuestion = JSON.parse(localStorage.getItem('onlyQuestion'));
        if (onlyQuestion) { //if it is the case sets state to only question
            setIsOnlyQuestion(onlyQuestion);
        }
    }, []);

    return (
        <>
            <header className='page-header'>
                {syncedFolderTitle !== '' ? (
                    <h1 className='page-title' >{syncedFolderTitle}</h1>
                ) : (
                    <h1 className="page-title" >New Folder</h1>
                )}
                <Link to='/'>
                    <img className="header-logo" src={memoriterLogo} alt="site-logo"></img>
                </Link>
                <div className='study-now' onClick={() => openChooseMode(true)}>
                    <p className='study-now-text'>study now</p>
                </div>

                {chooseMode && <ChooseMode/>}
                {chooseMode && <Backdrop onClick={() => openChooseMode(false)}/>}

            </header>
            <main>
                <div className='rechteck'>
                    <div className='main-seperator' />
                    <div className='flashcard-base'>

                        <Masonry breakpointCols={columns} className='flashcard-base-grid'>
                            {isOnlyQuestion === true ? //checks if the preview mode is only question
                                flashcards //if it is the case, only the question will be shown
                                    .map((flashcard) => (
                                        <FlashcardOnlyQuestion 
                                            key={flashcard.id} flashcard={flashcard} flashcardCount={flashcards.length} openFlashcardView={openFlashcard}
                                            onPosLeft={posLeft} onPosRight={posRight} onPosAdjust={posAdjust}
                                            onDeleteFlashcard={deleteFlashcard} onEditFlashcard={editFlashcard}
                                            onOpenFlashcard={openFlashcardReq} onCloseFlashcard={closeFlashcardReq}
                                            onNextFlashcard={nextFlashcard} onPrevFlashcard={prevFlashcard}
                                            onChangeTextAlign={changeTextAlign} />
                                    )
                                    ) : (flashcards //if it is not the case, the question and answer will be shown
                                        .map((flashcard) => (
                                            <Flashcard key={flashcard.id} flashcard={flashcard} flashcardCount={flashcards.length} openFlashcardView={openFlashcard}
                                                onPosLeft={posLeft} onPosRight={posRight} onPosAdjust={posAdjust}
                                                onDeleteFlashcard={deleteFlashcard} onEditFlashcard={editFlashcard}
                                                onOpenFlashcard={openFlashcardReq} onCloseFlashcard={closeFlashcardReq}
                                                onNextFlashcard={nextFlashcard} onPrevFlashcard={prevFlashcard}
                                                onChangeTextAlign={changeTextAlign}
                                            />)))}

                            {/*create new flashcard button*/}
                            <div className='flashcard-body'>
                                <div className='New_flashcard-rechteck' onClick={NewFlashcardClick}>
                                    <div className='New_Flashcard_Circle'>
                                        <div className='New_Flashcard_Plus_h' />
                                        <div className='New_Flashcard_Plus_v' />
                                    </div>
                                </div>
                            </div>
                        </Masonry>

                        <div>
                            {modalIsOpenA && <FlashcardForm onAddFlashcard={addFlashcard} syncedFolderID={syncedFolderID} />}
                        </div>
                        <div onClick={backdropClick}>
                            {modalIsOpenA && <Backdrop />}
                        </div>
                    </div>
                    <BackButton />
                    <SettingsIcon />
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
}
export default TopicPage;