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
  onChangeFolderIcon,
}: {
  folders: [];
  classStatus: string;
  position: string;
  onSidebarHoverEnter: () => void;
  onSidebarHoverLeave: () => void;
  onOpenArchive: () => void;
  onChangeFolderIcon: (arg0: string, arg1: string) => void;
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
        <p>
          <img src={settingsIcon} alt='Settings icon' />
          Preferences
        </p>
      </div>
    </aside>
  );
};
export default Sidebar;
