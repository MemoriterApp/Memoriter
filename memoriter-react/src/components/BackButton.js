import React from 'react';
import { Link } from 'react-router-dom';
import HomePage from '../pages/home';

const BackButton = () => {

    return (
        <Link to='/home' >
            <div className='Zurückbutton_Body'>
               <div className='Zurückbutton_Arrow'/> 
            </div>
            
        </Link>
    );
}

export default BackButton;
