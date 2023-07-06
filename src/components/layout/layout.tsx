import './layout.css';

import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useNavigate } from 'react-router';
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
import Header from './header/header';
import ProfileDropdown from './header/profile-dropdown';
import Sidebar from './sidebar/sidebar';
import Archive from './archive/archive';
import FooterButton from './footer/footer';
import Backdrop from '../backdrops/backdrop/backdrop';
import Settings from '../../pages/settings/interaction/SettingsInteraction';
import Profile from '../../pages/settings/profile/profile';

const Layout = forwardRef(
  (
    {
      path,
      folderId,
      favoriteState,
      children,
      onUpdateFolders,
      onUpdateCurrentFolder,
      onUpdateSearchQuery,
      onSidebarButtonClick,
    }: {
      path: string;
      folderId?: string;
      favoriteState?: boolean;
      children: React.ReactNode;
      onUpdateFolders?: (arg0: Type.Folder[]) => void;
      onUpdateCurrentFolder?: (arg0: { id: string; title: string; favorite: boolean }) => void;
      onUpdateSearchQuery?: (arg0: string) => void;
      onSidebarButtonClick?: (arg0: string) => void;
    },
    ref?: any
  ) => {
    const navigate = useNavigate();
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

    const editFolder = async (id: string, title: any) => {
      if (id === window.location.pathname.replace('/topic/', '')) {
        onUpdateCurrentFolder({ id: id, title: title, favorite: true });
      }

      const newTitle = { title: title };
      await updateFolder(id, newTitle);

      const updatedFolders = folders.map((folder: Type.Folder) =>
        folder._id === id ? { ...folder, title: title } : folder
      );
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

      if (oldFolder._id === window.location.pathname.replace('/topic/', '')) {
        setFolders(updatedFolders);
        navigate('/');
      } else {
        setFolders(updatedFolders);
        onUpdateFolders(updatedFolders);
      }


      const flashcards = await getFlashcards(oldFolder._id);
      flashcards.forEach(async (flashcard) => {
        await removeFlashcard(flashcard._id);
      });
    };

    // sidebar position and animation
    if (!localStorage.getItem('sidebar-state')) {
      localStorage.setItem(
        'sidebar-state',
        JSON.stringify({ class: 'sidebar-floating', position: '-250px', content: 'calc(100%)' })
      );
    }

    const [sidebarClass, setSidebarClass] = useState<string>(
      JSON.parse(localStorage.getItem('sidebar-state')).class
    );
    const [sidebarPosition, setSidebarPosition] = useState<string>(
      JSON.parse(localStorage.getItem('sidebar-state')).position
    );
    const [contentWidth, setContentWidth] = useState<string>(
      JSON.parse(localStorage.getItem('sidebar-state')).content
    );

    const sidebarButtonClick = () => {
      if (sidebarClass === 'sidebar-floating') {
        setSidebarClass('sidebar-expanded');
        setSidebarPosition('0');
        setContentWidth('calc(100% - 250px)');
        localStorage.setItem(
          'sidebar-state',
          JSON.stringify({
            class: 'sidebar-expanded',
            position: '0',
            content: 'calc(100% - 250px)',
          })
        );
      } else {
        setSidebarClass('sidebar-floating');
        setContentWidth('calc(100%)');
        localStorage.setItem(
          'sidebar-state',
          JSON.stringify({ class: 'sidebar-floating', position: '-250px', content: 'calc(100%)' })
        );
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
    const [showProfileDropdown, setShowProfileDropdown] = useState(false);
    const [showArchive, setShowArchive] = useState<boolean>(false);
    const [showSettings, setShowSettings] = useState<boolean>(false);
    const [showProfile, setShowProfile] = useState<boolean>(false);

    return (
      <>
        <Header
          path={path}
          folderId={folderId}
          favoriteState={favoriteState}
          onOpenProfileDropdown={() => setShowProfileDropdown(true)}
          onSidebarButtonClick={() => {
            sidebarButtonClick();
            onSidebarButtonClick(sidebarClass);
          }}
          onSidebarButtonHoverEnter={() => sidebarHoverEnter()}
          onSidebarButtonHoverLeave={() => sidebarHoverLeave()}
          onFavoriteFolder={(id: string) => favoriteFolder(id)}
          onUnfavoriteFolder={(id: string) => unfavoriteFolder(id)}
          onUpdateSearchQuery={(query) => onUpdateSearchQuery(query)}
        />

        {showProfileDropdown && (
          <ProfileDropdown
            onCloseProfileDropdown={() => setShowProfileDropdown(false)}
            onOpenSettings={() => {
              setShowSettings(true);
              setShowProfileDropdown(false);
            }}
            onOpenProfile={() => {
              setShowProfile(true);
              setShowProfileDropdown(false);
            }}
          />
        )}

        <div className='layout'>
          <Sidebar
            folders={folders}
            classStatus={sidebarClass}
            position={sidebarPosition}
            onSidebarHoverEnter={() => sidebarHoverEnter()}
            onSidebarHoverLeave={() => sidebarHoverLeave()}
            onOpenArchive={() => setShowArchive(true)}
            onOpenSettings={() => setShowSettings(true)}
            onChangeFolderIcon={(id, emoji) => changeFolderIcon(id, emoji)}
            onEditFolder={(id: string, title: string) => editFolder(id, title)}
            onDeleteFolder={(folder: Type.Folder) => deleteFolder(folder)}
            onArchiveFolder={(id: string) => archiveFolder(id)}
            onUnfavoriteFolder={(id: string) => unfavoriteFolder(id)}
            onUpdateCurrentFolder={(currentFolder: {
              id: string;
              title: string;
              favorite: boolean;
            }) => onUpdateCurrentFolder(currentFolder)}
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
              onUpdateCurrentFolder={(currentFolder: {
                id: string;
                title: string;
                favorite: boolean;
              }) => onUpdateCurrentFolder(currentFolder)}
              onCloseArchive={() => setShowArchive(false)}
            />
            <Backdrop onClick={() => setShowArchive(false)} />
          </>
        )}

        {showSettings && (
          <>
            <Backdrop onClick={() => setShowSettings(false)} />
            <Settings />
          </>
        )}

        {showProfile && (
          <>
            <Backdrop onClick={() => setShowProfile(false)} />
            <Profile />
          </>
        )}
      </>
    );
  }
);
Layout.displayName = 'Layout';
export default Layout;
