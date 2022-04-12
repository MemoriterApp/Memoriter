import { useState } from 'react';
import Logo from './Logo.png';
import SettingsIcon from '../components/SettingsIcon';
import Footer from '../components/Footer';
import Flashcard from '../components/Flashcard';
import { Link } from 'react-router-dom';

function TopicPage() {

//Flashcard Data
    const [ flashcards, setFlashcards ] = useState([
        {
            id: 758494,
            pos: 1,
            title: 'yay!',
            content: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'
        },
    ])

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
                </div>
            </div>

            <footer>
                <Footer />
            </footer>
        </>
    );
}
export default TopicPage;