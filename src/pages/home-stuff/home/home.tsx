import './home.css';
import Layout from '../../../components/layout/layout';
import SettingsIcon from '../../settings/settings-icon/SettingsIcon';
import Folder from '../folder-stuff/folder/folder';
import FolderForm from '../folder-stuff/form-folder/folder-form';
import { useRef, useState } from 'react';
import newFolder from '../../../images/new-folder.svg';
import * as Type from '../../../types';

//this file is the home page of the app where you see all your folders
//it uses some css from home.css
function HomePage() {

    const ref: { current: any } = useRef();

    const [folders, setFolders] = useState<any>([]); //saves the data of folders in an array

    const updateFolders = (updatedFolders: Type.Folder[]) => {
        setFolders(updatedFolders);
    }

    const [modalIsOpen, setModalIsOpen] = useState(false); //state to check if the modal is open or not

    const addFolder = (title: string) => {
        ref.current.onAddFolder(title);
        setModalIsOpen(false);
    }
    const posUp = (id: string, pos: number) => {
        ref.current.onPosUp(id, pos);
    }
    const posDown = (id: string, pos: number) => {
        ref.current.onPosDown(id, pos);
    }
    const posAdjust = (id: string, pos: number) => {
        ref.current.onFolderPositionAdjust(id, pos);
    }
    const editFolder = (id: string, title: string) => {
        ref.current.onEditFolder(id, title);
    }
    const changeFolderIcon = (id: string, icon: string) => {
        ref.current.onChangeFolderIcon(id, icon);
    }
    
    const archiveFolder = (id: string) => {
        ref.current.onArchiveFolder(id);
    }
    const deleteFolder = (folder: Type.Folder) => {
        ref.current.onDeleteFolder(folder);
    }

    return (
        <Layout ref={ref} path='home' onUpdateFolders={(updatedFolders) => updateFolders(updatedFolders)}>
            <main>
                <div className='square'>
                    <section>
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
                                .sort(function (a: Type.Folder, b: Type.Folder) {
                                    return a.pos - b.pos;
                                })
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
        </Layout>
    );
}

export default HomePage;
