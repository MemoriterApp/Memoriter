import React from 'react';
import { Link } from 'react-router-dom';

const BackButton = () => {

    return (
        <Link to='/' >
            <div className='Zurückbutton_Body'>
               <div className='Zurückbutton_Arrow'/> 
            </div>  
        </Link>
    );
}

export default BackButton;
