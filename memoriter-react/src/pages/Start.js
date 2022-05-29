import Logo from './Logo.png';
import SettingsIcon from '../components/SettingsIcon';
import Backdrop from '../components/backdrop';
import Footer from '../components/Footer';
import { Link } from "react-router-dom";
import Memoriter_Katze from './Memoriter_Katze.jpeg'

function Start() {
    return (
    <>
        <header className='Page_Header-Start'>
            <img className="Logo-Start" src={Logo} alt="site-logo" />
            <div>
                <Link to='/signup'>
                <button type="submit" className="SignupButton-Start">Sign Up</button> 
                </Link>
                <Link to='/login'>
                <button type="submit" className="LoginButton-Start">Login</button> 
                </Link>
            </div>
        </header>
        <div className="rechteck-Start1">

        </div>
        <div className="rechteck-Start2">
            <img className="Katze" src={Memoriter_Katze} alt="altes-site-logo" />
            <text className="Start2-Text">
                <h4>So sah es aus </h4>
                <h4>So sah es nicht aus </h4>
            </text>
            
        </div>
        <div className="rechteck-Start3">

        </div>
        <footer><Footer /></footer>
    </>
    );
}
export default Start;
