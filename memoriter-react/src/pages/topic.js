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
    const [ flashcards, setFlashcards ] = useState([ ])

//Flashcard Position
    flashcards.sort(function(a, b){return a.pos - b.pos})

//Add Flashcard
    const addFlashcard = (flashcard) => {
        const id = Math.floor(Math.random() * 10000) + 1
        const pos = flashcard.length + 1
        const newFlashcardC = { id, pos, ...flashcard }
        setFlashcards([...flashcards, newFlashcardC])
        setModalIsOpenA(false)
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
                        <Flashcard key={flashcard.id} flashcard={flashcard} />
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