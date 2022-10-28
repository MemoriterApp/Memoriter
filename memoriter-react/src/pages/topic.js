import React from 'react';
import { useState, useEffect, } from 'react';
import memoriterLogo from '../images/memoriter-logo.svg';
import BackButton from '../components/BackButton';
import SettingsIcon from '../components/SettingsIcon';
import Footer from '../components/Footer';
import AddFlashcardForm from '../components/AddFlashcardForm';
import Backdrop from '../components/backdrop';
import { Link, useNavigate, } from 'react-router-dom';
import Masonry from 'react-masonry-css';
import FlashcardOnlyQuestion from '../components/Flashcards/FlashcardOnlyQuestion';
import Flashcard from '../components/Flashcards/Flashcard';
import { firebase } from '../utils/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore/lite';
const { db } = firebase;


function TopicPage() {

  let syncedFolderTitle = localStorage.getItem('syncedFolderTitle'); //gets title of the folder from local storage
  let syncedFolderID = localStorage.getItem('syncedFolderID'); //gets Id from local storage

  const navigate = useNavigate();

  const user = firebase.auth.currentUser;

  const [columns, setColumns] = useState(6); //column count of the masonry layout
  const [width, setWidth] = useState(window.innerWidth); //get the width of the current browser window

  useEffect(() => { //detect window resize
    window.addEventListener('resize', () => setWidth(window.innerWidth));
    return () => window.removeEventListener('resize', () => setWidth(window.innerWidth));
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
  }

  //firebase stuff
  //link zur db
  const flashcardCollectionRef = query(collection(db, 'flashcards'), where('syncedFolder', '==', syncedFolderID));

  //Flashcard Data
  const [flashcards, setFlashcards] = useState([]);

  //Use Effect für Notes
  useEffect(() => {
    const getFlashcards = async () => {
      const allFlashcards = await getDocs(flashcardCollectionRef);
      setFlashcards(allFlashcards.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getFlashcards();
    sessionStorage.setItem('flashcard-content', '');
    localStorage.setItem('lastPage', '/topic:syncedFolderID');
  }, [flashcardCollectionRef]);

 
  

  const [modalIsOpenA, setModalIsOpenA] = useState(false);

  function NewFlashcardClick() {
    setModalIsOpenA(true);
  }

  function backdropClick() {
    setModalIsOpenA(false);
  }

  //Open Flashcard
  const [openFlashcard, setOpenFlashcard] = useState();

  const openFlashcardReq = (pos) => {
    setOpenFlashcard(pos);
  };

  const closeFlashcardReq = () => {
    setOpenFlashcard(undefined);
  };

  const nextFlashcard = (pos) => {
    if (pos < flashcards.length) {
      setOpenFlashcard(pos + 1);
    }
  };

  const prevFlashcard = (pos) => {
    if (pos > 1) {
      setOpenFlashcard(pos - 1);
    }
  };

  //Flashcard Position
  flashcards.sort(function (a, b) { return a.pos - b.pos; }); //Sorting Flashcards

  const posLeft = async (id, pos) => { //Position left
    const flashcardDoc = doc(db, 'flashcards', id);
    const newPosLeft = { pos: pos - 1 };

    await updateDoc(flashcardDoc, newPosLeft);

    setFlashcards(flashcards.map((flashcard) => flashcard.id === id
      ? { ...flashcard, pos: (flashcard.pos - 1) } : flashcard.pos === (pos - 1)
        ? (sessionStorage.setItem('newPosFlashcard', flashcard.id),
        { ...flashcard, pos: (flashcard.pos + 1) }) : flashcard));
  };

  const posRight = async (id, pos) => { //Position right
    const flashcardDoc = doc(db, 'flashcards', id);
    const newPosRight = { pos: pos + 1 };

    await updateDoc(flashcardDoc, newPosRight);

    setFlashcards(flashcards.map((flashcard) => flashcard.id === id
      ? { ...flashcard, pos: (flashcard.pos + 1) } : flashcard.pos === (pos + 1)
        ? (sessionStorage.setItem('newPosFlashcard', flashcard.id),
        { ...flashcard, pos: (flashcard.pos - 1) }) : flashcard));
  };

  const posAdjust = async (id, pos) => { //Adjust Position
    const flashcardDoc = doc(db, 'flashcards', id);
    const newPosAdjust = { pos: pos };

    await updateDoc(flashcardDoc, newPosAdjust);
  };

  //Add Flashcard
  const addFlashcard = async (flashcard) => {
    const pos = flashcards.length + 1;
        
    await addDoc(collection(db, 'flashcards'), {q:null, I:null, EF:2.5, n: 0, pos, title: flashcard.title, content: flashcard.content,
      textAlign: 'left', textAlignSymbol: '< <', textAlignColor: 'rgb(48, 118, 48)', syncedFolder: flashcard.syncedFolder, user: user.uid });

    const allFlashcards = await getDocs(flashcardCollectionRef);
    setFlashcards(allFlashcards.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); //Aktualisieren der Flashcards

    setModalIsOpenA(false);
  };

  //Edit Flashcard
  const editFlashcard = async (id, title, content) => {
    const flashcardDoc = doc(db, 'flashcards', id);
    const newAll = { title: title, content: content };
    await updateDoc(flashcardDoc, newAll);
    setFlashcards(flashcards.map((flashcard) => flashcard.id === id
      ? { ...flashcard, title: title, content: content } : flashcard));
  };

  //Change text align
  const changeTextAlign = async (id, textAlign) => {
    const flashcardDoc = doc(db, 'flashcards', id);

    //based on the current text align, the text align will changed to a different value
    if (textAlign === 'left') {
      const newAll = { textAlign: 'right', textAlignSymbol: '> >', textAlignColor: 'rgb(228, 48, 48)' };
      await updateDoc(flashcardDoc, newAll);
      setFlashcards(flashcards.map((flashcard) => flashcard.id === id
        ? { ...flashcard, textAlign: 'right', textAlignSymbol: '> >', textAlignColor: 'rgb(228, 48, 48)' } : flashcard));
    } else if (textAlign === 'right') {
      const newAll = { textAlign: 'center', textAlignSymbol: '> <', textAlignColor: 'rgb(228, 198, 48)' };
      await updateDoc(flashcardDoc, newAll);
      setFlashcards(flashcards.map((flashcard) => flashcard.id === id
        ? { ...flashcard, textAlign: 'center', textAlignSymbol: '> <', textAlignColor: 'rgb(228, 198, 48)' } : flashcard));
    } else if (textAlign === 'center') {
      const newAll = { textAlign: 'jusify', textAlignSymbol: '< >', textAlignColor: 'rgb(48, 158, 228)' };
      await updateDoc(flashcardDoc, newAll);
      setFlashcards(flashcards.map((flashcard) => flashcard.id === id
        ? { ...flashcard, textAlign: 'justify', textAlignSymbol: '< >', textAlignColor: 'rgb(48, 158, 228)' } : flashcard));
    } else if (textAlign === 'justify') {
      const newAll = { textAlign: 'left', textAlignSymbol: '< <', textAlignColor: 'rgb(48, 118, 48)' };
      await updateDoc(flashcardDoc, newAll);
      setFlashcards(flashcards.map((flashcard) => flashcard.id === id
        ? { ...flashcard, textAlign: 'left', textAlignSymbol: '< <', textAlignColor: 'rgb(48, 118, 48)' } : flashcard));
    } else {
      const newAll = { textAlign: 'left', textAlignSymbol: '< <', textAlignColor: 'rgb(48, 118, 48)' };
      await updateDoc(flashcardDoc, newAll);
      setFlashcards(flashcards.map((flashcard) => flashcard.id === id
        ? { ...flashcard, textAlign: 'left', textAlignSymbol: '< <', textAlignColor: 'rgb(48, 118, 48)' } : flashcard));
    }
  };

  //Delete Flashcard
  const deleteFlashcard = async (id, pos) => {
    const flashcardDoc = doc(db, 'flashcards', id);
    await deleteDoc(flashcardDoc);
    setFlashcards((flashcards) =>
      flashcards
        .map((flashcard) =>
          flashcard.pos > pos
            ? (sessionStorage.setItem('newPosFlashcard' + flashcard.id, flashcard.id),
            { ...flashcard, pos: flashcard.pos - 1 }) : flashcard
        )
        .filter((flashcard) => flashcard.id !== id)
    );
  };

  //states to check what preview mode
  const [isOnlyQuestion, setIsOnlyQuestion] = useState(false);

  useEffect(() => {
    const onlyQuestion = JSON.parse(localStorage.getItem('onlyQuestion'));
    if (onlyQuestion) {
      setIsOnlyQuestion(onlyQuestion);
    }
  }, []);

  return (
    <>
      <header className='page-header'>
        {syncedFolderTitle !== '' ? (
          <h1 className='page-title' >{syncedFolderTitle}</h1>
        ) : (
          <h1 className='page-title' >New Folder</h1>
        )}
        <Link to='/'>
          <img className='header-logo' src={memoriterLogo} alt='site-logo'></img>
        </Link>
        <div className='study-now' onClick={() => navigate('/study')}>
          <p className='study-now-text'>study now</p>
        </div>
      </header>
      <main>
        <div className='rechteck'>
          <div className='main-seperator' />
          <div className='Flashcard_Base'>

            <Masonry breakpointCols={columns} className='flashcard-base-grid'>
              {isOnlyQuestion === true ?
                flashcards
                  .map((flashcard) => (
                    <FlashcardOnlyQuestion
                      key={flashcard.id} flashcard={flashcard} flashcardCount={flashcards.length} openFlashcardView={openFlashcard}
                      onPosLeft={posLeft} onPosRight={posRight} onPosAdjust={posAdjust}
                      onDeleteFlashcard={deleteFlashcard} onEditFlashcard={editFlashcard}
                      onOpenFlashcard={openFlashcardReq} onCloseFlashcard={closeFlashcardReq}
                      onNextFlashcard={nextFlashcard} onPrevFlashcard={prevFlashcard}
                      onChangeTextAlign={changeTextAlign} />
                  )
                  ) : (flashcards //add an if statement to check what kind of flashcard should be displayed
                  .map((flashcard) => (
                    <Flashcard key={flashcard.id} flashcard={flashcard} flashcardCount={flashcards.length} openFlashcardView={openFlashcard}
                      onPosLeft={posLeft} onPosRight={posRight} onPosAdjust={posAdjust}
                      onDeleteFlashcard={deleteFlashcard} onEditFlashcard={editFlashcard}
                      onOpenFlashcard={openFlashcardReq} onCloseFlashcard={closeFlashcardReq}
                      onNextFlashcard={nextFlashcard} onPrevFlashcard={prevFlashcard}
                      onChangeTextAlign={changeTextAlign}
                    />)))}

              {/*create new flashcard button*/}
              <div className='Flashcard_Body'>
                <div className='New_Flashcard_Rechteck' onClick={NewFlashcardClick}>
                  <div className='New_Flashcard_Circle'>
                    <div className='New_Flashcard_Plus_h' />
                    <div className='New_Flashcard_Plus_v' />
                  </div>
                </div>
              </div>
            </Masonry>

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
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
export default TopicPage;