import './topic.css';
import { useState, useEffect, useRef } from 'react';
import BackButton from '../../../components/back-button/BackButton';
import FlashcardForm from '../form/flashcard-form';
import Backdrop from '../../../components/backdrops/backdrop/backdrop';
import Masonry from 'react-masonry-css';
import Flashcard from '../flashcard/flashcard';
import ChooseStudyMode from '../../study-modes/choose-studymode/choose-studymode';
import {
  firebase,
  getFlashcards,
  insertFlashcard,
  removeFlashcard,
  updateFlashcard,
} from '../../../technical/utils/mongo';
import moment from 'moment';
import Layout from '../../../components/layout/layout';
import * as Type from '../../../types';

//this file is the home page of the app where you see all your flashcards
//it uses css from topic.css
function TopicPage() {
  const sizeRef = useRef(null);

  const user = firebase.auth.currentUser;

  const flame = require('../../../images/icons/flame.png'); //for some reason could not import otherwise

  const [columns, setColumns] = useState(7); // column count of the masonry layout
  const [gridWidth, setGridWidth] = useState(1680); // width of the masonry layout (doesn't work perfectly with css only)
  const [width, setWidth] = useState(0); // get the width of the current browser window

  useEffect(() => {
    setWidth(sizeRef.current.clientWidth);
    //detect window resize
    window.addEventListener('resize', () => setWidth(sizeRef.current.clientWidth)); //add event listener for window resize
    return () => window.removeEventListener('resize', () => setWidth(sizeRef.current.clientWidth)); //remove event listener for window resize
  }, []);

  if (width <= 455 && columns !== 1) {
    //sets the layout column count
    setColumns(1);
    setGridWidth(200);
  } else if (width > 455 && width <= 558 && columns !== 2) {
    setColumns(2);
    setGridWidth(440);
  } else if (width > 558 && width <= 765 && columns !== 2) {
    setColumns(2);
    setGridWidth(500);
  } else if (width > 765 && width <= 1035 && columns !== 3) {
    setColumns(3);
    setGridWidth(700);
  } else if (width > 1035 && width <= 1260 && columns !== 4) {
    setColumns(4);
    setGridWidth(950);
  } else if (width > 1260 && width <= 1440 && columns !== 5) {
    setColumns(5);
    setGridWidth(1200);
  } else if (width > 1440 && width <= 1710 && columns !== 6) {
    setColumns(6);
    setGridWidth(1400);
  } else if (width > 1710 && columns !== 7) {
    setColumns(7);
    setGridWidth(1680);
  }

  const [folderTitle, setFolderTitle] = useState(localStorage.getItem('folderTitle')); //gets the title of the synced folder
  const [folderID, setFolderID] = useState(window.location.pathname.replace('/topic/', '')); // gets the id of the URL
  let folderFavoriteStateString = localStorage.getItem('folderFavorite'); //gets the favorite state of the synced folder
  const [folderFavoriteState, setFolderFavoriteState] = useState(false);
  if (folderFavoriteStateString === 'true' && !folderFavoriteState) {
    setFolderFavoriteState(true);
  }

  const [flashcards, setFlashcards] = useState<any[]>([]); //creates the flashcard state

  //Use Effect fot notes resets the notes state when the page is loaded
  useEffect(() => {
    const syncFlashcards = async () => {
      //gets all flashcards from the synced folder
      const allFlashcards = await getFlashcards(folderID);
      setFlashcards(allFlashcards);
    };
    syncFlashcards(); //calls the function
    sessionStorage.setItem('flashcard-content', '');
    localStorage.setItem('lastPage', '/topic');
    console.log(folderID);
  }, [folderID]); // do not add additional dependencies, otherwise it will loop

  const [chooseStudyModeModal, openChooseStudyModeModal] = useState(false); //creates the state for the choose study mode modal

  const [openFlashcard, setOpenFlashcard] = useState<any>(); //creates the state for the open flashcard
  const openFlashcardReq = (pos: any) => {
    setOpenFlashcard(pos);
  };

  const closeFlashcardReq = () => {
    setOpenFlashcard(undefined);
  };

  const nextFlashcard = (pos: number) => {
    //opens the next flashcard
    if (pos < flashcards.length) {
      setOpenFlashcard(pos + 1);
    }
  };

  const prevFlashcard = (pos: number) => {
    //opens the previous flashcard
    if (pos > 1) {
      setOpenFlashcard(pos - 1);
    }
  };

  //Flashcard Position
  flashcards.sort(function (a, b) {
    return a.pos - b.pos;
  }); //Sorting Flashcards

  const posLeft = async (id: string, pos: number) => {
    //moves the flashcard to the left
    const newPosLeft = { pos: pos - 1 };

    await updateFlashcard(id, newPosLeft);

    setFlashcards(
      flashcards.map((flashcard) =>
        flashcard._id === id
          ? { ...flashcard, pos: flashcard.pos - 1 }
          : flashcard.pos === pos - 1
          ? (sessionStorage.setItem('newPosFlashcard', flashcard._id),
            { ...flashcard, pos: flashcard.pos + 1 })
          : flashcard
      )
    );
  };

  const posRight = async (id: string, pos: number) => {
    //moves the flashcard to the right
    const newPosRight = { pos: pos + 1 };

    await updateFlashcard(id, newPosRight);

    setFlashcards(
      flashcards.map((flashcard) =>
        flashcard._id === id
          ? { ...flashcard, pos: flashcard.pos + 1 }
          : flashcard.pos === pos + 1
          ? (sessionStorage.setItem('newPosFlashcard', flashcard._id),
            { ...flashcard, pos: flashcard.pos - 1 })
          : flashcard
      )
    );
  };

  const posAdjust = async (id: string, pos: number) => {
    //Adjust Position
    await updateFlashcard(id, { pos: pos });
  };

  //Add Flashcard stuff
  const [addFlashcardModal, setAddFlashcardModal] = useState(false); //creates the state for the add flashcard modal

  const addFlashcard = async (title: any, content: any, folder: string) => {
    const pos = flashcards.length + 1; //adds the flashcard to the end of the list

    await insertFlashcard(title, content, folder, pos, user);

    const allFlashcards = await getFlashcards(localStorage.getItem('folderID'));
    setFlashcards(allFlashcards); //refresh the flashcards state

    setAddFlashcardModal(false); //closes the add flashcard modal once the flashcard has been added
    setOpenFlashcard(undefined); //closes the flashcard view once the flashcard has been added
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

  //Change text align
  const changeTextAlign = async (id: string, textAlign: any) => {
    await updateFlashcard(id, { textAlign: textAlign });
    setFlashcards(
      flashcards.map((flashcard) =>
        flashcard._id === id ? { ...flashcard, textAlign: textAlign } : flashcard
      )
    );
  };

  //Delete Flashcard
  const deleteFlashcard = async (id: string, pos: number) => {
    await removeFlashcard(id);
    setFlashcards(
      (
        flashcards //refresh flashcard state
      ) =>
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

  //states to check what preview mode
  const [isOnlyQuestion, setIsOnlyQuestion] = useState(false);

  useEffect(() => {
    //checks if the preview mode is only question from local storage
    const onlyQuestion = JSON.parse(localStorage.getItem('onlyQuestion'));
    if (onlyQuestion) {
      //if it is the case sets state to only question
      setIsOnlyQuestion(onlyQuestion);
    }
  }, []);

  const [streak, setStreak] = useState(0); // state to keep track of the streak

  //checks if the user has studied today
  useEffect(() => {
    const currentDate = moment();
    console.log('currentDate:', currentDate);
    const lastStudyDate = localStorage.getItem('lastStudyDate');
    console.log('lastStudyDate:', lastStudyDate);
    if (lastStudyDate) {
      const lastStudyMoment = moment(lastStudyDate, 'ddd MMM DD YYYY HH:mm:ss [GMT]ZZ');
      console.log('lastStudyMoment:', lastStudyMoment);
      if (currentDate.isSame(lastStudyMoment, 'day')) {
        setStreak((prevStreak) => prevStreak + 1);
      } else if (currentDate.diff(lastStudyMoment, 'days') > 1) {
        setStreak(0);
      }
    } else {
      setStreak(0);
    }
  }, [localStorage.getItem('lastStudyDate')]);

  const getNextDueDate = () => {
    // get the next due date of all flashcards
    const nextDueDates = flashcards
      .map((flashcard) => flashcard.nextDate)
      .filter((nextDate) => typeof nextDate === 'number');

    // find the minimum due date
    const minDueDate = new Date(Math.min.apply(null, nextDueDates));

    // format the date as a string
    const formattedDate = minDueDate.toLocaleDateString();

    // return the formatted date
    return formattedDate;
  };
  // save the formatted date to local storage
  localStorage.setItem('nextDueDate', getNextDueDate());

  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Layout
      path={folderTitle}
      folderId={folderID}
      favoriteState={folderFavoriteState}
      onUpdateCurrentFolder={(currentFolder: { id: string; title: string; favorite: boolean }) => {
        setFolderID(currentFolder.id);
        setFolderTitle(currentFolder.title);
        setFolderFavoriteState(currentFolder.favorite);
      }}
      onUpdateSearchQuery={(query) => setSearchQuery(query)}
      onSidebarButtonClick={(sidebarClass) =>
        sidebarClass === 'sidebar-floating'
          ? setWidth(sizeRef.current.clientWidth - 250)
          : setWidth(sizeRef.current.clientWidth + 250)
      }
    >
      <main>
        <div className='square' ref={sizeRef}>
          <h2 className='folder-title'>{folderTitle}</h2>
          <div className='top-responsive-container'>
            <div className='study-now' onClick={() => openChooseStudyModeModal(true)}>
              <p className='study-now-text'>study</p>
            </div>
            <div className='streak'>
              <img className='streak-icon' src={flame} alt='flame' />
              <p className='streak-number'>{streak}</p>
            </div>
          </div>
          {chooseStudyModeModal && <ChooseStudyMode folderId={folderID} />}
          {chooseStudyModeModal && <Backdrop onClick={() => openChooseStudyModeModal(false)} />}
          <div className='main-seperator' />
          <div className='flashcard-base'>
            <Masonry
              breakpointCols={columns}
              className='flashcard-base-grid'
              style={{ width: `${gridWidth}px` }}
            >
              {isOnlyQuestion === true // checks if the preview mode is only question
                ? flashcards // if it is the case, only the question will be shown
                    .filter(
                      (flashcard: Type.Flashcard) =>
                        flashcard.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        flashcard.content.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .sort(function (a: Type.Flashcard, b: Type.Flashcard) {
                      return a.pos - b.pos;
                    })
                    .map((flashcard) => (
                      <Flashcard
                        key={flashcard._id}
                        type='only-question'
                        flashcard={flashcard}
                        flashcardCount={flashcards.length}
                        openFlashcardView={openFlashcard}
                        onPosLeft={posLeft}
                        onPosRight={posRight}
                        onPosAdjust={posAdjust}
                        onDeleteFlashcard={deleteFlashcard}
                        onEditFlashcard={editFlashcard}
                        onOpenFlashcard={openFlashcardReq}
                        onCloseFlashcard={closeFlashcardReq}
                        onNextFlashcard={nextFlashcard}
                        onPrevFlashcard={prevFlashcard}
                        onChangeTextAlign={changeTextAlign}
                      />
                    ))
                : flashcards //if it is not the case, the question and answer will be shown
                    .filter(
                      (flashcard: Type.Flashcard) =>
                        flashcard.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        flashcard.content.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .sort(function (a: Type.Flashcard, b: Type.Flashcard) {
                      return a.pos - b.pos;
                    })
                    .map((flashcard) => (
                      <Flashcard
                        key={flashcard._id}
                        flashcard={flashcard}
                        flashcardCount={flashcards.length}
                        openFlashcardView={openFlashcard}
                        onPosLeft={posLeft}
                        onPosRight={posRight}
                        onPosAdjust={posAdjust}
                        onDeleteFlashcard={deleteFlashcard}
                        onEditFlashcard={editFlashcard}
                        onOpenFlashcard={openFlashcardReq}
                        onCloseFlashcard={closeFlashcardReq}
                        onNextFlashcard={nextFlashcard}
                        onPrevFlashcard={prevFlashcard}
                        onChangeTextAlign={changeTextAlign}
                      />
                    ))}

              {/*create new flashcard button*/}
              <div className='flashcard-body'>
                <div className='new-flashcard-rechteck' onClick={() => setAddFlashcardModal(true)}>
                  <div className='new-flashcard-circle'>
                    <div className='new-flashcard-plus-h' />
                    <div className='new-flashcard-plus-v' />
                  </div>
                </div>
              </div>
            </Masonry>

            {addFlashcardModal && (
              <FlashcardForm
                type='Create new'
                onConfirm={addFlashcard}
                onCancel={() => setAddFlashcardModal(false)}
                folderID={folderID}
              />
            )}
          </div>
          {/*<div className='notes'>
                        <img  src='https://img.icons8.com/ios/50/null/notepad.png'/>
                        </div>*/}
          <BackButton />
        </div>
      </main>
    </Layout>
  );
}
export default TopicPage;
