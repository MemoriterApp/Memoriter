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

    const [folders, setFolders] = useState<any>([]); //saves the data of folders in an array

    //Use Effect für folders
    useEffect(() => {
        async function getFolder () {
            const allFolders = await getFolders(auth.currentUser.uid); //returns all folders from the firestore
            setFolders(allFolders);
        }
        getFolder();
    }, []);


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
