import Footer from "../components/Footer";
import Logo from './Logo.png';
import { Link } from 'react-router-dom';

function ImpressumPage() {

    let lastPage = localStorage.getItem('lastPage');

    return (
        <div>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name='keywords' content='memoriter,impressum, kontakt, work, junior'></meta>
                <meta name='description' content='impressum page for memoriter'></meta>
            </head>
            <header>
                <Link to='/'>
                    <img className="Logo-oben" src={Logo} alt="site-logo" style={{ top: '-2.5px', zIndex: '10' }}></img>
                </Link>
                <Link to={lastPage}>
                    <div className="Zurückbutton_Body" style={{ top: '90px', left: '8px', zIndex: '10' }}>
                        <div className="Zurückbutton_Arrow" />
                    </div>
                </Link>
                <h1 className='Legal_Header'>Impressum</h1>
            </header>
            <body>
                <p className='Legal_Text'>
                    Memoriter is a student company at the Bertha-von-Bertha-Suttner-Gymnasium Babelsberg in Potsdam, Germany,
                    under the supervision of JUNIOR, a project by the Institut der Deutchen Wirtschaft (IW),
                    supported by the Bundesministerium für Wirtschaft und Klimaschutz (BMWK).
                    Further information about the JUNIOR project can be found&nbsp;
                    <a href="https://www.junior-programme.de/startseite" target="_blank" rel="noreferrer"
                        style={{ color: '#265272', cursor: 'pointer' }} >here</a>.
                </p>
                <p className="Legal-SubHeader">Contact:</p>
                <ul className="Legal_Text">
                    <li>Johan Trieloff</li>
                    <li>Kopernikusstraße 30</li>
                    <li>14482 Potsdam, Germany</li>
                    <li>Phone: +49 (0)221 | 4981-707</li>
                    <li>Email: johan@trieloff.net</li>
                </ul>
                <div style={{ height: '100px' }} />
            </body>
            <footer>
                <Footer />
            </footer>
        </div>
    );
}

export default ImpressumPage;