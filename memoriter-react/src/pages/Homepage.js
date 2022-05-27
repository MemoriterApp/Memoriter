import Logo from './Logo.png';
import SettingsIcon from '../components/SettingsIcon';
import Backdrop from '../components/backdrop';
import Footer from '../components/Footer';

function Homepage() {
    return (
    <>
        <header className='Page_Header-homepage'>
            <img className="Logo-homepage" src={Logo} alt="site-logo" />
            <button type="submit" className="LoginButton-homepage">sign up</button>
            <Link to='/signup' className="LoginButton-homepage">Sign Up</Link>
        </header>
        <footer>
             <Footer />
        </footer>
    </>
    );
}
export default Homepage;
