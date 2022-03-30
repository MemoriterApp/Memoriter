import Logo from './Logo.png';
import SettingsIcon from '../components/SettingsIcon';
import FolderHome from '../components/FolderHome';
import Footer from '../components/Footer';


function HomePage() {
  return (
    <>
      <header>
        <h1 className="page_title">Home</h1>
        <img className="Logo-oben" src={Logo} alt="site-logo"></img>
      </header>
      <div className="rechteck">
        <h2 className="File-Overview">File Overview</h2>
          <SettingsIcon />
        <div className="main-seperator"></div>
      </div>    
        <FolderHome />
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default HomePage;