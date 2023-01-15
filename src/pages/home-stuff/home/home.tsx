import './home.css';
import memoriterLogo from '../../../images/memoriter-logo.svg';
import SettingsIcon from '../../settings/settings-icon/SettingsIcon';
import archiveIcon from '../../../images/icons/archive-icon.svg';
import Backdrop from '../../../components/backdrops/backdrop/backdrop';
import Folder from '../folder-stuff/folder/folder';
import FolderForm from '../folder-stuff/form-folder/folder-form';
import Footer from '../../../components/footer/footer';
import { firebase, getFlashcards, getFolder, getFolders, insertFolder, removeFlashcard, removeFolder, updateFolder } from '../../../technical/utils/firebase';
import { useState, useEffect } from 'react';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    where,
} from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth';
import ArchivedFolders from '../archive-folders/archived-folders';
import * as Type from "../../../types";

//this file is the home page of the app where you see all your folders
//it uses some css from home.css
function HomePage() {
    //user stuff
    const auth = getAuth();

    const [folders, setFolders] = useState<any>([]); //saves the data of folders in an array

    //Use Effect für folders
    useEffect(() => {
        async function getFolder () {
            const allFolders = await getFolders(auth.currentUser.uid); //returns all folders from the firestore
            setFolders(allFolders);
        }
        getFolder();
        localStorage.setItem('lastPage', '/');
    }, []); // do not add dependencies, otherwise it will loop

    const [modalIsOpen, setModalIsOpen] = useState(false); //state to check if the modal is open or not

    //Folder Position
    folders.sort(function (a, b) {
        return a.pos - b.pos;
    }); //Sorting Folders

    const posUp = async (id: string, pos: number) => {
    //Position Up
        const newPosUp = { pos: pos - 1 };
        await updateFolder(await getFolder(id), newPosUp);

        setFolders(
            folders.map((folder) =>
                folder.id === id
                    ? { ...folder, pos: folder.pos - 1 }
                    : folder.pos === pos - 1
                        ? (sessionStorage.setItem('newPosFolder', folder.id), { ...folder, pos: folder.pos + 1 })
                        : folder
            )
        );
    };

    const posDown = async (id: string, pos: number) => {
    //Position Down
        const newPosDown = { pos: pos + 1 };
        await updateFolder(await getFolder(id), newPosDown);

        setFolders(
            folders.map((folder: Type.Folder) =>
                folder.id === id
                    ? { ...folder, pos: folder.pos + 1 }
                    : folder.pos === pos + 1
                        ? (sessionStorage.setItem('newPosFolder', folder.id), { ...folder, pos: folder.pos - 1 })
                        : folder
            )
        );
    };

    const posAdjust = async (id: string, pos: any) => {
    //Adjust Position
        const newPosAdjust = { pos: pos };
        await updateFolder(await getFolder(id), newPosAdjust);
    };

    //Add Folder
    const addFolder = async (title: any) => {
        const pos = folders.length + 1;
        await insertFolder(title, pos);

        const allFolders = await getFolders(auth.currentUser.uid);
        setFolders(allFolders); //Aktualisieren der Ordner

        setModalIsOpen(false);
    };

    //Delete Folder
    const deleteFolder = async (id: string, pos: number) => {
        await removeFolder(id);

        setFolders((folders: Type.Folder[]) =>
            folders
                .map((folder) =>
                    folder.pos > pos
                        ? (sessionStorage.setItem('newPosFolder' + folder.id, folder.id),
                        { ...folder, pos: folder.pos - 1 })
                        : folder
                )
                .filter((folder) => folder.id !== id)
        );

        //delete folder flashcards stuff
        const flashcards = await getFlashcards(id);

        flashcards.forEach(async (flashcard) => {
            await removeFlashcard(flashcard.id);
        })
    };

    //Edit Folder
    const editFolder = async (id: string, title: any) => {
        const newTitle = { title: title };
        await updateFolder(await getFolder(id), newTitle);
        setFolders(folders.map((folder: Type.Folder) => (folder.id === id ? { ...folder, title: title } : folder)));
    };

    // archive folder
    const archiveFolder = async (id: string) => {
        await updateFolder(await getFolder(id), { archived: true });
        setFolders(
            folders.map((folder: Type.Folder) => (folder.id === id ? { ...folder, archived: true } : folder))
        );
    };

    // de-archive folder
    const dearchiveFolder = async (id: string) => {
        await updateFolder(await getFolder(id), { archived: false });
        setFolders(
            folders.map((folder: Type.Folder) => (folder.id === id ? { ...folder, archived: false } : folder))
        );
    };

    const [archiveFolderIsOpen, setArchiveFolderIsOpen] = useState(false); //state to check if the archive folder is open or not

    return (
        <>
            <header className='page-header'>
                <h1 className='page-title'>Home</h1>
                <img className='header-logo' src={memoriterLogo} alt='site-logo' />
            </header>
            <main>
                <div className='square'>
                    <section>
                        <img
                            src={archiveIcon}
                            className='archive-icon'
                            alt=''
                            title='Archive'
                            onClick={() => {
                                setArchiveFolderIsOpen(true);
                            }}
                        ></img>
                        {archiveFolderIsOpen && (
                            <div>
                                <ArchivedFolders
                                    folders={folders}
                                    onDeleteFolder={deleteFolder}
                                    onEditFolder={editFolder}
                                    onDearchiveFolder={dearchiveFolder}
                                    onPosUp={posUp}
                                    onPosDown={posDown}
                                    onPosAdjust={posAdjust}
                                />
                                <Backdrop
                                    onClick={() => {
                                        setArchiveFolderIsOpen(false);
                                    }}
                                />
                            </div>
                        )}
                        <SettingsIcon />
                        <span className='spaced-rep-subtitles'>
                            <span>Due</span>
                        </span>
                        <div className='main-seperator'></div>
                    </section>
                    <div className='folder-base'>
                        <>
                            {folders.length > 0 ? (
                                <div />
                            ) : (
                                <div className='no-folder-text'>
                  Currently there are no folders. Please create one...
                                </div>
                            )}
                            {folders
                                .filter((folder: Type.Folder) => !folder.archived)
                                .map((folder: Type.Folder) => (
                                    <Folder
                                        key={folder.id}
                                        folder={folder}
                                        folderCount={folders.length}
                                        onDeleteFolder={deleteFolder}
                                        onEditFolder={editFolder}
                                        onArchiveFolder={archiveFolder}
                                        onPosUp={posUp}
                                        onPosDown={posDown}
                                        onPosAdjust={posAdjust}
                                        onDearchiveFolder={undefined} />
                                ))}
                        </>

                        <div data-folders={folders}>
                            <div className='new-folder-body'>
                                <div className='new-folder-line'></div>
                                <button
                                    className='button-new-folder'
                                    onClick={() => {
                                        setModalIsOpen(true);
                                    }}
                                >
                                    <div className='new-folder-plus-h'></div>
                                    <div className='new-folder-plus-v'></div>
                                </button>
                                <button className='new-folder-text' onClick={() => setModalIsOpen(true)}>Create new folder</button>
                                <div>
                                    {modalIsOpen && <FolderForm type='Create new' folder={{ title: '' }} onConfirm={addFolder} onCancel={() => setModalIsOpen(false)} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default HomePage;
