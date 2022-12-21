import './home.css';
import memoriterLogo from '../../../images/memoriter-logo.svg';
import SettingsIcon from '../../settings/SettingsIcon';
import archiveIcon from '../../../images/icons/archive-icon.svg';
import Backdrop from '../../../components/backdrops/backdrop';
import Folder from '../folderStuff/folder/folder';
import FolderForm from '../folderStuff/folder-form/folder-form';
import Footer from '../../../components/footer';
import { firebase } from '../../../technical/utils/firebase'
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
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import ArchivedFolders from '../archive-folders/archived-folders';
const { db } = firebase;

//this file is the home page of the app where you see all your folders
//it uses some css from home.css
function HomePage() {
  //user stuff
  const [user, setUser] = useState({});
  const auth = getAuth();

  //firestore stuff
  // connection to the folders firestore
  const foldersCollectionRef = query(
    collection(db, 'folders'),
    where('user', '==', auth.currentUser.uid)
  );

  onAuthStateChanged(firebase.auth, (currentUser) => {
    setUser(currentUser);
  });

  const [folders, setFolders] = useState([]); //saves the data of folders in an array

  //Use Effect für folders
  useEffect(() => {
    const getFolder = async () => {
      const allFolders = await getDocs(foldersCollectionRef); //returns all folders from the firestore
      setFolders(allFolders.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getFolder();
    localStorage.setItem('lastPage', '/');
  }, []); // do not add dependencies, otherwise it will loop

  const [modalIsOpen, setModalIsOpen] = useState(false); //state to check if the modal is open or not

  //Folder Position
  folders.sort(function (a, b) {
    return a.pos - b.pos;
  }); //Sorting Folders

  const posUp = async (id, pos) => {
    //Position Up
    const folderDoc = doc(db, 'folders', id);
    const newPosUp = { pos: pos - 1 };

    await updateDoc(folderDoc, newPosUp);

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

  const posDown = async (id, pos) => {
    //Position Down
    const folderDoc = doc(db, 'folders', id);
    const newPosDown = { pos: pos + 1 };

    await updateDoc(folderDoc, newPosDown);

    setFolders(
      folders.map((folder) =>
        folder.id === id
          ? { ...folder, pos: folder.pos + 1 }
          : folder.pos === pos + 1
            ? (sessionStorage.setItem('newPosFolder', folder.id), { ...folder, pos: folder.pos - 1 })
            : folder
      )
    );
  };

  const posAdjust = async (id, pos) => {
    //Adjust Position
    const folderDoc = doc(db, 'folders', id);
    const newPosAdjust = { pos: pos };

    await updateDoc(folderDoc, newPosAdjust);
  };

  //Add Folder
  const addFolder = async (title) => {
    const pos = folders.length + 1
    await addDoc(collection(db, 'folders'), { pos, title: title, user: user.uid, archived: false })

    const allFolders = await getDocs(foldersCollectionRef);
    setFolders(allFolders.docs.map((doc) => ({ ...doc.data(), id: doc.id }))); //Aktualisieren der Ordner

    setModalIsOpen(false);
  };

  //Delete Folder
  const deleteFolder = async (id, pos) => {
    const folderDoc = doc(db, 'folders', id);
    await deleteDoc(folderDoc);

    setFolders((folders) =>
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
    const flashcardsCollectionRef = collection(db, 'flashcards'); //link to flashcard-collection
    const q = query(flashcardsCollectionRef, where('syncedFolder', '==', id)); //Variable zur Filtrierung nach den richtigen flashcards
    const snapshot = await getDocs(q); //gefilterte flashcards werden abgefragt

    const results = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })); //Aufsplitten des arrays zu einzelnen objects
    results.forEach(async (result) => {
      //für jedes object wird die function ausgelöst
      const flashcardDocRef = doc(db, 'flashcards', result.id); //Definition der Zieldaten (flashcards, die gelöscht werden)
      await deleteDoc(flashcardDocRef); //Zieldaten werden gelöscht
    });
  };

  //Edit Folder
  const editFolder = async (id, title) => {
    const folderDoc = doc(db, 'folders', id);
    const newTitle = { title: title };
    await updateDoc(folderDoc, newTitle);
    setFolders(folders.map((folder) => (folder.id === id ? { ...folder, title: title } : folder)));
  };

  // archive folder
  const archiveFolder = async (id) => {
    const folderDoc = doc(db, 'folders', id);
    await updateDoc(folderDoc, { archived: true });
    setFolders(
      folders.map((folder) => (folder.id === id ? { ...folder, archived: true } : folder))
    );
  };

  // de-archive folder
  const dearchiveFolder = async (id) => {
    const folderDoc = doc(db, 'folders', id);
    await updateDoc(folderDoc, { archived: false });
    setFolders(
      folders.map((folder) => (folder.id === id ? { ...folder, archived: false } : folder))
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
        <div className='rechteck'>
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
          <div className='Folder_Base'>
            <>
              {folders.length > 0 ? (
                <div />
              ) : (
                <div className='No_Folder_Text'>
                  Currently there are no folders. Please create one...
                </div>
              )}
              {folders
                .filter((folder) => !folder.archived)
                .map((folder) => (
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
                  />
                ))}
            </>

            <div folders={folders}>
              <div className='New_Folder_Body'>
                <div className='New_Folder_Line'></div>
                <button
                  className='Button_New_Folder'
                  onClick={() => {
                    setModalIsOpen(true);
                  }}
                >
                  <div className='New_Folder_Plus_h'></div>
                  <div className='New_Folder_Plus_v'></div>
                </button>
                <button className='New_Folder_Text' onClick={() => setModalIsOpen(true)}>Create new folder</button>
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
