import { useState, useEffect, } from 'react';
import Logo from './Logo.png';
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

function TopicPage({ syncedFolderID, syncedFolderTitle }) {

    //firebase stuff
    //link zur db
    const flashcardCollectionRef = collection(db, "flashcards")

    //Flashcard Data
    const [ flashcards, setFlashcards ] = useState([ ])

    //Use Effect für Notes
    useEffect(() => {
        const getFlashcards = async () => {
            const allFlashcards = await getDocs(flashcardCollectionRef)
            setFlashcards(allFlashcards.docs.map((doc)=>({...doc.data(), id: doc.id })))
            setRenderedFlashcard(false)
        };

        getFlashcards();
    }, [])

    //show correct flashcards
        const [renderedFlashcard, setRenderedFlashcard] = useState(true);

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
    const [ openFlashcard, setOpenFlashcard ] = useState()

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
    flashcards.sort(function(a, b){return a.pos - b.pos})
    
    const posLeft = (id, pos) => {
        setFlashcards(flashcards.map((flashcard) => flashcard.id === id
        ? { ...flashcard, pos: (flashcard.pos - 1) } : flashcard.pos === (pos - 1)
        ? { ...flashcard, pos: (flashcard.pos + 1) } : flashcard ))
    }
    
    const posRight = (id, pos) => {
        setFlashcards(flashcards.map((flashcard) => flashcard.id === id
        ? { ...flashcard, pos: (flashcard.pos + 1) } : flashcard.pos === (pos + 1)
        ? { ...flashcard, pos: (flashcard.pos - 1) } : flashcard ))
    }

//Add Flashcard
    const addFlashcard = async (flashcard) => {
        const pos = flashcards.length + 1
        const newFlashcardC = {pos, ...flashcard }
        await addDoc(flashcardCollectionRef, {pos, title: flashcard.title, content: flashcard.content, syncedFolder: flashcard.syncedFolder} )
        setFlashcards([...flashcards, newFlashcardC])
        setModalIsOpenA(false)
    }

//Edit Flashcard
    const editFlashcard = async (id, title, content) => {
        const flashcardDoc = doc(db, 'flashcards', id);
        const newAll = {title: title, content: content};
        await updateDoc(flashcardDoc, newAll);
        setFlashcards(flashcards.map((flashcard) => flashcard.id === id
        ? { ...flashcard, title: title, content: content } : flashcard))
    }

//Delete Flashcard
    const deleteFlashcard = async (id, pos) => {
        const flashcardDoc = doc(db, 'flashcards', id); //Bug dass man die seite refreshen muss...
        await deleteDoc(flashcardDoc); //Position wird auf Firebase noch nicht korrigiert.
        setFlashcards((flashcards) =>
        flashcards
            .map((flashcard) =>
            flashcard.pos > pos ? { ...flashcard, pos: flashcard.pos - 1 } : flashcard
            )
            .filter((flashcard) => flashcard.id !== id)
        )
    }

    return (
        <div>
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

            <div className="rechteck">
                <div className='main-seperator' />
                <div className='Flashcard_Base'>
                    <>
                        {flashcards
                            .map((flashcard) => (
                                <Flashcard key={flashcard.id} flashcard={flashcard} flashcardCount={flashcards.length} openFlashcardView={openFlashcard}
                                onPosLeft={posLeft} onPosRight={posRight}
                                onDeleteFlashcard={deleteFlashcard} onEditFlashcard={editFlashcard}
                                onOpenFlashcard={openFlashcardReq} onCloseFlashcard={closeFlashcardReq}
                                onNextFlashcard={nextFlashcard} onPrevFlashcard={prevFlashcard}
                                />)
                        )}
                    </>

                    <div className='Flashcard_Body'>
                        <div className='Flashcard_Settings_Bar' onClick={NewFlashcardClick}/>
                        <div className='Flashcard_Rechteck' onClick={NewFlashcardClick}>
                            <div className='New_Flashcard_Circle'>
                                <div className='New_Flashcard_Plus_h' />
                                <div className='New_Flashcard_Plus_v' />
                            </div>
                        </div>
                    </div>

                    <div>
                        {modalIsOpenA && <AddFlashcardForm onAddFlashcard={addFlashcard} syncedFolderID={syncedFolderID}/>}
                    </div>
                    <div onClick={backdropClick}>
                        {modalIsOpenA && <Backdrop/>}
                    </div>
                </div>
                <BackButton />
                <SettingsIcon />
            </div>

            <footer>
                <Footer />
            </footer>
        </div>
    );
}
export default TopicPage;