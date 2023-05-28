import './layout.css';
import Header from './header';
import Sidebar from './sidebar';
import { useState } from 'react';

const Layout = ({ folder, children }: { folder: string; children: React.ReactNode }) => {
  const [expandedSidebar, setExpandedSidebar] = useState<boolean>(false);
  const [sidebarPosition, setSidebarPosition] = useState<string>('-200px');
  const [contentWidth, setContentWidth] = useState<string>('calc(100%)');
  const sidebarButtonClick = () => {
    if (!expandedSidebar) {
      setExpandedSidebar(true);
      setSidebarPosition('0');
      setContentWidth('calc(100% - 200px)');
    } else {
      setExpandedSidebar(false);
      setSidebarPosition('-200px');
      setContentWidth('calc(100%)');
    }
  };

  return (
    <>
      <Header folder={folder} onSidebarButtonClick={() => sidebarButtonClick()} />
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
