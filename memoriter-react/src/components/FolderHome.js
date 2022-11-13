import '../css/folderHome.css';
import SettingsFolder from './Settings/settings-folder';
import Backdrop from './backdrop';
import { useState } from 'react';
import { Link } from 'react-router-dom';

//I had to move everything into a function, because I couldn't get it to work otherwise
//The Css of the this file is inside folderHome.css

const FolderHome = ({ folder, onDeleteFolder, onEditFolder, onPosUp, onPosDown, folderCount, onPosAdjust }) => {

    function onOpenFolder() { //function that gets called when the user clicks on a folder
        localStorage.setItem('syncedFolderID', folder.id) //set the folder id in local storage
        localStorage.setItem('syncedFolderTitle', folder.title) //set the folder title in local storage
    }

    const [modalIsOpen, setModalIsOpen] = useState(false); //modalIsOpen is the state of the modal if if is open or not

    function backdropClick() { //function that gets called when the user clicks on the backdrop and closes the modal
        setModalIsOpen(false); //must be inside of a function so that it can be called in child component (SettingsFolder)
    }

   
    function backdropClickEdit() { //function that gets called when the user clicks on the backdrop
        setTitle(folder.title); //must be made a function so that it can be called in child component (SettingsFolder)
    }

    const [title, setTitle] = useState(folder.title) //title is the state of the title of the folder
    const [pos, setPos] = useState(folder.pos) //pos is the state of the position of the folder

    if (folder.pos !== pos) { //if the position of the folder is not the same as the state of the position of the folder
        setPos(folder.pos)  //set the state of the position of the folder to the position of the folder
    }

    const newPosId = sessionStorage.getItem('newPosFolder'); //get the id of the folder that has the new position
    const newPosIdDelete = sessionStorage.getItem('newPosFolder' + folder.id) //get the id of the folder that has the new position

    if (newPosId === folder.id) { //if the id of the folder that has the new position is the same as the id of the folder
        onPosAdjust(folder.id, folder.pos); //adjust the position of the folder
        sessionStorage.removeItem('newPosFolder'); //remove the id of the folder that has the new position from the session storage
    } else if (newPosIdDelete === folder.id) { //if the id of the folder that has the new position is the same as the id of the folder
        onPosAdjust(folder.id, folder.pos); //adjust the position of the folder
        sessionStorage.removeItem('newPosFolder' + folder.id); //remove the id of the folder that has the new position from the session storage
    }

    return (
        <div className='folder-body'>
            <Link to='/topic' onClick={onOpenFolder}>
                <button className='button-homepage' />
                {folder.title !== '' ? ( //Check if the title of the folder is not empty
                    <button className='button-homepage-text'>{folder.title}</button>
                ) : (
                    <button className='button-homepage-text'>New Folder</button>
                )}
            </Link>

            <section>
                <span className='new-cards-indicator'>
                    <Link to='/study-spaced-repetition'>
                        <span className='indicator'>
                            <p className='indicator-number'>12</p>
                        </span>
                    </Link>
                </span>
            </section>

            <div className='folder-pos-body-up' onClick={
                () => { if (pos > 1) { setPos(pos - 1); onPosUp(folder.id, pos); } }
            }>
                <div className='folder-pos-arrow-up' />
            </div>
            <div className='folder-pos-body-down' onClick={
                () => { if (pos < folderCount) { setPos(pos + 1); onPosDown(folder.id, pos); } }
            }>
                <div className='folder-pos-arrow-down' />
            </div>
            <div className='button-homepage-settings' onClick={() => {setModalIsOpen(true)}}>
                <span className='dot' />
                <span className='dot' />
                <span className='dot' />
            </div>

            <div>
                {modalIsOpen && <SettingsFolder
                    title={title}
                    folder={folder}
                    onEditFolder={onEditFolder}
                    onDeleteFolder={onDeleteFolder}
                    backdropClickEdit={backdropClickEdit}
                    onChangeName={value => setTitle(value)}
                    backdropClick={backdropClick}
                />}
                <div onClick={backdropClick}>
                    {modalIsOpen && <Backdrop />}
                </div>
            </div>


        </div>
    );
}

export default FolderHome;