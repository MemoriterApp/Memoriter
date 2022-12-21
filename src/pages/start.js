import Logo from '../images/memoriter-logo.svg';
import FooterStart from '../components/footerStart';
import { Link } from "react-router-dom";
import { useEffect } from 'react';

function Start() {

    useEffect(() => {
        localStorage.setItem('lastPage', "/");
    });

    return (
        <>
            <header className='page-header-start'>
                <img className="Logo-Start" src={Logo} alt="site-logo" style={{filter: 'var(--svg-invert)'}}/>
                <div>
                    <Link to='/signup'>
                        <button type="submit" className="SignupButton-Start">Sign Up</button>
                    </Link>
                    <Link to='/login'>
                        <button type="submit" className="login-button-Start">Login</button>
                    </Link>
                </div>
            </header>
            <main>
                <div className='rechteck-Start1a'>
                    <div className="Start1a-Text">
                        <h1>What is MEMORITER?</h1>
                        <p>
                            Discover Memoriter and find out how it will give you a better experience in learning something in school
                            or just to take notes in a different creative way not seen anywhere else on the web.
                        </p>
                        <p>
                            This new design is based on flashcards and features similar to other
                            note taking apps. So, try Memoriter and you won't be dissapointed.
                        </p>
                        <p>
                            If you want to learn something about us, the developers, head to our <a href='/About' className='About_Us-Start'>About Us</a> page.
                        </p>
                    </div>
                </div>

                <div className='QA-Flashcards'>
                    <div className='how-does-it-work-body'>
                        <div className='how-does-it-work'>
                            <h1 className='QA-flashcard-title'>How does it work?</h1>
                            <article className='QA-flashcard-content'>
                                <p>
                                    With <span className='bold'>Memoriter</span> you can create different <span className='bold'>folders</span>, depending on the subject you want to study.
                                    Inside of this folder you can create different <span className='bold'>flashcards</span> like on this page.
                                </p>
                                <p>
                                    You always have a <span className='bold'>flashcard title</span>, which should be your question
                                    and the <span className='bold'>flashcard content</span> which should be the answer to the question. This way you have the perfect overview of the subject you want to study.
                                    If you are interested go and log in to see it for yourself and create your own flashcards.
                                </p>
                            </article>
                        </div>
                    </div>
                    <div className='how-does-it-work-body'>
                        <div className='how-does-it-work'>
                            <h1 className='QA-flashcard-title'>Why should I use Memoriter?</h1>
                            <article className='QA-flashcard-content'>
                                <ul className='why-list'>
                                    <li>You can organize your content in flashcards</li>
                                    <li>You will have a great overview</li>
                                    <li>It is scientifically the most efficient way to study</li>
                                    <li>You can categorize your subjects into different folders</li>
                                    <li>You will make us happy!</li>
                                </ul>
                            </article>
                        </div>
                    </div>
                    <div className='how-does-it-work-body'>
                        <div className='how-does-it-work'>
                            <h1 className='QA-flashcard-title' style={{ left: "3.5px" }}>How much does it cost?</h1>
                            <article className='QA-flashcard-content'>
                                <p>
                                    Thats the best part, it is totally <span className='bold'>free!</span>. Memoriter is currently a non profit project, we do not have an incentive to make money off of this project.
                                    We also do not have any server costs at the moment. {/*But nevertheless if you want to support us you can  <span className='bold'>donate</span> 
                            to our bank account, more info on the 'About Us'.*/}
                                </p>
                            </article>
                        </div>
                    </div>
                </div>

                {/*<div className="rechteck-Start2">
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
        
    </div>*/}
            </main>
            <footer>
                <FooterStart />
            </footer>
        </>
    );
}
export default Start;
