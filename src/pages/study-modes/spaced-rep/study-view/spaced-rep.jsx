import React from 'react';
import './spaced-rep.css';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../../../../components/footer/footer';
import Logo from '../../../../images/memoriter-logo.svg';
import Backdrop from '../../../../components/backdrops/backdrop';
import FlashcardSpacedRep from '../flashcard/flashcard-spaced-rep';
import NothingToStudy from '../nothing-to-study/nothing-to-study';
import TutorialSpacedRep from '../tutorial/tutorial-spaced-rep';
import { firebase } from '../../../../technical/utils/firebase';
import { collection, getDocs, query, where, updateDoc, deleteDoc, doc } from 'firebase/firestore/lite';
import { useState, useEffect } from 'react';
import { spacedRepetition } from '../../../../technical/utils/spaced-repetition';
import FinishedViewSpacedRep from '../finished-view/finished-view-spaced-rep';
const { db } = firebase;

function SpacedRepMode() {

	const navigate = useNavigate();

	useEffect(() => {
		const user = firebase.auth.currentUser;

		if (!user) {
			return navigate('/login');
		}
	});

	let syncedFolderTitle = localStorage.getItem('syncedFolderTitle');
	let syncedFolderID = localStorage.getItem('syncedFolderID');

	const [tutorialSpacedRepetition, setTutorialSpacedRepetition] = useState(false);

	//firestore stuff
	// connection to the flashcards firestore
	const flashcardsCollectionRef = query(collection(db, 'flashcards'), where('syncedFolder', '==', syncedFolderID));

	//Flashcard Data
	const [flashcards, setFlashcards] = useState([]);

	//for ensdscreen stats
	const [studiedFlashcards, setStudiedFlashcards] = useState(0); //number of correctly answered flashcards
	const [incorrectFlashcards, setIncorrectFlashcards] = useState(0); //number of incorrectly answered flashcards

	//Use Effect für Notes
	useEffect(() => {
		const getFlashcards = async () => {
			const allFlashcards = await getDocs(flashcardsCollectionRef);
			setFlashcards(allFlashcards.docs
				.sort(() => Math.random() - 0.5) //shuffles the data
				.map((doc) => ({ ...doc.data(), id: doc.id }))); //gets the database flashcards
		};

		getFlashcards();
		localStorage.setItem('lastPage', '/study');
	}, []);

	// answer function
	const flashcardAnswer = (answeredFlashcard, type, streak, easiness, interval) => {
		if (spacedRepetition(answeredFlashcard.id, type, streak, easiness, interval)) {
			// correct(-ish) answer: flashcard gets removed from the session array
			if (flashcards.length === 1) { //determines if the endscreen for laerned all cards is shown or not if a flashcard is marked as correct
				setFlashcards((flashcards) => flashcards.filter((flashcard) => flashcard.id !== answeredFlashcard.id));
				setStudiedFlashcards(studiedFlashcards + 1);
				setFinished(true); //shows endscreen
			} else {
				setFlashcards((flashcards) => flashcards.filter((flashcard) => flashcard.id !== answeredFlashcard.id));
				setStudiedFlashcards(studiedFlashcards + 1);
			}
		} else {
			//removes the incorrect flashcard and moves it to the end, new flashcard shows up
			setFlashcards([
				...flashcards
					.filter((flashcard) => flashcard.id !== answeredFlashcard.id) //removes the old flashcard
					.sort(() => Math.random() - 0.5), answeredFlashcard
			]); //reshuffles the array and creates the copy
			//the advantage of this method is the fact that a flashcard will not show the next timo if incorrect is clicked
			setIncorrectFlashcards(incorrectFlashcards + 1);
		}
	};
	// the flashcard properties must be used as function arguments
	// type depends on the clicked button, it can be 0 to 4, 0 is completely incorrect, 4 is very easy

	const [started, setStarted] = useState(false); //state to set if the session was started or not
	const [finished, setFinished] = useState(false); //state to set if the session is completed (all cards learned)

	if (!started) { //autostarts the spaced rep mode
		setStarted(true); //shows flashcard component
	}

	// filters the flashcards for only the not studied ones to show up
	const [filtered, setFiltered] = useState(false);
	if (flashcards.length > 0 && !filtered) {
		setFlashcards([
			...flashcards
				.filter((flashcard) => (flashcard.nextDate && flashcard.nextDate.toDate() <= new Date()) || !flashcard.nextDate)
		]);
		setFiltered(true);
	}

	//Change text align
	const changeTextAlign = async (id, textAlign) => {
		const flashcardDoc = doc(db, 'flashcards', id);
		await updateDoc(flashcardDoc, { textAlign: textAlign });
		setFlashcards(flashcards.map((flashcard) => flashcard.id === id ? { ...flashcard, textAlign: textAlign } : flashcard));
	};
	//Edit Flashcard
	const editFlashcard = async (id, title, content) => {
		const flashcardDoc = doc(db, 'flashcards', id);
		const newAll = { title: title, content: content };
		await updateDoc(flashcardDoc, newAll);
		setFlashcards(flashcards.map((flashcard) => flashcard.id === id
			? { ...flashcard, title: title, content: content } : flashcard));
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

	//generate variable to show how many flashcards are due today
	let dueFlashcards = 0;
	flashcards.forEach((flashcard) => {
		if (flashcard.nextDate && flashcard.nextDate.toDate() <= new Date()) {
			dueFlashcards++;
		}
	});

	return (
		<>
			<header className='page-header'>
				<h1 className='page-title'>
					{syncedFolderTitle}
				</h1>
				<Link to='/'>
					<img className='header-logo' src={Logo} alt='site-logo'></img>
				</Link>
				<p className='study-remaining'>Remaining: {flashcards.length}</p>
			</header>
			<Link to={'/topic'}>
				<div className='Zurückbutton_Body' style={{ top: '90px', left: '8px', zIndex: '10' }}>
					<div className='Zurückbutton_Arrow' />
				</div>
			</Link>


			<main>
				{started && <> {/*Only the flashcards where pos in Array = currentNumber are being shown*/}
					{flashcards.slice(0, 1).map((flashcard) => (
						<FlashcardSpacedRep key={flashcard.id} flashcard={flashcard}
							onAnswer={flashcardAnswer}
							onEditFlashcard={editFlashcard} onDeleteFlashcard={deleteFlashcard} onChangeTextAlign={changeTextAlign} />
					))}

					<button className='tutorial-button' title='Tutorial'
						onClick={() => setTutorialSpacedRepetition(true)}>
                        ?
					</button>
					{flashcards.length === 0 && <NothingToStudy />}
				</>}

				{tutorialSpacedRepetition &&
                    <TutorialSpacedRep />
				}
				<div onClick={() => setTutorialSpacedRepetition(false)}>
					{tutorialSpacedRepetition && <Backdrop />}
				</div>

				{finished && <FinishedViewSpacedRep
					studiedFlashcards={studiedFlashcards}
					incorrectFlashcards={incorrectFlashcards} />}
			</main>
			<Footer />
		</>
	);
}

export default SpacedRepMode;