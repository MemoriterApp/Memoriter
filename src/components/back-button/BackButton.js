import './back-button.css';
import React from 'react';
import { Link } from 'react-router-dom';

const BackButton = () => {

    return (
        <Link to='/' >
            <div className='back-arrow'/> 
        </Link>
    );
};

export default BackButton;
