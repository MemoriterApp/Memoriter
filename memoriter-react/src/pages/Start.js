import Logo from './Logo.png';
import SettingsIcon from '../components/SettingsIcon';
import Backdrop from '../components/backdrop';
import FooterStart from '../components/FooterStart';
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
            <text className="Start1-Text">
                <h1 style={{textAlign: 'center'}}>What is MEMORITER?</h1>
                <p>Memoriter is a web-application specifically build to <br></br>help you learn. 
                    But of course it can also be used to <br></br>take notes or write anything one desires. 
                    This <br></br>application is so easy to use, that a tutorial is not needed.
                    It is primarily based on the design flashcards,which are commonly used to manage notes
                    <br></br>and other things. Try it out its very simple! </p>
            </text>
        </div>
        <div className="rechteck-Start2">
            <text className="Start2-Text">
                <h1>So sah es aus </h1>
                <p>So sah es nicht aus </p>
            </text>
            
        </div>
        <div className="rechteck-Start3">

        </div>
        <footer><FooterStart/></footer>
    </>
    );
}
export default Start;
