import './layout.css';

import { useEffect, useState } from 'react';
import {
  getFlashcards,
  getFolders,
  removeFlashcard,
  removeFolder,
  updateFolder,
} from '../../technical/utils/mongo';
import { getAuth } from 'firebase/auth';
import * as Type from '../../types';
import Header from './header';
import Sidebar from './sidebar/sidebar';
import Archive from './archive/archive';
import Backdrop from '../backdrops/backdrop/backdrop';

const Layout = ({ path, children }: { path: string; children: React.ReactNode }) => {
  const auth = getAuth();

  // queries and saves folders from the database in an array
  const [folders, setFolders] = useState<any>([]);
  useEffect(() => {
    async function getFolder() {
      const allFolders = await getFolders(auth.currentUser.uid); // returns all folders from firebase
      setFolders(allFolders);
    }
    getFolder();
  }, []);

  // folder actions
  const changeFolderIcon = async (id: string, icon: any) => {
    const newIcon = { icon: icon };
    await updateFolder(id, newIcon);
    setFolders(
      folders.map((folder: Type.Folder) => (folder._id === id ? { ...folder, icon: icon } : folder))
    );
  };

  const unarchiveFolder = async (id: string) => {
    await updateFolder(id, { archived: false });
    setFolders(
      folders.map((folder: Type.Folder) =>
        folder._id === id ? { ...folder, archived: false } : folder
      )
    );
  };

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
    const flashcards = await getFlashcards(oldFolder._id);
    flashcards.forEach(async (flashcard) => {
      await removeFlashcard(flashcard._id);
    });
  };

  // sidebar position and animation
  const [sidebarClass, setSidebarClass] = useState<string>('sidebar-floating');
  const [sidebarPosition, setSidebarPosition] = useState<string>('-250px');
  const [contentWidth, setContentWidth] = useState<string>('calc(100%)');
  const sidebarButtonClick = () => {
    if (sidebarClass === 'sidebar-floating') {
      setSidebarClass('sidebar-expanded');
      setSidebarPosition('0');
      setContentWidth('calc(100% - 250px)');
    } else {
      setSidebarClass('sidebar-floating');
      setContentWidth('calc(100%)');
    }
  };
  const sidebarHoverEnter = () => {
    if (sidebarClass === 'sidebar-floating') {
      setSidebarPosition('0');
    }
  };
  const sidebarHoverLeave = () => {
    if (sidebarClass === 'sidebar-floating') {
      setSidebarPosition('-250px');
    }
  };

  // modals
  const [showArchive, setShowArchive] = useState<boolean>(false);

  return (
    <>
      <Header
        path={path}
        onSidebarButtonClick={() => sidebarButtonClick()}
        onSidebarButtonHoverEnter={() => sidebarHoverEnter()}
        onSidebarButtonHoverLeave={() => sidebarHoverLeave()}
      />

      <div className='layout'>
        <Sidebar
          folders={folders}
          classStatus={sidebarClass}
          position={sidebarPosition}
          onSidebarHoverEnter={() => sidebarHoverEnter()}
          onSidebarHoverLeave={() => sidebarHoverLeave()}
          onOpenArchive={() => setShowArchive(true)}
        />
        <div /* transparent column at the left to expand the sidebar when moving the mouse to the screen edge */
          className='layout-edge-hover'
          onMouseEnter={() => sidebarHoverEnter()}
          onMouseLeave={() => sidebarHoverLeave()}
        />

        <div className='layout-content' style={{ width: contentWidth }}>
          {children}
        </div>
        
      </div>

      {showArchive && (
        <>
          <Archive
            folders={folders}
            onChangeFolderIcon={(id, emoji) => changeFolderIcon(id, emoji)}
            onUnarchiveFolder={(id) => unarchiveFolder(id)}
            onDeleteFolder={(folder) => deleteFolder(folder)}
          />
          <Backdrop onClick={() => setShowArchive(false)} />
        </>
      )}
    </>
  );
};
export default Layout;
