import Logo from '../../../images/memoriter-logo.svg';
import Footer from "../../../components/footer/footer";
import { Link } from 'react-router-dom';

function About() {

    let lastPage = localStorage.getItem('lastPage');

    return (
        <>
            <header>
                <Link to='/'>
                    <img className="header-logo" src={Logo} alt="site-logo" style={{ top: '-2.5px', zIndex: '10' }}></img>
                </Link>
                <Link to={lastPage}>
                    <div className="Zurückbutton_Body" style={{ top: '90px', left: '8px', zIndex: '10' }}>
                        <div className="Zurückbutton_Arrow" />
                    </div>
                </Link>
                <h1 className='Legal_Header'>About Us</h1>
            </header>
            <main>
                <article className="Legal_Text">
                    <p>
                        Memoriter is a Project made by made by six students (Alex, Simon, Leo, Nils, Maya and Johan) from Potsdam, Germany. We created the project
                        as a part of of JUNIOR-project.
                        The JUNIOR-project has helped the founding process of Memoriter and it would not exist in this way without them.
                        It helps students learn economics in school, by making them create a student company and let them deal with the logistics of that.
                    </p>
                    <p>
                        The collaboration only lasts one year.
                        Soon the year of their influence over us will be over and we will be able to develop Memoriter more freely and without constraints.
                        We created the project, because we wanted to learn more about the subject and to make it more accessible. Also we found the world to be lacking an all-inclusive tool, which is Memoriter.
                        We hope you enjoy the project and we hope you will use it in your studies.
                    </p>
                </article>
                <div style={{ height: '100px' }} />
                <h1 className="Legal_Header">How can I donate?</h1>
                <article className="Legal_Text" style={{ top: "-50px" }}>
                    <p>All of the money donted will only be used to fund the production of the project.</p>
                    <p>IBAN: DE26120965970001900013</p>
                    <p>Paypal: johan@trieloff.net</p>
                </article>
            </main>
            <footer>
                <Footer />
            </footer>
        </>
    );
}

export default About;