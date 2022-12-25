import './folder.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Confirm from '../../../../components/confirm/confirm';
import Backdrop from '../../../../components/backdrops/backdrop';
import FolderForm from '../form-folder/folder-form';
import FolderSettings from '../settings-folder/folder-settings';
import { firebase } from '../../../../technical/utils/firebase';
import {
    collection, //set of database documents
    getDocs, //gets all documents from a collection
    addDoc, //adds a document to a collection
    updateDoc, //updates a document in a collection
    deleteDoc, //deletes a document from a collection
    doc, //a single document in a collection
    query,
    where,
} from 'firebase/firestore/lite';
const { db } = firebase;

const Folder = ({
    folder,
    onDeleteFolder,
    onEditFolder,
    onPosUp,
    onPosDown,
    folderCount,
    onPosAdjust,
    onArchiveFolder,
    onDearchiveFolder,
}) => {

    // due number
    // link to db
    const flashcardCollectionReferance = query(
        collection(db, 'flashcards'),
        where('syncedFolder', '==', folder.id)
    ); //gets all flashcards from the synced folder

    const [due, setDue] = useState([]); //creates the flashcard state

    //Use Effect fot notes resets the notes state when the page is loaded
    useEffect(() => {
        const getFlashcards = async () => {
            //gets all flashcards from the synced folder
            const allFlashcards = await getDocs(flashcardCollectionReferance);
            setDue(allFlashcards.docs
                .map((doc) => ({ ...doc.data(), id: doc.id }))

            );
        };
        getFlashcards(); //calls the function
        sessionStorage.setItem('flashcard-content', '');
        localStorage.setItem('lastPage', '/topic');
    }, []); // do not add dependencies, otherwise it will loop

    // filters the flashcards for only the not studied ones to show up
    const [filtered, setFiltered] = useState(false);
    if (due.length > 0 && !filtered) {
        setDue([
            ...due
                .filter((flashcard) => (flashcard.nextDate && flashcard.nextDate.toDate() <= new Date()) || !flashcard.nextDate)
        ]);
        setFiltered(true);
    }

    // cache folder values if folder is clicked
    const onOpenFolder = () => {
        localStorage.setItem('syncedFolderID', folder.id); //set the folder id in local storage
        localStorage.setItem('syncedFolderTitle', folder.title); //set the folder title in local storage
    };

    //States to check if a modal is open or not
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);


    // function when the folder is edited
    const editFolder = (newTitle) => {
        onEditFolder(folder.id, newTitle);
        setEditModal(false);
    };


    const [pos, setPos] = useState(folder.pos); // pos is the state of the position of the folder
    // if the position of the folder is not the same as the state of the position of the folder
    if (folder.pos !== pos) {
        setPos(folder.pos); // set the state of the position of the folder to the position of the folder
    }

    const newPosId = sessionStorage.getItem('newPosFolder'); // get the id of the folder that has the new position
    const newPosIdDelete = sessionStorage.getItem('newPosFolder' + folder.id); // get the id of the folder that has the new position

    // if the id of the folder that has the new position is the same as the id of the folder
    if (newPosId === folder.id) {
        onPosAdjust(folder.id, folder.pos); //adjust the position of the folder
        sessionStorage.removeItem('newPosFolder'); //remove the id of the folder that has the new position from the session storage
    } else if (newPosIdDelete === folder.id) {
        //if the id of the folder that has the new position is the same as the id of the folder
        onPosAdjust(folder.id, folder.pos); //adjust the position of the folder
        sessionStorage.removeItem('newPosFolder' + folder.id); //remove the id of the folder that has the new position from the session storage
    }


    return (
        <section className='folder'>
            <Link to='/topic' onClick={onOpenFolder}>
                <button className='button-homepage' />
                {folder.title !== '' ? ( // checks if the title of the folder is not empty
                    <button className='button-homepage-text'>{folder.title}</button>
                ) : (
                    <button className='button-homepage-text'>New folder</button>
                )}
            </Link>

            <div className='new-cards-indicator'>
                <Link to='/study-spaced-repetition' className='indicator'>
                    <p className='indicator-number'>{due.length}</p>
                </Link>
            </div>

            <div
                className='folder-pos-body-up'
                onClick={() => {
                    if (pos > 1) {
                        setPos(pos - 1);
                        onPosUp(folder.id, pos);
                    }
                }}
            >
                <div className='folder-pos-arrow-up' />
            </div>
            <div
                className='folder-pos-body-down'
                onClick={() => {
                    if (pos < folderCount) {
                        setPos(pos + 1);
                        onPosDown(folder.id, pos);
                    }
                }}
            >
                <div className='folder-pos-arrow-down' />
            </div>
            <div className='button-homepage-settings' style={{ transform: 'rotate(90deg)' }} onClick={() => { setModalIsOpen(true); }}>
                <span className='dot' />
                <span className='dot' />
                <span className='dot' />
            </div>

            {modalIsOpen && (
                <FolderSettings
                    folder={folder}
                    editFolderReq={() => { setEditModal(true); setModalIsOpen(false); }}
                    deleteFolderReq={() => { setDeleteModal(true); setModalIsOpen(false); }}
                    onArchive={onArchiveFolder}
                    onDearchive={onDearchiveFolder}
                />
            )}

            {editModal && (
                <FolderForm
                    type='Edit'
                    folder={folder}
                    onCancel={() => setEditModal(false)}
                    onConfirm={editFolder}
                />
            )}

            {deleteModal && (
                <Confirm
                    title='Do you really want to delete this folder?'
                    onConfirm={() => onDeleteFolder(folder.id, folder.pos)}
                    onCancel={() => setDeleteModal(false)}
                />
            )}

            <div onClick={() => { setModalIsOpen(false); }}>{modalIsOpen && <Backdrop />}</div>
        </section>
    );
};
export default Folder;
