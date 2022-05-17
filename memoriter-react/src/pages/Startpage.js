import Logo from './Logo.png';
import SettingsIcon from '../components/SettingsIcon';
import AddFolderForm from '../components/AddFolderForm';
import Backdrop from '../components/backdrop';
import Footer from '../components/Footer';

function Startpage() {
    return (
         <>
         <header className='Page_Header'>
           
            <img className="Logo-startpage" src={Logo} alt="site-logo" />
        </header>
        <div className="rechteck">
            <h2 className="Overview">Overview</h2>
                <SettingsIcon />
        </div>
            <footer>
                <Footer />
            </footer>
        </>
    );
}
export default Startpage;
