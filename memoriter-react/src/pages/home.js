
import Logo from './Logo.png';
import SettingsIcon from '../components/SettingsIcon';
import FolderHome from '../components/FolderHome';
import AddFolderForm from '../components/AddFolderForm';
import Backdrop from '../components/backdrop';
import Footer from '../components/Footer';
import { firebase } from '../utils/firebase'
import { useState, useEffect } from 'react';
import { async } from '@firebase/util';
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore/lite';
const { db } = firebase;


function HomePage() {

  //firestore stuff
  // connection to the folders firestore
  const foldersCollectionRef = collection(db, "folders");

// Folder Data
const [ folders, setFolders ] = useState([ ])
const [newFolder, setNewFolder] = useState("");

//Use Effect für folders
useEffect(() => {
  const getFolder = async () => {
      const allFolders = await getDocs(foldersCollectionRef) //gibt alles aus einer bestimmten Collection aus
      setFolders(allFolders.docs.map((doc)=>({...doc.data(), id: doc.id })))
  };
  
  getFolder();
}, [])

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function NewFolderClick() {
      setModalIsOpen(true);
  }
  function backdropClick() {
      setModalIsOpen(false);
  }



//Folder Position
  folders.sort(function(a, b){return a.pos - b.pos})

  const posUp = (id, pos) => {
    setFolders(folders.map((folder) => folder.id === id
    ? { ...folder, pos: (folder.pos - 1) } : folder.pos === (pos - 1)
    ? { ...folder, pos: (folder.pos + 1) } : folder ))
  }

  const posDown = (id, pos) => {
    setFolders(folders.map((folder) => folder.id === id
    ? { ...folder, pos: (folder.pos + 1) } : folder.pos === (pos + 1)
    ? { ...folder, pos: (folder.pos - 1) } : folder ))
  }

//Add Folder
  const addFolder = async (folder) => {
    const pos = folders.length + 1
    const newFolderC = {pos, ...folder }
    await addDoc(foldersCollectionRef, {pos, title: folder.title} )
    setFolders([...folders, newFolderC])
    setModalIsOpen(false)
  }

//Delete Folder
  const deleteFolder = (id, pos) => {
    setFolders((folders) =>
      folders
        .map((folder) =>
          folder.pos > pos ? { ...folder, pos: folder.pos - 1 } : folder
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
      <header className='Page_Header'>
        <h1 className="page_title">Home</h1>
        <img className="Logo-oben" src={Logo} alt="site-logo" />
      </header>
      <div className="rechteck">
        <h2 className="File-Overview">File Overview</h2>
          <SettingsIcon />
        <div className="main-seperator"></div>

        <div className='Folder_Base'>
              {folders.length > 0 ?
              <>
                {folders.map((folder) => (
                  <FolderHome key={folder.id} folder={folder} folderCount={folders.length}
                    onDeleteFolder={deleteFolder} onEditFolder={editFolder}
                    onPosUp={posUp} onPosDown={posDown} />
                ))}
              </> : 
              <div className='No_Folder_Text'>Currently there are no folders. Please create one...</div>}
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
                  <div  onClick={backdropClick}>
                      {modalIsOpen && <Backdrop/>}
                  </div>
                </div>
              </div>
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default HomePage;