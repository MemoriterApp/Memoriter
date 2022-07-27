import Head from './head';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Redirect = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/signin');
    });

    return(
        <Head title='Redirecting...' description='Redirecting...'/> //just returns the head for displaying a tab title
    );
}

export default Redirect;