//This component redirects you to the signup page

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Redirect = () => {
    const navigate = useNavigate();

    useEffect(() => { //if no user is signed in and this page loads, you are redirected to the signup page
        navigate('/signin');
    });

    return null;
}

export default Redirect;