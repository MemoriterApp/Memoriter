import { useState } from 'react';
import Logo from './Logo.png';
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
            id:748393,
            pos:2,
            title:'65839303ß4'
        },
        {
            id:73939,
            pos:1,
            title:'jdifnioeaffni'
        },
        {
            id:7393535433359,
            pos:3,
            title:'jdifnioeaffniyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy'
        },
     ])

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
                <h1 className="page_title">Topic</h1>
                <Link to='/'>
                    <img className="Logo-oben" src={Logo} alt="site-logo"></img>
                </Link>
            </header>

            <div className="rechteck">
                <h2 className="File-Overview">--Folder Name hier Einfügen--</h2>
                <SettingsIcon />
                <div className="main-seperator"></div>

                <div className='Folder_Base'>
                    <>
                        {flashcards.map((flashcard) => (
                        <Flashcard key={flashcard.id} flashcard={flashcard} flashcardCount={flashcards.length}
                        onPosLeft={posLeft} onPosRight={posRight} onDeleteFlashcard={deleteFlashcard} />
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
            </div>

            <footer>
                <Footer />
            </footer>
        </>
    );
}
export default TopicPage;