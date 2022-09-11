import memoriterLogo from '../images/memoriter-logo.svg';
import SettingsIcon from '../components/SettingsIcon';
import FolderHome from '../components/FolderHome';
import AddFolderForm from '../components/AddFolderForm';
import Backdrop from '../components/backdrop';
import Footer from '../components/Footer';
import { firebase } from '../utils/firebase'
import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore/lite';
import { onAuthStateChanged } from "firebase/auth";
const { db } = firebase;


function HomePage() {

  //firestore stuff
  // connection to the folders firestore
  const foldersCollectionRef = collection(db, "folders");

  //user stuff
  const [user, setUser] = useState({})

  onAuthStateChanged(firebase.auth, (currentUser) => {
    setUser(currentUser);
  })

  // Folder Data
  const [folders, setFolders] = useState([])

  //show correct folders
  const [renderedFolder, setRenderedFolder] = useState(true);

  if (renderedFolder === false) {
    setFolders(folders.filter((folder) => folder.user === user.uid));
    setRenderedFolder(true);
  }

  //Use Effect für folders
  useEffect(() => {
    const getFolder = async () => {
      const allFolders = await getDocs(foldersCollectionRef) //gibt alles aus einer bestimmten Collection aus
      setFolders(allFolders.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      setRenderedFolder(false)
    };

    getFolder();
    localStorage.setItem('lastPage', "/");
  }, [])

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function NewFolderClick() {
    setModalIsOpen(true);
  }
  function backdropClick() {
    setModalIsOpen(false);
  }

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
  const addFolder = async (folder) => {
    const pos = folders.length + 1
    await addDoc(foldersCollectionRef, { pos, title: folder.title, user: user.uid })

    const allFolders = await getDocs(foldersCollectionRef)
    setFolders(allFolders.docs.map((doc) => ({ ...doc.data(), id: doc.id }))) //Aktualisieren der Ordner
    setRenderedFolder(false)

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
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name='keywords' content='memoriter, study, files, subjects, overview'></meta>
        <meta name='description' content='Homepage for Memoriter'></meta>
      </head>
      <header className='Page_Header'>
        <h1 className="page_title">Home</h1>
        <img className="Logo-oben" src={memoriterLogo} alt="site-logo" />
      </header>
      <body>
        <div className="rechteck">
          <h2 className="File-Overview">File Overview</h2>
          <SettingsIcon />
          <div className="main-seperator"></div>

          <div className='Folder_Base'>

            <>
              {folders.length > 0 ? (<div />) : (<div className='No_Folder_Text'>Currently there are no folders. Please create one...</div>)}
              {folders
                .map((folder) => (
                  <FolderHome key={folder.id} folder={folder} folderCount={folders.length}
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
                <button className='New_Folder_Text' onClick={NewFolderClick}>Create New Folder</button>
                <div>
                  {modalIsOpen && <AddFolderForm onAddFolder={addFolder} />}
                </div>
                <div onClick={backdropClick}>
                  {modalIsOpen && <Backdrop />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default HomePage;