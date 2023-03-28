import Logo from '../../../images/memoriter-logo.svg';
import { Link } from 'react-router-dom';
import BackButton from '../../../components/back-button/BackButton';
import '../footer-links.css';
import FooterButton from '../../../components/footer/footer-button/footer-button';

function ImpressumPage() {

    return (
        <>
            <header>
                <Link to='/'>
                    <img
                        className='header-logo'
                        src={Logo}
                        alt='site-logo'
                        style={{ top: '-2.5px', zIndex: '10' }}
                    ></img>
                </Link>
                <h1 className='legal-header'>Impressum</h1>
            </header>
            <main>
                <p className='legal-text'>
          Memoriter is a student company at the Bertha-von-Bertha-Suttner-Gymnasium Babelsberg in
          Potsdam, Germany, under the supervision of JUNIOR, a project by the Institut der Deutchen
          Wirtschaft (IW), supported by the Bundesministerium für Wirtschaft und Klimaschutz (BMWK).
          Further information about the JUNIOR project can be found&nbsp;
                    <a
                        href='https://www.junior-programme.de/startseite'
                        target='_blank'
                        rel='noreferrer'
                        style={{ color: '#265272', cursor: 'pointer' }}
                    >
            here
                    </a>
          .
                </p>
                <p className='legal-sub-header'>Contact:</p>
                <ul className='legal-text'>
                    <li>Johan Trieloff</li>
                    <li>Kopernikusstraße 30</li>
                    <li>14482 Potsdam, Germany</li>
                    <li>Phone: +49 160 7000697</li>
                    <li>Email: johan@trieloff.net</li>
                </ul>
                <div style={{ height: '100px' }} />
            </main>
            <footer>
                <FooterButton />
            </footer>
        </>
    );
}
export default ImpressumPage;