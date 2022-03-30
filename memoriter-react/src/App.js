import Logo from './Logo.png'

function App() {
  return (
    <body className="body">
      <header>
        <h1 className="page_title">Home</h1>
        <img className="Logo-oben" src={Logo} alt="site-logo"></img>
      </header>
      <main>
        <div className="rechteck">
          <h2 className="File-Overview">File Overview</h2>
          <div className="main-seperator"></div>
        </div>
      </main>
      <footer>

      </footer>
    </body>
  );
}

export default App;