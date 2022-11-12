import '../css/home.css';
import memoriterLogo from '../images/memoriter-logo.svg';
import SettingsIcon from '../components/Settings/SettingsIcon';
import Folder from '../components/home/folder';
import FolderForm from '../components/home/folder-form';
import Footer from '../components/layout/footer';
import { firebase } from '../utils/firebase'
import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore/lite';
import { getAuth, onAuthStateChanged } from "firebase/auth";
const { db } = firebase;

//this file is the home page of the app where you see all your folders
//it uses css from home.css
function HomePage() {

  //user stuff
  const [user, setUser] = useState({});

  const auth = getAuth();

  //firestore stuff
  // connection to the folders firestore
  const foldersCollectionRef = query(collection(db, "folders"), where("user", "==", auth.currentUser.uid));

  onAuthStateChanged(firebase.auth, (currentUser) => {
    setUser(currentUser);
  })

  
  // Folder Data
  const [folders, setFolders] = useState([])

  //Use Effect für folders
  useEffect(() => {
    const getFolder = async () => {
      const allFolders = await getDocs(foldersCollectionRef) //gibt alles aus einer bestimmten Collection aus
      setFolders(allFolders.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    };

    getFolder();
    localStorage.setItem('lastPage', '/');
  }, []) // do not add dependencies, otherwise it will loop

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function NewFolderClick() {
    setModalIsOpen(true);
  };

  //Folder Position
  folders.sort(function (a, b) { return a.pos - b.pos }) //Sorting Folders

  const posUp = async (id, pos) => { //Position Up
    const folderDoc = doc(db, 'folders', id);
    const newPosUp = { pos: pos - 1 };

    await updateDoc(folderDoc, newPosUp);

    setFolders(folders.map((folder) => folder.id === id
      ? { ...folder, pos: (folder.pos - 1) } : folder.pos === (pos - 1)
        ? (sessionStorage.setItem('newPosFolder', folder.id),
          { ...folder, pos: (folder.pos + 1) }) : folder))
  }

  const posDown = async (id, pos) => { //Position Down
    const folderDoc = doc(db, 'folders', id);
    const newPosDown = { pos: pos + 1 };

    await updateDoc(folderDoc, newPosDown);

    setFolders(folders.map((folder) => folder.id === id
      ? { ...folder, pos: (folder.pos + 1) } : folder.pos === (pos + 1)
        ? (sessionStorage.setItem('newPosFolder', folder.id),
          { ...folder, pos: (folder.pos - 1) }) : folder))
  }

  const posAdjust = async (id, pos) => { //Adjust Position
    const folderDoc = doc(db, 'folders', id);
    const newPosAdjust = { pos: pos };

    await updateDoc(folderDoc, newPosAdjust);
  }

  //Add Folder
  const addFolder = async (title) => {
    const pos = folders.length + 1
    await addDoc(collection(db, 'folders'), { pos, title: title, user: user.uid })

    const allFolders = await getDocs(foldersCollectionRef)
    setFolders(allFolders.docs.map((doc) => ({ ...doc.data(), id: doc.id }))) //Aktualisieren der Ordner

    setModalIsOpen(false)
  }

  //Delete Folder
  const deleteFolder = async (id, pos) => {
    const folderDoc = doc(db, 'folders', id);
    await deleteDoc(folderDoc);

    setFolders((folders) =>
      folders
        .map((folder) =>
          folder.pos > pos
            ? (sessionStorage.setItem('newPosFolder' + folder.id, folder.id),
              { ...folder, pos: folder.pos - 1 }) : folder
        )
        .filter((folder) => folder.id !== id)
    )

    //delete folder flashcards stuff
    const flashcardsCollectionRef = collection(db, "flashcards"); //link zur flashcard-collection
    const q = query(flashcardsCollectionRef, where("syncedFolder", "==", id)); //Variable zur Filtrierung nach den richtigen flashcards
    const snapshot = await getDocs(q); //gefilterte flashcards werden abgefragt

    const results = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })); //Aufsplitten des arrays zu einzelnen objects
    results.forEach(async (result) => { //für jedes object wird die function ausgelöst
      const flashcardDocRef = doc(db, "flashcards", result.id); //Definition der Zieldaten (flashcards, die gelöscht werden)
      await deleteDoc(flashcardDocRef); //Zieldaten werden gelöscht
    })
  }


  //Edit Folder
  const editFolder = async (id, title) => {
    const folderDoc = doc(db, 'folders', id);
    const newTitle = { title: title };
    await updateDoc(folderDoc, newTitle);
    setFolders(folders.map((folder) => folder.id === id
      ? { ...folder, title: title } : folder))
  }

  return (
    <>
      <header className='page-header'>
        <h1 className="page-title">Home</h1>
        <img className="header-logo" src={memoriterLogo} alt="site-logo" />
      </header>
      <main>
        <div className="rechteck">
          <section>
            
            <SettingsIcon />
            <span className='spaced-rep-subtitles'>
              <span>Due</span>
            </span>
            <div className="main-seperator"></div>
          </section>
          <div className='Folder_Base'>
            <>
              {folders.length > 0 ? (<div />) : (<div className='No_Folder_Text'>Currently there are no folders. Please create one...</div>)}
              {folders
                .map((folder) => (
                  <Folder key={folder.id} folder={folder} folderCount={folders.length}
                    onDeleteFolder={deleteFolder} onEditFolder={editFolder}
                    onPosUp={posUp} onPosDown={posDown} onPosAdjust={posAdjust} />)
                )}
            </>
            
            <div folders={folders}>
              <div className='New_Folder_Body'>
                
                <div className='New_Folder_Line'></div>
                <button className='Button_New_Folder' onClick={NewFolderClick}>
                  <div className='New_Folder_Plus_h'></div>
                  <div className='New_Folder_Plus_v'></div>
                </button>
                <button className='New_Folder_Text' onClick={NewFolderClick}>Create new folder</button>
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