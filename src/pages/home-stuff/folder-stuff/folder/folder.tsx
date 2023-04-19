import './folder.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Confirm from '../../../../components/confirm/confirm';
import Backdrop from '../../../../components/backdrops/backdrop/backdrop';
import FolderForm from '../form-folder/folder-form';
import FolderSettings from '../settings-folder/folder-settings';
import ShareFolderPopUp from '../share-folder/share-folder-pop-up';
import * as Type from '../../../../types';
import { getFlashcards } from '../../../../technical/utils/mongo';
import share from '../../../../images/share.svg';

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
}: {
    folder: any,
    onDeleteFolder: any,
    onEditFolder: any,
    onPosUp: any,
    onPosDown: any,
    folderCount: any,
    onPosAdjust: any,
    onArchiveFolder: any,
    onDearchiveFolder: any,
}) => {

    const [due, setDue] = useState<any>([]); //creates the flashcard state

    //Use Effect fot notes resets the notes state when the page is loaded
    useEffect(() => {
        const syncFlashcards = async () => {
            //gets all flashcards from the synced folder
            const allFlashcards = await getFlashcards(folder._id);
            setDue(allFlashcards);
        };
        syncFlashcards(); //calls the function
        sessionStorage.setItem('flashcard-content', '');
        localStorage.setItem('lastPage', '/topic:folderID');
    }, []); // do not add dependencies, otherwise it will loop

    // filters the flashcards for only the not studied ones to show up
    const [filtered, setFiltered] = useState(false);
    if (due.length > 0 && !filtered) {
        setDue([
            ...due
                .filter((flashcard: Type.Flashcard) => (flashcard.nextDate && flashcard.nextDate <= new Date().getTime()) || !flashcard.nextDate)
        ]);
        setFiltered(true);
    }
    // changes the background color of the indicator if a lot of cards are due
    const backgroundColor =
        due.length > 100
            ? 'var(--current-red)'
            : due.length > 50
                ? 'var(--current-blue-dark)'
                : 'var(--current-gray-medium-dark)';

    // cache folder values if folder is clicked
    const onOpenFolder = () => {
        localStorage.setItem('folderID', folder._id); //set the folder id in local storage
        localStorage.setItem('folderTitle', folder.title); //set the folder title in local storage
    };

    //States to check if a modal is open or not
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    // function when the folder is edited
    const editFolder = (newTitle: string) => {
        onEditFolder(folder._id, newTitle);
        setEditModal(false);
    };

    const [pos, setPos] = useState(folder.pos); // pos is the state of the position of the folder
    // if the position of the folder is not the same as the state of the position of the folder
    if (folder.pos !== pos) {
        setPos(folder.pos); // set the state of the position of the folder to the position of the folder
    }

    const newPosId = sessionStorage.getItem('newPosFolder'); // get the id of the folder that has the new position
    const newPosIdDelete = sessionStorage.getItem('newPosFolder' + folder._id); // get the id of the folder that has the new position

    // if the id of the folder that has the new position is the same as the id of the folder
    if (newPosId === folder._id) {
        onPosAdjust(folder._id, folder.pos); //adjust the position of the folder
        sessionStorage.removeItem('newPosFolder'); //remove the id of the folder that has the new position from the session storage
    } else if (newPosIdDelete === folder._id) {
        //if the id of the folder that has the new position is the same as the id of the folder
        onPosAdjust(folder._id, folder.pos); //adjust the position of the folder
        sessionStorage.removeItem('newPosFolder' + folder._id); //remove the id of the folder that has the new position from the session storage
    }

    let folderID = localStorage.getItem('folderID'); //gets the id of the synced folder

    // useState to check if the share modal is open or not
    const [shareModal, setShareModal] = useState(false);

    return (
        <section className='folder'>
            <Link to={'/topic/' + folderID} onClick={onOpenFolder}>
                <button className='button-homepage' />
                {folder.title !== '' ? ( // checks if the title of the folder is not empty
                    <button className='button-homepage-text'>{folder.title}</button>
                ) : (
                    <button className='button-homepage-text'>New folder</button>
                )}
            </Link>

            <div className='new-cards-indicator'>
                <Link
                    to='/study-spaced-repetition'
                    className='indicator'
                    style={{ backgroundColor }}>
                    <p className='indicator-number'>{due.length}</p>
                </Link>
            </div>

            <div>
                <img
                    onClick={() => { setShareModal(true) }}
                    className='share-icon'
                    src={share}
                />
            </div>

            {shareModal && <ShareFolderPopUp />}
            {shareModal && <Backdrop onClick={() => { setShareModal(false) }} />}

            <div
                className='folder-pos-body-up'
                onClick={() => {
                    if (pos > 1) {
                        setPos(pos - 1);
                        onPosUp(folder._id, pos);
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
                        onPosDown(folder._id, pos);
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

            {
                modalIsOpen && (
                    <>
                        <FolderSettings
                            folder={folder}
                            editFolderReq={() => { setEditModal(true); setModalIsOpen(false); }}
                            deleteFolderReq={() => { setDeleteModal(true); setModalIsOpen(false); }}
                            onArchive={onArchiveFolder}
                            onDearchive={onDearchiveFolder}
                        />
                        <Backdrop onClick={() => setModalIsOpen(false)} />
                    </>
                )
            }

            {
                editModal && (
                    <FolderForm
                        type='Edit'
                        folder={folder}
                        onCancel={() => setEditModal(false)}
                        onConfirm={editFolder}
                    />
                )
            }

            {
                deleteModal && (
                    <Confirm
                        title='Do you really want to delete this folder?'
                        onConfirm={() => onDeleteFolder(folder) && setDeleteModal(false)}
                        onCancel={() => setDeleteModal(false)}
                    />
                )
            }
        </section >
    );
};
export default Folder;
