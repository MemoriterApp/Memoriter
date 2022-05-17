import Footer from "../components/Footer";
import Logo from './Logo.png';
import { Link } from 'react-router-dom';

function ImpressumPage() {
    return(
        <div>
            <Link to='/'>
                <img className="Logo-oben" src={Logo} alt="site-logo" style={{top: '-2.5px'}}></img>
            </Link>
            <Link to='/'>
                <div className="Zurückbutton_Body" style={{top: '90px', left: '8px'}}>
                    <div className="Zurückbutton_Arrow"/>
                </div>
            </Link>
            <h1 className='Legal_Header'>Impressum</h1>
            <p className='Legal_Text'>
            Memoriter ist ein Schülerunternehmen des Bertha-von-Suttner-Gymnasiums, durchgeführt von JUNIOR. 
            </p>
            <ul className="Legal_Text" style={{top: '200px'}}>
                Kontakt:
                <li>Johan Trieloff</li>
                <li>Kopernikusstraße 30</li>
                <li>14482 Potsdam</li>
                <li>Deutschland</li>
                <li>Telefon:  +49 (0)221 | 4981-707</li>
                <li>Email: johan@trieloff.net</li>
            </ul>
            <Footer/>
        </div>
    );
}

export default ImpressumPage;