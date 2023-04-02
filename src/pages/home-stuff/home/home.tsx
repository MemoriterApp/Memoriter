import './home.css';
import memoriterLogo from '../../../images/memoriter-logo.svg';
import SettingsIcon from '../../settings/settings-icon/SettingsIcon';
import archiveIcon from '../../../images/icons/archive-icon.svg';
import Backdrop from '../../../components/backdrops/backdrop/backdrop';
import Folder from '../folder-stuff/folder/folder';
import FolderForm from '../folder-stuff/form-folder/folder-form';
import { getFlashcards, getFolders, insertFolder, removeFlashcard, removeFolder, updateFolder } from '../../../technical/utils/mongo';
import { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import ArchivedFolders from '../archive-folders/archived-folders';
import newFolder from '../../../images/new-folder.svg';
import * as Type from '../../../types';
import FooterButton from '../../../components/footer/footer-button/footer-button';

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
    folders.sort(function (a: Type.Folder, b: Type.Folder) {
        return a.pos - b.pos;
    }); //Sorting Folders

    const posUp = async (id: string, pos: number) => {
    //Position Up
        const newPosUp = { pos: pos - 1 };
        await updateFolder(id, newPosUp);

        setFolders(
            folders.map((folder: Type.Folder) => 
                folder._id === id
                    ? { ...folder, pos: folder.pos - 1 }
                    : folder.pos === pos - 1
                        ? (sessionStorage.setItem('newPosFolder', folder._id), { ...folder, pos: folder.pos + 1 })
                        : folder
            )
        );
    };

    const posDown = async (id: string, pos: number) => {
    //Position Down
        const newPosDown = { pos: pos + 1 };
        await updateFolder(id, newPosDown);

        setFolders(
            folders.map((folder: Type.Folder) =>
                folder._id === id
                    ? { ...folder, pos: folder.pos + 1 }
                    : folder.pos === pos + 1
                        ? (sessionStorage.setItem('newPosFolder', folder._id.toString()), { ...folder, pos: folder.pos - 1 })
                        : folder
            )
        );
    };

    const posAdjust = async (id: string, pos: any) => {
    //Adjust Position
        const newPosAdjust = { pos: pos };
        await updateFolder(id, newPosAdjust);
    };

    //Add Folder
    const addFolder = async (title: any) => {
        const pos = folders.length + 1;
        const icon = '';
        await insertFolder(title, icon, pos, auth.currentUser.uid);

        const allFolders = await getFolders(auth.currentUser.uid);
        setFolders(allFolders); //Aktualisieren der Ordner

        setModalIsOpen(false);
    };

    //Delete Folder
    const deleteFolder = async (oldFolder: Type.Folder) => {
        await removeFolder(oldFolder._id);

        setFolders((folders: Type.Folder[]) =>
            folders
                .map((folder) =>
                    folder.pos > oldFolder.pos
                        ? (sessionStorage.setItem('newPosFolder' + folder._id, folder._id),
                        { ...folder, pos: folder.pos - 1 })
                        : folder
                )
                .filter((folder) => folder._id !== oldFolder._id)
        );

        //delete folder flashcards stuff
        const flashcards = await getFlashcards(oldFolder._id);

        flashcards.forEach(async (flashcard) => {
            await removeFlashcard(flashcard._id);
        });
    };

    //Edit Folder
    const editFolder = async (id: string, title: any) => {
        const newTitle = { title: title };
        await updateFolder(id, newTitle);
        setFolders(folders.map((folder: Type.Folder) => (folder._id === id ? { ...folder, title: title } : folder)));
    };

    // archive folder
    const archiveFolder = async (id: string) => {
        await updateFolder(id, { archived: true });
        setFolders(
            folders.map((folder: Type.Folder) => (folder._id === id ? { ...folder, archived: true } : folder))
        );
    };

    // de-archive folder
    const dearchiveFolder = async (id: string) => {
        await updateFolder(id, { archived: false });
        setFolders(
            folders.map((folder: Type.Folder) => (folder._id === id ? { ...folder, archived: false } : folder))
        );
    };

    // change folder icon
    const changeFolderIcon = async (id: string, icon: any) => {
        const newIcon = { icon: icon };
        await updateFolder(id, newIcon);
        setFolders(folders.map((folder: Type.Folder) => (folder._id === id ? { ...folder, icon: icon } : folder)));
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
                                    onChangeFolderIcon={changeFolderIcon}
                                />
                                <Backdrop onClick={() => setArchiveFolderIsOpen(false)}/>
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
                                        key={folder._id}
                                        folder={folder}
                                        folderCount={folders.length}
                                        onDeleteFolder={deleteFolder}
                                        onEditFolder={editFolder}
                                        onArchiveFolder={archiveFolder}
                                        onPosUp={posUp}
                                        onPosDown={posDown}
                                        onPosAdjust={posAdjust}
                                        onDearchiveFolder={undefined}
                                        onChangeFolderIcon={changeFolderIcon} />
                                ))}
                        </>

                        <div data-folders={folders}>
                        <div className='new-folder-line'/>
                            <button className='new-folder-body' onClick={() => setModalIsOpen(true)}>
                                <div className='button-new-folder'>
                                    <img src={newFolder} alt='new folder'/>
                                </div>
                                <p className='new-folder-text'>Create new folder</p>
                                <div>
                                    {modalIsOpen && <FolderForm type='Create new' folder={{ title: '' }} onConfirm={addFolder} onCancel={() => setModalIsOpen(false)} />}
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <footer>
                <FooterButton />
            </footer>
        </>
    );
}

export default HomePage;
