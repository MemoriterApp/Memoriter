import Logo from '../../../../images/memoriter-logo.svg';
import FlashcardStudy from '../flashcard/flashcard-study';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  firebase,
  getFlashcards,
  removeFlashcard,
  updateFlashcard,
} from '../../../../technical/utils/mongo';
import './regular-study.css';
import { Flashcard } from '../../../../types';
import FooterButton from '../../../../components/footer/footer-button/footer-button';
import Header from '../../../../components/layout/header';

const StudyPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = firebase.auth.currentUser;

    if (!user) {
      return navigate('/login');
    }
  });

  let folderTitle = localStorage.getItem('folderTitle');

  let folderID = localStorage.getItem('folderID');

  //Flashcard Data
  const [flashcards, setFlashcards] = useState([]);

  //Use Effect für Notes
  useEffect(() => {
    const fetchFlashcards = async () => {
      const allFlashcards = await getFlashcards(folderID);
      setFlashcards(allFlashcards.sort(() => Math.random() - 0.5)); // gets the database flashcards and randomizes their order
    };

    fetchFlashcards();
    localStorage.setItem('lastPage', '/study');
  }, []);

  const [started, setStarted] = useState(false); //state to set if the session was started or not
  const [finished, setFinished] = useState(false); //state to set if the session is completed (all cards learned)

  //for ensdscreen stats
  const [studiedFlashcards, setStudiedFlashcards] = useState(0); //number of correctly answered flashcards
  const [incorrectFlashcards, setIncorrectFlashcards] = useState(0); //number of incorrectly answered flashcards

  if (!started) {
    //autostarts the study mode
    setStarted(true); //shows flashcard component
  }

  function incorrect(incorrectFlashcard: Flashcard) {
    //function if an answer was defined as incorrect (reshuffles the array)
    //removes the incorrect flashcard and moves it to the end, new flashcard shows up
    setFlashcards([
      ...flashcards
        .filter((flashcard) => flashcard._id !== incorrectFlashcard._id) //removes the old flashcard
        .sort(() => Math.random() - 0.5),
      incorrectFlashcard,
    ]); //reshuffles the array and creates the copy
    //the advantage of this method is the fact that a flashcard will not show the next timo if incorrect is clicked
    setIncorrectFlashcards(incorrectFlashcards + 1);
  }

  function correct(id: any) {
    //function if an answer was defined as correct, removes the correctly answered card
    if (flashcards.length === 1) {
      //determines if the endscreen for laerned all cards is shown or not if a flashcard is marked as correct
      setFlashcards((flashcards) => flashcards.filter((flashcard) => flashcard._id !== id));
      setStudiedFlashcards(studiedFlashcards + 1);
      setFinished(true); //shows endscreen
    } else {
      setFlashcards((flashcards) => flashcards.filter((flashcard) => flashcard._id !== id));
      setStudiedFlashcards(studiedFlashcards + 1);
    }
  }

  async function startAgain() {
    setFinished(false);
    const allFlashcards = await getFlashcards(folderID);
    setFlashcards(allFlashcards.sort(() => Math.random() - 0.5));
    setStudiedFlashcards(0);
    setIncorrectFlashcards(0);
  }

  //Change text align
  const changeTextAlign = async (id: string, textAlign: any) => {
    await updateFlashcard(id, { textAlign: textAlign });
    setFlashcards(
      flashcards.map((flashcard) =>
        flashcard._id === id ? { ...flashcard, textAlign: textAlign } : flashcard
      )
    );
  };

  //Edit Flashcard
  const editFlashcard = async (id: string, title: any, content: any) => {
    const newAll = { title: title, content: content };
    await updateFlashcard(id, newAll);
    setFlashcards(
      flashcards.map((flashcard) =>
        flashcard._id === id ? { ...flashcard, title: title, content: content } : flashcard
      )
    );
  };

  //Delete Flashcard
  const deleteFlashcard = async (id: string, pos: number) => {
    await removeFlashcard(id);
    setFlashcards((flashcards) =>
      flashcards
        .map((flashcard) =>
          flashcard.pos > pos
            ? (sessionStorage.setItem('newPosFlashcard' + flashcard._id, flashcard._id),
              { ...flashcard, pos: flashcard.pos - 1 })
            : flashcard
        )
        .filter((flashcard) => flashcard._id !== id)
    );
  };

  return (
    <>
      <main>
        <Header folder={folderTitle} />
        {started && (
          <>
            {' '}
            {/*nur die flashcard, wo die position im array der variable currentNumber entspricht, wird angezeigt*/}
            {flashcards.slice(0, 1).map((flashcard) => (
              <FlashcardStudy
                key={flashcard._id}
                flashcard={flashcard}
                onIncorrect={() => incorrect(flashcard)}
                onCorrect={() => correct(flashcard._id)}
                onEditFlashcard={editFlashcard}
                onDeleteFlashcard={deleteFlashcard}
                onChangeTextAlign={changeTextAlign}
              />
            ))}
          </>
        )}

        {finished && (
          <div>
            <div className='finished-box'>
              <p className='finished-statistics' style={{ fontSize: '5.3vh' }}>
                Results
              </p>
              <p className='finished-statistics'>Studied Flashcards: {studiedFlashcards}</p>
              <p className='finished-statistics'>
                Repetitions: {studiedFlashcards + incorrectFlashcards}
              </p>
              <p className='finished-statistics' style={{ color: '#2d772d' }}>
                Percent Correct:{' '}
                {(
                  100 *
                  (1 - incorrectFlashcards / (studiedFlashcards + incorrectFlashcards))
                ).toFixed(2)}
                %
              </p>
              <p className='finished-statistics' style={{ color: '#dc4c4d' }}>
                Incorrect: {incorrectFlashcards} (
                {(100 * (incorrectFlashcards / (studiedFlashcards + incorrectFlashcards))).toFixed(
                  2
                )}
                %)
              </p>
            </div>

            <button
              className='finished-button'
              style={{ top: '70%', backgroundColor: '#36747D' }}
              onClick={() => startAgain()}
            >
              Study Again
            </button>

            <button
              className='finished-button'
              style={{ top: '77.5%', width: '14vw', backgroundColor: 'rgb(126, 128, 134)' }}
              onClick={() => navigate('/topic')}
            >
              Return to Overview
            </button>
          </div>
        )}
        <Link to='/'>
          <div className='back-button' />
        </Link>

        <div className='progress-bar'>
          <p className='progress-bar-text'>
            {studiedFlashcards}/{flashcards.length + studiedFlashcards}
          </p>
          <div
            className='progress-bar-fill'
            style={{
              width: `calc(${
                100 * (studiedFlashcards / (flashcards.length + studiedFlashcards))
              }% - 8px)`,
            }}
          />
        </div>

        <FooterButton />
      </main>
    </>
  );
};

export default StudyPage;
