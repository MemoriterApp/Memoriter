import Header from './header';

const Layout = ({ folder, children }: { folder: string; children: React.ReactNode }) => {
  return (
    <>
      <Header folder={folder} />
      <>{children}</>
    </>
  );
};
export default Layout;
