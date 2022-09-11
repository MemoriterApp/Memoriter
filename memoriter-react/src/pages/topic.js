import { useState, useEffect, } from 'react';
import memoriterLogo from '../images/memoriter-logo.svg';
import BackButton from '../components/BackButton';
import SettingsIcon from '../components/SettingsIcon';
import Footer from '../components/Footer';
import Flashcard from '../components/Flashcard';
import AddFlashcardForm from '../components/AddFlashcardForm';
import Backdrop from '../components/backdrop';
import { Link, } from 'react-router-dom';
import { firebase } from '../utils/firebase'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore/lite';
const { db } = firebase;

function TopicPage() {

    //firebase stuff
    //link zur db
    const flashcardCollectionRef = collection(db, "flashcards")

    //Flashcard Data
    const [flashcards, setFlashcards] = useState([])

    //Use Effect für Notes
    useEffect(() => {
        const getFlashcards = async () => {
            const allFlashcards = await getDocs(flashcardCollectionRef)
            setFlashcards(allFlashcards.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
            setRenderedFlashcard(false)
        };

        getFlashcards();
        localStorage.setItem('lastPage', "/topic");
    }, [])

    //show correct flashcards and title
    const [renderedFlashcard, setRenderedFlashcard] = useState(true);

    let syncedFolderTitle = localStorage.getItem('syncedFolderTitle');

    let syncedFolderID = localStorage.getItem('syncedFolderID')

    if (renderedFlashcard === false) {
        setFlashcards(flashcards.filter((flashcard) => flashcard.syncedFolder === syncedFolderID));
        setRenderedFlashcard(true);
    }


    const [modalIsOpenA, setModalIsOpenA] = useState(false);

    function NewFlashcardClick() {
        setModalIsOpenA(true);
    }

    function backdropClick() {
        setModalIsOpenA(false);
    }

    //Open Flashcard
    const [openFlashcard, setOpenFlashcard] = useState()

    const openFlashcardReq = (pos) => {
        setOpenFlashcard(pos)
    }

    const closeFlashcardReq = () => {
        setOpenFlashcard(undefined)
    }

    const nextFlashcard = (pos) => {
        if (pos < flashcards.length) {
            setOpenFlashcard(pos + 1)
        }
    }

    const prevFlashcard = (pos) => {
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
        const pos = flashcards.length + 1
        await addDoc(flashcardCollectionRef, { pos, title: flashcard.title, content: flashcard.content, syncedFolder: flashcard.syncedFolder })

        const allFlashcards = await getDocs(flashcardCollectionRef)
        setFlashcards(allFlashcards.docs.map((doc) => ({ ...doc.data(), id: doc.id }))) //Aktualisieren der Flashcards
        setRenderedFlashcard(false)

        setModalIsOpenA(false)
    }

    //Edit Flashcard
    const editFlashcard = async (id, title, content) => {
        const flashcardDoc = doc(db, 'flashcards', id);
        const newAll = { title: title, content: content };
        await updateDoc(flashcardDoc, newAll);
        setFlashcards(flashcards.map((flashcard) => flashcard.id === id
            ? { ...flashcard, title: title, content: content } : flashcard))
    }

    //Delete Flashcard
    const deleteFlashcard = async (id, pos) => {
        const flashcardDoc = doc(db, 'flashcards', id);
        await deleteDoc(flashcardDoc); //Position wird auf Firebase noch nicht korrigiert.
        setFlashcards((flashcards) =>
            flashcards
                .map((flashcard) =>
                    flashcard.pos > pos
                        ? (sessionStorage.setItem('newPosFlashcard' + flashcard.id, flashcard.id),
                            { ...flashcard, pos: flashcard.pos - 1 }) : flashcard
                )
                .filter((flashcard) => flashcard.id !== id)
        )
    }

    return (
        <div>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name='keywords' content='memoriter, study, files, subjects, overview, effective, studying, school, university, flashcards'></meta>
                <meta name='description' content='Flashacrds for Memoriter'></meta>
            </head>
            <header className='Page_Header'>
                {syncedFolderTitle !== '' ? (
                    <h1 className="page_title" >{syncedFolderTitle}</h1>
                ) : (
                    <h1 className="page_title" >New Folder</h1>
                )}
                <Link to='/'>
                    <img className="Logo-oben" src={memoriterLogo} alt="site-logo"></img>
                </Link>
            </header>
            <body>
                <div className="rechteck">
                    <div className='main-seperator' />
                    <div className='Flashcard_Base'>
                        <>
                            {flashcards
                                .map((flashcard) => (
                                    <Flashcard key={flashcard.id} flashcard={flashcard} flashcardCount={flashcards.length} openFlashcardView={openFlashcard}
                                        onPosLeft={posLeft} onPosRight={posRight} onPosAdjust={posAdjust}
                                        onDeleteFlashcard={deleteFlashcard} onEditFlashcard={editFlashcard}
                                        onOpenFlashcard={openFlashcardReq} onCloseFlashcard={closeFlashcardReq}
                                        onNextFlashcard={nextFlashcard} onPrevFlashcard={prevFlashcard}
                                    />)
                                )}
                        </>

                        <div className='Flashcard_Body'>
                            <div className='Flashcard_Settings_Bar' onClick={NewFlashcardClick} />
                            <div className='Flashcard_Rechteck' onClick={NewFlashcardClick}>
                                <div className='New_Flashcard_Circle'>
                                    <div className='New_Flashcard_Plus_h' />
                                    <div className='New_Flashcard_Plus_v' />
                                </div>
                            </div>
                        </div>

                        <div>
                            {modalIsOpenA && <AddFlashcardForm onAddFlashcard={addFlashcard} syncedFolderID={syncedFolderID} />}
                        </div>
                        <div onClick={backdropClick}>
                            {modalIsOpenA && <Backdrop />}
                        </div>
                    </div>
                    <BackButton />
                    <SettingsIcon />
                </div>
            </body>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}
export default TopicPage;