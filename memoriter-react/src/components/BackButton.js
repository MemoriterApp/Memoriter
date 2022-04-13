import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {

    let history = useNavigate()

    return (
        <div className='Zurückbutton_Body' onClick={() => history('/')}>
            <div className='Zurückbutton_Arrow'/>
        </div>
    );
}

export default BackButton;
