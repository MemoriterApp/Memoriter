import { useState } from 'react';
import Logo from './Logo.png';
import SettingsIcon from '../components/SettingsIcon';
import FolderHome from '../components/FolderHome';
import AddFolderForm from '../components/AddFolderForm';
import Backdrop from '../components/backdrop';
import Footer from '../components/Footer';

function HomePage() {

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function NewFolderClick() {
      setModalIsOpen(true);
  }
  function backdropClick() {
      setModalIsOpen(false);
  }

// Folder Data
  const [ folders, setFolders ] = useState([ ])

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
  const addFolder = (folder) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const pos = folders.length + 1
    const newFolderC = { id, pos, ...folder }
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
  const editFolder = (id, name) => {
    setFolders(folders.map((folder) => folder.id === id
    ? { ...folder, name: name } : folder))
  }

  return (
    <>
      <header>
        <h1 className="page_title">Home</h1>
        <img className="Logo-oben" src={Logo} alt="site-logo"></img>
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