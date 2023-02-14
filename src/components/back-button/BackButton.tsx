import './back-button.css';
import { FC } from 'react';
import { Link } from 'react-router-dom';

const BackButton: FC = () => {

    return (
        <Link to='/' >
            <div className='back-arrow'/> 
        </Link>
    );
};

export default BackButton;
