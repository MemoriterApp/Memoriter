import Footer from "../components/Footer";
import Logo from './Logo.png';
import { Link } from 'react-router-dom';


function PrivacyPage() {

    let lastPage = localStorage.getItem('lastPage');

    return(
        <div>
            <Link to='/'>
                <img className="Logo-oben" src={Logo} alt="site-logo" style={{top: '-2.5px'}}></img>
            </Link>
            <Link to={lastPage}>
                <div className="Zurückbutton_Body" style={{top: '90px', left: '8px'}}>
                    <div className="Zurückbutton_Arrow"/>
                </div>
            </Link>
            <h1 className='Legal_Header'>Privacy Policy</h1>
            <p className="Legal_Text">The following information will give you an overview of what happens to your data.</p>
            <p className="Legal-SubHeader" style={{top: '200px'}}>What data is being collected?</p>
            <article className="Legal_Text" style={{top:'265px'}}>
                The users data, such as the flashacards are collected inside of the databse. In Detail the data of everything regarding the flashcards,
                the files are being safed on the database. Furthermore we also safe the mail adress and password of the user, but the password in securely encripted.
            </article>
            <p className="Legal-SubHeader" style={{top: '355px'}}>What happens with my data?</p>
            <article className="Legal_Text" style={{top: '420px'}}>
                All of the regular data, such as flashcards are being stored inside of the firebase firestore database.
                All of the data regarding the user such as passwords are being stored inside the authorisation database inside of firestore.
                If you have security concerns about the storage of data, we recomend reading the privacy policies of firebase.
                All of the Data except the password is visible to the admin.
            </article>
            <p className="Legal-SubHeader" style={{top: '530px'}}>storage period</p>
            <article className="Legal_Text" style={{top: '590px'}}>The data will be stored until the account is deleted. Unfortunately it is curently not possible to delete an account. </article>
            <Footer/>
        </div>
    );
}
export default PrivacyPage;