import Logo from './Logo.png';
import ButtonHomepage from './components/Button_Homepage';

function App() {
  return (
    <body className="body">
      <header>
        <h1 className="page_title">Home</h1>
        <img className="Logo-oben" src={Logo} alt="site-logo"></img>
      </header>
      <div className="rechteck">
        <h2 className="File-Overview">File Overview</h2>
        <div className="main-seperator"></div>
      </div>
      <div>
        <ButtonHomepage />
      </div>
    </body>
  );
}

export default App;