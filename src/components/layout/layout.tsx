import './layout.css';
import Header from './header';
import Sidebar from './sidebar';
import { useState } from 'react';

const Layout = ({ folder, children }: { folder: string; children: React.ReactNode }) => {
  const [sidebarClass, sesetSidebarClass] = useState<string>('sidebar-floating');
  const [sidebarPosition, setSidebarPosition] = useState<string>('-250px');
  const [contentWidth, setContentWidth] = useState<string>('calc(100%)');
  const sidebarButtonClick = () => {
    if (sidebarClass === 'sidebar-floating') {
      sesetSidebarClass('sidebar-expanded');
      setSidebarPosition('0');
      setContentWidth('calc(100% - 250px)');
    } else {
      sesetSidebarClass('sidebar-floating');
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

  return (
    <>
      <Header
        folder={folder}
        onSidebarButtonClick={() => sidebarButtonClick()}
        onSidebarButtonHoverEnter={() => sidebarHoverEnter()}
        onSidebarButtonHoverLeave={() => sidebarHoverLeave()}
      />
      <div className='layout'>
        <Sidebar
          classStatus={sidebarClass}
          position={sidebarPosition}
          onSidebarHoverEnter={() => sidebarHoverEnter()}
          onSidebarHoverLeave={() => sidebarHoverLeave()}
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
    </>
  );
};
export default Layout;
