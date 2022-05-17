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
            Memoriter is a student company by students of the Bertha-von-Bertha-Suttner-Gymnasium-Babelsberg under the supervision of JUNIOR
            </p>
            <ul className="Legal_Text" style={{top: '200px'}}>
                contact:
                <li>Johan Trieloff</li>
                <li>Kopernikusstraße 30</li>
                <li>14482 Potsdam</li>
                <li>Germany</li>
                <li>Telefon:  +49 (0)221 | 4981-707</li>
                <li>Email: johan@trieloff.net</li>
            </ul>
            <Footer/>
        </div>
    );
}

export default ImpressumPage;