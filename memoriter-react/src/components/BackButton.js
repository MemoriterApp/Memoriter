import React from 'react';
import { Link } from 'react-router-dom';
import HomePage from '../pages/home';

const BackButton = () => {

    let lastPage = localStorage.getItem('lastPage')

    return (
        <Link to={lastPage} >
            <div className='Zurückbutton_Body'>
               <div className='Zurückbutton_Arrow'/> 
            </div>  
        </Link>
    );
}

export default BackButton;
