import './sidebar.css';
import { Link } from 'react-router-dom';
import * as Type from '../../types';
import placeholderFolder from '../../images/placeholder-folder.svg';
import homeIcon from '../../images/icons/home-icon.svg';
import archiveIcon from '../../images/icons/archive-icon.svg';
import settingsIcon from '../../images/icons/settings-icon.svg';

const Sidebar = ({
  classStatus,
  position,
  folders,
  onSidebarHoverEnter,
  onSidebarHoverLeave,
}: {
  classStatus: string;
  position: string;
  folders: [];
  onSidebarHoverEnter: () => void;
  onSidebarHoverLeave: () => void;
}) => {
  return (
    <aside
      className={`sidebar ${classStatus}`}
      style={{ left: position }}
      onMouseEnter={() => onSidebarHoverEnter()}
      onMouseLeave={() => onSidebarHoverLeave()}
    >
      <div className='sidebar-folders'>
        <p>Pinned Folders:</p>
        <>
          {folders
            .sort(function (a: Type.Folder, b: Type.Folder) {
              return a.pos - b.pos;
            })
            .map((folder: Type.Folder) => (
              <Link
                to='/topic'
                key={folder._id}
                onClick={() => {
                  localStorage.setItem('folderID', folder._id);
                  localStorage.setItem('folderTitle', folder.title);
                }}
              >
                {folder.icon === '' || folder.icon === undefined ? (
                  <img
                    src={placeholderFolder}
                    alt='placeholder icon'
                    style={{ filter: 'var(--svg-invert-gray)' }}
                  />
                ) : (
                  <img
                    src={`https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/${folder.icon}.svg`}
                    alt='folder icon'
                  />
                )}
                {folder.title !== '' ? ( // checks if the title of the folder is not empty
                  <p>{folder.title}</p>
                ) : (
                  <p>New folder</p>
                )}
              </Link>
            ))}
        </>
      </div>
      <div className='sidebar-links'>
        <Link to='/'>
          <p>
            <img src={homeIcon} alt='Home icon' />
            Home
          </p>
        </Link>
        <p>
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
