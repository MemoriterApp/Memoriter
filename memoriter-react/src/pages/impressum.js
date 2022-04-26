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
            <p className='Legal_Text'></p>
            <Footer/>
        </div>
    );
}

export default ImpressumPage;