import './layout.css';
import Header from './header';
import Sidebar from './sidebar';
import { useState } from 'react';

const Layout = ({ folder, children }: { folder: string; children: React.ReactNode }) => {
  const [expandedSidebar, setExpandedSidebar] = useState<boolean>(false);
  const [sidebarPosition, setSidebarPosition] = useState<string>('-250px');
  const [contentWidth, setContentWidth] = useState<string>('calc(100%)');
  const sidebarButtonClick = () => {
    if (!expandedSidebar) {
      setExpandedSidebar(true);
      setSidebarPosition('0');
      setContentWidth('calc(100% - 250px)');
    } else {
      setExpandedSidebar(false);
      setContentWidth('calc(100%)');
    }
  };

  const sidebarButtonHoverEnter = () => {
    if (!expandedSidebar) {
      setSidebarPosition('0');
    }
  };
  const sidebarButtonHoverLeave = () => {
    if (!expandedSidebar) {
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
        <Sidebar position={sidebarPosition} />
        <div className='layout-content' style={{ width: contentWidth }}>
          {children}
        </div>
      </div>
    </>
  );
};
export default Layout;
