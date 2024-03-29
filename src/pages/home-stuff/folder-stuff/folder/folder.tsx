import './folder.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Picker from '@emoji-mart/react';
import Confirm from '../../../../components/confirm/confirm';
import Backdrop from '../../../../components/backdrops/backdrop/backdrop';
import FolderForm from '../form-folder/folder-form';
import FolderSettings from '../settings-folder/folder-settings';
import * as Type from '../../../../types';
import { getFlashcards } from '../../../../technical/utils/mongo';
import placeholderFolder from '../../../../images/placeholder-folder.svg';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import dragHandle from '../../../../images/drag-handle.svg';


const Folder = ({
    folder,
    onDeleteFolder,
    onEditFolder,
    onArchiveFolder,
    onChangeFolderIcon,
    onFavoriteFolder,
    onUnfavoriteFolder,
}: {
    folder: any,
    id: any,
    onDeleteFolder: any,
    onEditFolder: any,
    folderCount: any,
    onArchiveFolder: any,
    onChangeFolderIcon: any,
    onFavoriteFolder: any,
    onUnfavoriteFolder: any,
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
        localStorage.setItem('lastPage', '/topic');
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
        localStorage.setItem('folderTitle', folder.title); //set the folder title in local storage
        localStorage.setItem('folderFavorite', folder.favorite); //set the folder favorite state in local storage
    };

    //States to check if a modal is open or not
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    // function when the folder is edited
    const editFolder = (newTitle: string) => {
        onEditFolder(folder._id, newTitle);
        setEditModal(false);
    };

    const [pos, setPos] = useState(folder.pos);

    if (folder.pos !== pos) {
        setPos(folder.pos);
    }

    const addEmoji = (emoji: any) => {
        onChangeFolderIcon(folder._id, emoji.unified);
        setShowEmojiPicker(false);
    };

    //everything related to the drag and drop
    const { attributes, listeners, setNodeRef, transform, transition, setActivatorNodeRef } = useSortable({ id: folder._id });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <section
            className='folder'
            ref={setNodeRef}
            style={style}
            {...attributes}
        >
            <button className='folder-icon' onClick={() => setShowEmojiPicker(true)}>
                {folder.icon === '' || folder.icon === undefined ? (
                    <img src={placeholderFolder} alt='placeholder icon' style={{ filter: 'var(--svg-invert-gray)' }} />
                ) : (
                    <img
                        src={`https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${folder.icon}.svg`}
                        alt='folder icon'
                    />
                )}
            </button>
            <Link to={'/topic/' + folder._id} onClick={onOpenFolder}>
                <div className='open-folder'>
                    {folder.title !== '' ? ( // checks if the title of the folder is not empty
                        <p className='folder-text'>{folder.title}</p>
                    ) : (
                        <p className='folder-text'>New folder</p>
                    )}
                </div>
            </Link>

            <div className='new-cards-indicator'>
                <Link
                    to={'/spaced-repetition/' + folder._id}
                    className='indicator'
                    style={{ backgroundColor }}
                    onClick={onOpenFolder}>
                    <p className='indicator-number'>{due.length}</p>
                </Link>
            </div>

            <span>
                <img src={dragHandle} alt='handle-drag-image' className='drag-image' ref={setActivatorNodeRef} {...listeners}></img>
            </span>

            <div className='button-homepage-settings' style={{ transform: 'rotate(90deg)' }} onClick={() => { setModalIsOpen(true); }}>
                <span className='dot' />
                <span className='dot' />
                <span className='dot' />
            </div>

            {modalIsOpen && (
                <>
                    <FolderSettings
                        folder={folder}
                        editFolderReq={() => { setEditModal(true); setModalIsOpen(false); }}
                        deleteFolderReq={() => { setDeleteModal(true); setModalIsOpen(false); }}
                        onArchive={onArchiveFolder}
                        onChangeIcon={() => {onChangeFolderIcon(folder._id, ''); setModalIsOpen(false);}}
                        onFavoriteFolder={() => {onFavoriteFolder(folder._id); setModalIsOpen(false);}}
                        onUnfavoriteFolder={() => {onUnfavoriteFolder(folder._id); setModalIsOpen(false);}}
                    />
                    <Backdrop onClick={() => setModalIsOpen(false)} />
                </>
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
                    onConfirm={() => onDeleteFolder(folder) && setDeleteModal(false)}
                    onCancel={() => setDeleteModal(false)}
                />
            )}

            {showEmojiPicker && (
                <>
                    <Backdrop onClick={() => setShowEmojiPicker(false)} />
                    <div className='emoji-picker-container'>
                        <Picker
                            set='twitter'
                            previewPosition='none'
                            navPosition='none'
                            onEmojiSelect={addEmoji}
                        />
                    </div>
                </>
            )}
        </section>
    );
};
export default Folder;
