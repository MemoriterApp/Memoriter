import React from "react";
import {Navigate, Outlet} from "react-router-dom";
import { firebase } from '../utils/firebase';
import { onAuthStateChanged } from "firebase/auth";
import {useState} from 'react'


function PrivateRoutes() {

    const [user, setUser] = useState({});

    onAuthStateChanged(firebase.auth, (currentUser) => {
        setUser(currentUser);
    });

    return (
      user ? <Outlet /> : <Navigate to="/" />
    );
}

export default PrivateRoutes;