import './layout.css';
import { useEffect, useState } from 'react';
import { getFolders } from '../../technical/utils/mongo';
import { getAuth } from 'firebase/auth';
import Header from './header';
import Sidebar from './sidebar/sidebar';
import Archive from './archive/archive';
import Backdrop from '../backdrops/backdrop/backdrop';

const Layout = ({
  path,
  children,
}: {
  path: string;
  children: React.ReactNode;
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
          <Archive folders={folders} />
          <Backdrop onClick={() => setShowArchive(false)} />
        </>
      )}
    </>
  );
};
export default Layout;
