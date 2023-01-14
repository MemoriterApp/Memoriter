import React from 'react';
import './premium-ad.css';

function PremiumAd() {
    return (
        <>
            <div className='premium-ad-box'>
                <h1 className='premium-heading'>MEMORITER PREMIUM</h1>
                <section>
                    <article>
                        <h2 className='premium-subheading'>🤖 Get access to CheatPT-3 🤖</h2>
                        <p className='premium-text'>
                            CheatPT-3 is Memoriter's own Discord Bot. It will help you doing your homework. Simply add it to your server, type '/study' 
                            followed by your task and the Bot will generate the perfect answer.
                        </p>
                        <a 
                            className='premium-text' 
                            style={{top:'-20px'}}
                            href='https://discord.gg/cGZXHz9avA' 
                        >Try it out and get more info</a>
                    </article>
                    <article>
                        <h2 className='premium-subheading'>✍ Auto-complete your flashcards ✍</h2>
                        <p className='premium-text'>
                            Memoriter Premium will automatically complete your flashcards. You don't have to type in the answer anymore. 
                            Just type in the question and the the ai will suggest the answer. <br/>
                            Simply press 'tab' to accept the suggestion.
                        </p>
                    </article>
                    <p style={{height:'20px'}}/>

                    <a href='https://buy.stripe.com/eVa5kLakf9Jk3mM3cc'>
                        <button className='premium-button'>
                            <p style={{position:'relative', bottom:'10px'}}>GET NOW!</p>
                        </button>
                    </a>
                    <a href='https://checkout.memoriter.de/p/login/eVa03K5AF7VtdSofYY'>
                        <button className='manage-button'>
                            <p style={{position:'relative', bottom:'10px'}}>Manage Subscription</p>
                        </button>
                    </a>
                </section>
            </div>
        </>
    );
}

export default PremiumAd;