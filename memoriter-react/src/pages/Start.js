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
        <div className="rechteck-Start1a">
            <text className="Start1a-Text">
                <h1>What is MEMORITER?</h1>
                <p><div> Discover Memoriter and find out how it will give you a better experience in learning something in school
                    or just to take notes in a different creative way not seen anywhere else on the web.</div>
                    <div> This new design is based on flashcards and features similar to other
                        note taking apps. So, try Memoriter and you won't be dissapointed. </div>
                </p>
                <p>
                     If you want to learn something about us, the developers, head to our <a href='/About' className='About_Us-Start'>About Us</a> page
                </p>
            </text>
        </div>
        <div className="rechteck-Start2">
            <text className="Start2-Text">
                <h1 style={{textAlign: 'center'}}>So why should you use MEMORITER</h1>
                <ul> 
                    <li> You can organize your content in flashcards.</li>
                    <li>Its a webapp! Have it everwhere you go. On every operating system.</li>
                    <li>Its free!</li>
                </ul>
            </text>
            
        </div>
        <div className="rechteck-Start3">
            <text className="Start3-Text">
                <h1 style={{textAlign: 'center'}}>Collaboration parterns?</h1>
                <p style={{lineHeight:1.5}}> The JUNIOR programme has helped the founding process of memoriterand it would not exist without them. 
                    It helps students learn economics in school, by making them create a student company and let them deal with the logistics of that.
                    <div></div>The collaboration only lasts one year.
                    Soon the year of their influence over us will be over and we will be able to develop memoriter more freely and without constraints
                </p>
            </text>
        
        </div>
        <footer><FooterStart/></footer>
    </>
    );
}
export default Start;
