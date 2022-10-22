import React from "react";
import '../css/spaced-rep.css';
import Footer from "../components/Footer";
import Logo from '../images/memoriter-logo.svg';
import { Link } from 'react-router-dom';



function SpacedRepMode() {
    
    let lastPage = localStorage.getItem('lastPage');
    let syncedFolderTitle = localStorage.getItem('syncedFolderTitle');

    return (
        <>
            <header className='page-header'>
                <h1 className="page-title">
                    {syncedFolderTitle}
                </h1>
                    <Link to='/'>
                        <img className="header-logo" src={Logo} alt="site-logo"></img>
                    </Link>
             </header>
             <Link to={lastPage}>
                    <div className="Zurückbutton_Body" style={{ top: '90px', left: '8px', zIndex: '10' }}>
                        <div className="Zurückbutton_Arrow" />
                    </div>
            </Link> 
            <main>
                <button className='spaced-rep-button'
                    style={{ top: '70%', left: '10%'}}
                    onClick>
                    ?
                </button>
                <button className='spaced-rep-button'
                    style={{ top: '70%',left: '30%'}}
                    onClick>
                    easy 
                </button>
                <button className='spaced-rep-button'
                    style={{ top: '70%',left: '50%'}}
                    onClick>
                    correct
                </button>
                <button className='spaced-rep-button'
                    style={{ top: '70%',left: '70%'}}
                    onClick>
                    almost correct
                </button>
                <button className='spaced-rep-button'
                    style={{ top: '70%',left: '90%'}}
                    onClick>
                    incorrect
                </button>
            </main>
            <footer>
                <Footer />
            </footer><footer>
                <Footer />
            </footer>
        </>
    )
}

export default SpacedRepMode;