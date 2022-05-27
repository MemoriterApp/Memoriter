import Footer from "../components/Footer";
import Logo from './Logo.png';
import { Link } from 'react-router-dom';


function TermsPage() {

    let lastPage = localStorage.getItem('lastPage');

    return(
        <div>
            <Link to='/'>
                <img className="Logo-oben" src={Logo} alt="site-logo" style={{top: '-2.5px', zIndex: '10'}}></img>
            </Link>
            <Link to={lastPage}>
                <div className="Zurückbutton_Body" style={{top: '90px', left: '8px', zIndex: '10'}}>
                    <div className="Zurückbutton_Arrow"/>
                </div>
            </Link>
            <h1 className='Legal_Header'>Terms of Use</h1>
            <p className='Legal_Text'></p>
            <div style={{height: '100px'}}/>
            
            <Footer/>
        </div>
    );
}
export default TermsPage;