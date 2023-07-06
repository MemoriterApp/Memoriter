import './sidebar.css';
import { Link } from 'react-router-dom';
import * as Type from '../../../types';
import homeIcon from '../../../images/icons/home-icon.svg';
import archiveIcon from '../../../images/icons/archive-icon.svg';
import settingsIcon from '../../../images/icons/settings-icon.svg';
import SidebarFolder from './sidebar-folder';

const Sidebar = ({
  folders,
  classStatus,
  position,
  onSidebarHoverEnter,
  onSidebarHoverLeave,
  onOpenArchive,
  onOpenSettings,
  onChangeFolderIcon,
  onEditFolder,
  onDeleteFolder,
  onArchiveFolder,
  onUnfavoriteFolder,
  onUpdateCurrentFolder,
}: {
  folders: [];
  classStatus: string;
  position: string;
  onSidebarHoverEnter: () => void;
  onSidebarHoverLeave: () => void;
  onOpenArchive: () => void;
  onOpenSettings: () => void;
  onChangeFolderIcon: (arg0: string, arg1: string) => void;
  onEditFolder: (arg0: string, arg1: string) => void;
  onDeleteFolder: (arg0: Type.Folder) => Promise<void>;
  onArchiveFolder: (arg0: string) => void;
  onUnfavoriteFolder: (arg0: string) => void;
  onUpdateCurrentFolder: (arg0: { id: string; title: string; favorite: boolean }) => void;
}) => {
  return (
    <aside
      className={`sidebar ${classStatus}`}
      style={{ left: position }}
      onMouseEnter={() => onSidebarHoverEnter()}
      onMouseLeave={() => onSidebarHoverLeave()}
    >
      <div className='sidebar-folders'>
        <p>Favorite Folders:</p>
        {folders
          .filter((folder: Type.Folder) => !folder.archived && folder.favorite)
          .sort(function (a: Type.Folder, b: Type.Folder) {
            return a.pos - b.pos;
          })
          .map((folder: Type.Folder) => (
            <SidebarFolder
              key={folder._id}
              folder={folder}
              onChangeFolderIcon={(id, emoji) => onChangeFolderIcon(id, emoji)}
              onEditFolder={(id: string, title: string) => onEditFolder(id, title)}
              onDeleteFolder={(folder: Type.Folder) => onDeleteFolder(folder)}
              onArchiveFolder={(id: string) => onArchiveFolder(id)}
              onUnfavoriteFolder={(id: string) => onUnfavoriteFolder(id)}
              onUpdateCurrentFolder={(currentFolder: {
                id: string;
                title: string;
                favorite: boolean;
              }) => onUpdateCurrentFolder(currentFolder)}
            />
          ))}
      </div>

      <div className='sidebar-links'>
        <Link to='/'>
          <p>
            <img src={homeIcon} alt='Home icon' />
            Home
          </p>
        </Link>
        <p onClick={() => onOpenArchive()}>
          <img src={archiveIcon} alt='Archive icon' />
          Archive
        </p>
        <p onClick={() => onOpenSettings()}>
          <img src={settingsIcon} alt='Settings icon' />
          Preferences
        </p>
      </div>
    </aside>
  );
};
export default Sidebar;
