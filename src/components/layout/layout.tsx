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

  const sidebarButtonHoverEnter = () => {
    if (sidebarClass === 'sidebar-floating') {
      setSidebarPosition('0');
    }
  };
  const sidebarButtonHoverLeave = () => {
    if (sidebarClass === 'sidebar-floating') {
      setSidebarPosition('-250px');
    }
  };

  return (
    <>
      <Header
        folder={folder}
        onSidebarButtonClick={() => sidebarButtonClick()}
        onSidebarHoverEnter={() => sidebarButtonHoverEnter()}
        onSidebarHoverLeave={() => sidebarButtonHoverLeave()}
      />
      <div className='layout'>
        <Sidebar classStatus={sidebarClass} position={sidebarPosition} />
        <div className='layout-content' style={{ width: contentWidth }}>
          {children}
        </div>
      </div>
    </>
  );
};
export default Layout;
