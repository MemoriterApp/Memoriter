import Header from './header';
import Sidebar from './sidebar';

const Layout = ({ folder, children }: { folder: string; children: React.ReactNode }) => {
  return (
    <>
      <Header folder={folder} />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div
          style={{
            position: 'absolute',
            right: '0',
            top: '0',
            width: 'calc(100% - 201px)',
            height: '100%',
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
};
export default Layout;
