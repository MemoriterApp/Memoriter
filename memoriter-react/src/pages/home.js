import { useState } from 'react';
import Logo from './Logo.png';
import SettingsIcon from '../components/SettingsIcon';
import FolderBase from '../components/FolderBase';
import Footer from '../components/Footer';

function HomePage() {
  const [ folders, setFolders ] = useState([ 
    {
      id: 1,
      name: 'Geschichte',
    },
    {
      id: 2,
      name: 'Deutsch',
    },
    {
      id: 3,
      name: 'Politik',
    },
    {
      id: 4,
      name: 'Mathematik',
    },
    {
      id: 5,
    }
  ])

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
        <FolderBase folders={folders} />
      <footer>
        <Footer />
      </footer>
    </>
  );
}

export default HomePage;