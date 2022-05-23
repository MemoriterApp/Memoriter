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
            Memoriter is a student student company at the Bertha-von-Bertha-Suttner-Gymnasium Babelsberg
            under the supervision of JUNIOR, a project by the Institut der Deutchen Wirtschaft (IW),
            supported by the Bundesministerium für Wirtschaft und Klimaschutz (BMWK).
            Further information about the JUNIOR project can be found&nbsp;
            <a href="https://www.junior-programme.de/startseite" target="_blank" rel="noreferrer"
            style={{color: '#265272', cursor: 'pointer'}} >here</a>.
            </p>
            <h3 className="Legal_Text" style={{top: '260px'}}>Contact:</h3>
            <ul className="Legal_Text" style={{top: '290px'}}>
                <li>Johan Trieloff</li>
                <li>Kopernikusstraße 30</li>
                <li>14482 Potsdam, Germany</li>
                <li>Phone: +49 (0)221 | 4981-707</li>
                <li>Email: johan@trieloff.net</li>
            </ul>
            <Footer/>
        </div>
    );
}

export default ImpressumPage;