import './sidebar.css';
import { Link } from 'react-router-dom';
import homeIcon from '../../images/icons/home-icon.svg';
import archiveIcon from '../../images/icons/archive-icon.svg';
import settingsIcon from '../../images/icons/settings-icon.svg';

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
  return (
    <aside
      className={`sidebar ${classStatus}`}
      style={{ left: position }}
      onMouseEnter={() => onSidebarHoverEnter()}
      onMouseLeave={() => onSidebarHoverLeave()}
    >
      <div className='sidebar-folders'>
        <p>Pinned Folders:</p>
      </div>
      <div className='sidebar-links'>
        <Link to='/'><p><img src={homeIcon} alt='Home icon' />Home</p></Link>
        <p><img src={archiveIcon} alt='Archive icon' />Archive</p>
        <p><img src={settingsIcon} alt='Settings icon' />Preferences</p>
      </div>
    </aside>
  );
};
export default Sidebar;
