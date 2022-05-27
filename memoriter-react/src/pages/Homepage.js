import Logo from './Logo.png';
import SettingsIcon from '../components/SettingsIcon';
import Backdrop from '../components/backdrop';
import Footer from '../components/Footer';
import { Link } from "react-router-dom";

function Homepage() {
    return (
    <>
        <header className='Page_Header-homepage'>
            <img className="Logo-homepage" src={Logo} alt="site-logo" />
            <Link to='/signup'>
               <button type="submit" className="SignupButton-homepage">sign up</button> 
            </Link>
        </header>
        <footer>
             <Footer />
        </footer>
    </>
    );
}
export default Homepage;
