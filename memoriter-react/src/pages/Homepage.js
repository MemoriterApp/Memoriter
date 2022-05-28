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
            <div>
                <Link to='/signup'>
                <button type="submit" className="SignupButton-homepage">Sign Up</button> 
                </Link>
                <Link to='/login'>
                <button type="submit" className="LoginButton-homepage">Login</button> 
                </Link>
            </div>
        </header>
        <div className="rechteck-homepage1">

        </div>
        <div className="rechteck-homepage2">

        </div>
        <div className="rechteck-homepage3">

        </div>
        <footer><Footer /></footer>
    </>
    );
}
export default Homepage;
