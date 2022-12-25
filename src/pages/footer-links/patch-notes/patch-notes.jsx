import Footer from '../../../components/footer/footer';
import Logo from '../../../images/memoriter-logo.svg';
import { Link } from 'react-router-dom';
import BackButton from "../../../components/back-button/BackButton";
import '../footer-links.css'

function PatchNotes() {

    return (
        <>
            <header>
                <Link to='/'>
                    <img className='header-logo' src={Logo} alt='site-logo' style={{ top: '-2.5px', zIndex: '10' }}></img>
                </Link>
                <BackButton/>
                <h1 className='legal-header'>Patch Notes</h1>
            </header>
            <main>
                <p className="legal-sub-header">Update 1.1 "modus studio":</p>
                <p className='legal-text'>
                    This update we have added a couple of new pretty cool features, as well as a whole new design!
                    The main focus has been that we improved the way you can study, adding a whole new 'study mode' with which you can practice flashcards.
                    Speaking of practicing flashcards we have also added different preview modes including one in which you can only see the title of a flashcard,
                    giving you another option to repeat it. Many other new features are also included in this update.
                </p>
                <p className="legal-sub-header">Full list:</p>
                <ul className="legal-text">
                    <li>Study mode</li>
                    <li>Design rework</li>
                    <li>Flashcard style options</li>
                    <li>Text editing options</li>
                    <li>Different flashcard preview modes</li>
                    <li>Dark and light theme</li>
                    <li>Settings rework</li>
                    <li>Contact Form</li>
                    <li>Fixed bugs</li>
                </ul>
                <br /><br /><br /><br />
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );

}

export default PatchNotes;