import Logo from './Logo.png'

function App() {
  return (
    <body className="body">
      <header>
        <h1 className="page_title">Home</h1>
        <img className="Logo-oben" src={Logo} alt="site-logo"></img>
      </header>
      <div className="rechteck">
        <div className="main-seperator"></div>
      </div>
    </body>
  );
}

export default App;