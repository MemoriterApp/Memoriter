import { useState } from 'react';
import Logo from './Logo.png';
import BackButton from '../components/BackButton';
import SettingsIcon from '../components/SettingsIcon';
import Footer from '../components/Footer';
import Flashcard from '../components/Flashcard';
import AddFlashcardForm from '../components/AddFlashcardForm';
import Backdrop from '../components/backdrop';
import { Link } from 'react-router-dom';

function TopicPage() {

    const [modalIsOpenA, setModalIsOpenA] = useState(false);

    function NewFlashcardClick() {
        setModalIsOpenA(true);
    }

    function backdropClick() {
        setModalIsOpenA(false);
    }

//Flashcard Data
    const [ flashcards, setFlashcards ] = useState([
        {
            id: 838,
            pos: 1,
            title: 'Was ist eine Revolution?',
            content: 'Schneller radikaler gesellschaftlicher oder politischer Umbruch, bei dem durch bspw. Rebellion eine gesellschaftliche Struktur mehr Freiheit oder Gerechtigkeit erreicht werden soll, wobei die Revolution nicht von den herrschenden durchgeführt werden wird.'
        },
        {
            id: 463,
            pos: 2,
            title: 'Stamp Act???',
            content: '...'
        },
        {
            id: 674,
            pos: 3,
            title: 'Wann war die Unabhängigkeit?',
            content: '1776'
        },
    ])

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
    const addFlashcard = (flashcard) => {
        const id = Math.floor(Math.random() * 10000) + 1
        const pos = flashcards.length + 1
        const newFlashcardC = { id, pos, ...flashcard }
        setFlashcards([...flashcards, newFlashcardC])
        setModalIsOpenA(false)
    }

//Edit Flashcard
    const editFlashcard = (id, title, content) => {
        setFlashcards(flashcards.map((flashcard) => flashcard.id === id
        ? { ...flashcard, title: title, content: content } : flashcard))
    }

//Delete Flashcard
    const deleteFlashcard = (id, pos) => {
        setFlashcards((flashcards) =>
        flashcards
            .map((flashcard) =>
            flashcard.pos > pos ? { ...flashcard, pos: flashcard.pos - 1 } : flashcard
            )
            .filter((flashcard) => flashcard.id !== id)
        )
    }

    return (
        <>
            <header>
                <h1 className="page_title">--Folder Name--</h1>
                <Link to='/'>
                    <img className="Logo-oben" src={Logo} alt="site-logo"></img>
                </Link>
            </header>

            <div className="rechteck">
                <div className='main-seperator' />
                <div className='Flashcard_Base'>
                    <>
                        {flashcards.map((flashcard) => (
                        <Flashcard key={flashcard.id} flashcard={flashcard} flashcardCount={flashcards.length} openFlashcardView={openFlashcard}
                        onPosLeft={posLeft} onPosRight={posRight}
                        onDeleteFlashcard={deleteFlashcard} onEditFlashcard={editFlashcard}
                        onOpenFlashcard={openFlashcardReq} onCloseFlashcard={closeFlashcardReq}
                        onNextFlashcard={nextFlashcard} onPrevFlashcard={prevFlashcard} />
                        ))}
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
                        {modalIsOpenA && <AddFlashcardForm onAddFlashcard={addFlashcard} />}
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
        </>
    );
}
export default TopicPage;