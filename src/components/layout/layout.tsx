import './layout.css';

import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import {
  getFlashcards,
  getFolders,
  insertFolder,
  removeFlashcard,
  removeFolder,
  updateFolder,
} from '../../technical/utils/mongo';
import { getAuth } from 'firebase/auth';
import * as Type from '../../types';
import Header from './header';
import Sidebar from './sidebar/sidebar';
import Archive from './archive/archive';
import FooterButton from './footer/footer';
import Backdrop from '../backdrops/backdrop/backdrop';

const Layout = forwardRef(
  (
    {
      path,
      folderId,
      favoriteState,
      children,
      onUpdateFolders,
    }: {
      path: string;
      folderId?: string;
      favoriteState?: boolean;
      children: React.ReactNode;
      onUpdateFolders?: (arg0: Type.Folder[]) => void;
    },
    ref?: any
  ) => {
    const auth = getAuth();

    // queries and saves folders from the database in an array
    const [folders, setFolders] = useState<any>([]);
    useEffect(() => {
      async function getFolder() {
        const allFolders = await getFolders(auth.currentUser.uid); // returns all folders from firebase
        setFolders(allFolders);
        onUpdateFolders(allFolders);
      }
      getFolder();
    }, []);

    // executes folder actions from home page
    useImperativeHandle(ref, () => ({
      onAddFolder(title: string) {
        addFolder(title);
      },
      onPosUp(id: string, pos: number) {
        posUp(id, pos);
      },
      onPosDown(id: string, pos: number) {
        posDown(id, pos);
      },
      onFolderPositionAdjust(id: string, pos: number) {
        folderPositionAdjust(id, pos);
      },
      onChangeFolderIcon(id: string, icon: string) {
        changeFolderIcon(id, icon);
      },
      onEditFolder(id: string, title: string) {
        editFolder(id, title);
      },
      onFavoriteFolder(id: string) {
        favoriteFolder(id);
      },
      onUnfavoriteFolder(id: string) {
        unfavoriteFolder(id);
      },
      onArchiveFolder(id: string) {
        archiveFolder(id);
      },
      onDeleteFolder(folder: Type.Folder) {
        deleteFolder(folder);
      },
    }));

    // folder actions
    const addFolder = async (title: any) => {
      const pos = folders.length + 1;
      const icon = '';
      await insertFolder(title, icon, pos, auth.currentUser.uid);

      const allFolders = await getFolders(auth.currentUser.uid);
      setFolders(allFolders);
      onUpdateFolders(allFolders);
    };

    const posUp = async (id: string, pos: number) => {
      const newPosUp = { pos: pos - 1 };
      await updateFolder(id, newPosUp);

      const updatedFolders = folders.map((folder: Type.Folder) =>
        folder._id === id
          ? { ...folder, pos: folder.pos - 1 }
          : folder.pos === pos - 1
          ? (sessionStorage.setItem('newPosFolder', folder._id), { ...folder, pos: folder.pos + 1 })
          : folder
      );
      setFolders(updatedFolders);
      onUpdateFolders(updatedFolders);
    };
    const posDown = async (id: string, pos: number) => {
      const newPosDown = { pos: pos + 1 };
      await updateFolder(id, newPosDown);

      const updatedFolders = folders.map((folder: Type.Folder) =>
        folder._id === id
          ? { ...folder, pos: folder.pos + 1 }
          : folder.pos === pos + 1
          ? (sessionStorage.setItem('newPosFolder', folder._id.toString()),
            { ...folder, pos: folder.pos - 1 })
          : folder
      );
      setFolders(updatedFolders);
      onUpdateFolders(updatedFolders);
    };
    const folderPositionAdjust = async (id: string, pos: any) => {
      const newPosition = { pos: pos };
      await updateFolder(id, newPosition);

      const updatedFolders = folders.map((folder: Type.Folder) =>
        folder._id === id ? { ...folder, pos: pos } : folder
      );
      setFolders(updatedFolders);
      onUpdateFolders(updatedFolders);
    };

    const editFolder = async (id: string, title: any) => {
      const newTitle = { title: title };
      await updateFolder(id, newTitle);

      const updatedFolders = folders.map((folder: Type.Folder) =>
        folder._id === id ? { ...folder, title: title } : folder
      );
      setFolders(updatedFolders);
      onUpdateFolders(updatedFolders);
    };

    const changeFolderIcon = async (id: string, icon: any) => {
      const newIcon = { icon: icon };
      await updateFolder(id, newIcon);

      const updatedFolders = folders.map((folder: Type.Folder) =>
        folder._id === id ? { ...folder, icon: icon } : folder
      );
      setFolders(updatedFolders);
      onUpdateFolders(updatedFolders);
    };

    const favoriteFolder = async (id: string) => {
      await updateFolder(id, { favorite: true });

      const updatedFolders = folders.map((folder: Type.Folder) =>
        folder._id === id ? { ...folder, favorite: true } : folder
      );
      setFolders(updatedFolders);
      onUpdateFolders(updatedFolders);
    };

    const unfavoriteFolder = async (id: string) => {
      await updateFolder(id, { favorite: false });

      const updatedFolders = folders.map((folder: Type.Folder) =>
        folder._id === id ? { ...folder, favorite: false } : folder
      );
      setFolders(updatedFolders);
      onUpdateFolders(updatedFolders);
    };

    const archiveFolder = async (id: string) => {
      await updateFolder(id, { archived: true });

      const updatedFolders = folders.map((folder: Type.Folder) =>
        folder._id === id ? { ...folder, archived: true } : folder
      );
      setFolders(updatedFolders);
      onUpdateFolders(updatedFolders);
    };

    const unarchiveFolder = async (id: string) => {
      await updateFolder(id, { archived: false });

      const updatedFolders = folders.map((folder: Type.Folder) =>
        folder._id === id ? { ...folder, archived: false } : folder
      );
      setFolders(updatedFolders);
      onUpdateFolders(updatedFolders);
    };

    const deleteFolder = async (oldFolder: Type.Folder) => {
      await removeFolder(oldFolder._id);

      const updatedFolders = folders
        .map((folder: Type.Folder) =>
          folder.pos > oldFolder.pos
            ? (sessionStorage.setItem('newPosFolder' + folder._id, folder._id),
              { ...folder, pos: folder.pos - 1 })
            : folder
        )
        .filter((folder: Type.Folder) => folder._id !== oldFolder._id);
      setFolders(updatedFolders);
      onUpdateFolders(updatedFolders);

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
          folderId={folderId}
          favoriteState={favoriteState}
          onSidebarButtonClick={() => sidebarButtonClick()}
          onSidebarButtonHoverEnter={() => sidebarHoverEnter()}
          onSidebarButtonHoverLeave={() => sidebarHoverLeave()}
          onFavoriteFolder={(id: string) => favoriteFolder(id)}
          onUnfavoriteFolder={(id: string) => unfavoriteFolder(id)}
        />

        <div className='layout'>
          <Sidebar
            folders={folders}
            classStatus={sidebarClass}
            position={sidebarPosition}
            onSidebarHoverEnter={() => sidebarHoverEnter()}
            onSidebarHoverLeave={() => sidebarHoverLeave()}
            onOpenArchive={() => setShowArchive(true)}
            onChangeFolderIcon={(id, emoji) => changeFolderIcon(id, emoji)}
            onEditFolder={(id: string, title: string) => editFolder(id, title)}
            onDeleteFolder={(folder: Type.Folder) => deleteFolder(folder)}
            onArchiveFolder={(id: string) => archiveFolder(id)}
            onUnfavoriteFolder={(id: string) => unfavoriteFolder(id)}
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

        <FooterButton />

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
  }
);
Layout.displayName = 'Layout';
export default Layout;
