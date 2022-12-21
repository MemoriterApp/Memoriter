import Footer from '../components/layout/footer';
import Logo from '../images/memoriter-logo.svg';
import { Link } from 'react-router-dom';

function PatchNotes() {

  let lastPage = localStorage.getItem('lastPage');

  return (
    <>
      <header>
        <Link to='/'>
          <img className='header-logo' src={Logo} alt='site-logo' style={{ top: '-2.5px', zIndex: '10' }}></img>
        </Link>
        <Link to={lastPage}>
          <div className='Zurückbutton_Body' style={{ top: '90px', left: '8px', zIndex: '10' }}>
            <div className='Zurückbutton_Arrow' />
          </div>
        </Link>
        <h1 className='Legal_Header'>Patch Notes</h1>
      </header>
      <main>
        <p className='Legal-SubHeader'>Update 1.1 &quotmodus studio&quot:</p>
        <p className='Legal_Text'>
                    This update we have added a couple of new pretty cool features, as well as a whole new design!
                    The main focus has been that we improved the way you can study, adding a whole new &aposstudy mode&apos with which you can practice flashcards.
                    Speaking of practicing flashcards we have also added different preview modes including one in which you can only see the title of a flashcard,
                    giving you another option to repeat it. Many other new features are also included in this update.
        </p>
        <p className='Legal-SubHeader'>Full list:</p>
        <ul className='Legal_Text'>
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
        <br/><br/><br/><br/>
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );

}

export default PatchNotes;