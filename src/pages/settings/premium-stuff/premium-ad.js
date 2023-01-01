import React from 'react';
import { Link } from 'react-router-dom';
import './premium-ad.css';

function PremiumAd() {
    return (
        <>
            <div className='premium-ad-box'>
                <h1 className='premium-heading'>MEMORITER PREMIUM</h1>
                <section>
                    <h2 className='premium-subheading'>🤖 Get access to CheatPT-3 🤖</h2>
                    <article>
                        <p className='premium-text'>CheatPT-3 is Memoriter's own Discord Bot. It will help you doing your homework. Simply add it to your server, type '/study' followed by your task and the Bot will generate the perfect answer
                        The best part: it's only 0.99€</p>
                        <a 
                            className='premium-text' 
                            style={{top:'-20px'}}
                            href='https://discord.gg/cGZXHz9avA' 
                        >Try it out</a>
                    </article>
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