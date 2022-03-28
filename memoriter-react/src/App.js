import Logo from './Logo.png';
import Zahnrad from './Zahnrad.png';
import FolderHome from './components/FolderHome';
import Footer from './components/Footer';

function App() {
  return (
    <body className="body">
      <header>
        <h1 className="page_title">Home</h1>
        <img className="Logo-oben" src={Logo} alt="site-logo"></img>
      </header>
      <div className="rechteck">
        <h2 className="File-Overview">File Overview</h2>
        <img className='gear' src={Zahnrad}></img>
        <div className="main-seperator"></div>
      </div>    
      <div>
        <FolderHome />
      </div>
      <div>
        <Footer />
      </div>
    </body>
  );
}

export default App;