import '../../styles/sign-in/sign-in-main.css';
import { useState } from 'react';

const RegisterMain = () => {

    const [onHover, setOnHover] = useState('brightness(1)'); //variable for the hover effect for the create account button

    return (
        <div className='sign-in-main'>
            
            <h1 className='sign-in-main-header'>Register</h1>

            <form>

                <input className='sign-in-main-input' type='email' placeholder='Email Adress'/>

                <input className='sign-in-main-input' type='password' placeholder='Password'/>

                <input className='sign-in-main-input' type='password' placeholder='Confirm Password'/>

                <div className='sign-in-main-button'
                    onMouseEnter={() => setOnHover('brightness(0.75)')} onMouseLeave={() => setOnHover('brightness(1)')}>
                    {/*the onMouseEnter and -Leave is for the fade effect on hover which was not possible in css and the background animation.*/}
                    <div className='sign-in-main-button-background' style={{filter: onHover}}/>
                    <span className='sign-in-main-button-text'>Create Account</span>
                </div>

            </form>

        </div>
    );
}

export default RegisterMain;