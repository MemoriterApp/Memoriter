import "../../index.css";
import "./patchnotes.css";
import Logo from '../Logo.png';
import { Link } from "react-router-dom";

function PatchNotes() {

    let lastPage = localStorage.getItem('lastPage');

    return (
        <>
            <header>
                <Link to='/'>
                    <img className="Logo-oben" src={Logo} alt="site-logo" style={{ top: '-2.5px', zIndex: '10' }}></img>
                </Link>
                <Link to={lastPage}>
                    <div className="Zurückbutton_Body" style={{ top: '90px', left: '8px', zIndex: '10' }}>
                        <div className="Zurückbutton_Arrow" />
                    </div>
                </Link>

                <h1 className='Legal_Header'>Patch Notes</h1>
            </header>
            <body>
                <div className="patchnotes-releases-box">
                    <h1 className="Legal-SubHeader">Version 1.0.1</h1>
                    <ul className="Legal_Text">
                        <li>added account management features (change email/password, delete account)</li>
                        <li>added more text editing features for flashcards</li>
                        <li>Test TestTest TestTest TestTest TestTest Test</li>
                    </ul>
                </div>
                <div className="patchnotes-releases-box">
                    <h1 className="Legal-SubHeader">Version 1.0</h1>
                    <ul className="Legal_Text">
                        <li>the first release version of Memoriter</li>
                        <li>all the basic features</li>
                    </ul>
                </div>
            </body>
        </>
    );
}

export default PatchNotes;
