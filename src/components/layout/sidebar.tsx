import './sidebar.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFolders } from '../../technical/utils/mongo';
import { getAuth } from 'firebase/auth';
import * as Type from '../../types';
import homeIcon from '../../images/icons/home-icon.svg';
import archiveIcon from '../../images/icons/archive-icon.svg';
import settingsIcon from '../../images/icons/settings-icon.svg';
import SidebarFolder from './sidebar-folder';
import Archive from './archive';
import Backdrop from '../backdrops/backdrop/backdrop';

const Sidebar = ({
  classStatus,
  position,
  onSidebarHoverEnter,
  onSidebarHoverLeave,
}: {
  classStatus: string;
  position: string;
  onSidebarHoverEnter: () => void;
  onSidebarHoverLeave: () => void;
}) => {
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

  const [showArchive, setShowArchive] = useState<boolean>(false);

  return (
    <aside
      className={`sidebar ${classStatus}`}
      style={{ left: position }}
      onMouseEnter={() => onSidebarHoverEnter()}
      onMouseLeave={() => onSidebarHoverLeave()}
    >
      <div className='sidebar-folders'>
        <p>Pinned Folders:</p>
        {folders
          .filter((folder: Type.Folder) => !folder.archived)
          .sort(function (a: Type.Folder, b: Type.Folder) {
            return a.pos - b.pos;
          })
          .map((folder: Type.Folder) => (
            <SidebarFolder key={folder._id} folder={folder} />
          ))}
      </div>

      <div className='sidebar-links'>
        <Link to='/'>
          <p>
            <img src={homeIcon} alt='Home icon' />
            Home
          </p>
        </Link>
        <p onClick={() => setShowArchive(true)}>
          <img src={archiveIcon} alt='Archive icon' />
          Archive
        </p>
        <p>
          <img src={settingsIcon} alt='Settings icon' />
          Preferences
        </p>
      </div>

      {showArchive && (
        <>
          <Archive folders={folders} />
          <Backdrop onClick={() => setShowArchive(false)} />
        </>
      )}
    </aside>
  );
};
export default Sidebar;
