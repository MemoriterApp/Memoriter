/*Wrapper component removes issues with displaying the wrong page for a few seconds when page loads.
When no user is signed in, the sign in only pages display before checking if a user is signed in for the redirect to occurr.
This component adds an extra condition (loading) wich prevents the page rendering during unclear user status.*/

import React, { useState, useEffect, useContext, createContext } from 'react';
import { firebase } from '../utils/firebase';

const AuthContext = createContext(); //necessary to work

export function useAuth() { //creates part of the component
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const [user, setUser] = useState(); //checks if user is signed in
    const [loading, setLoading] = useState(true); //when loading is true the wrong page cannot display

    useEffect(() => {
        const unsubscribe = firebase.auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser); //sets user
            setLoading(false); //disables loading
        });

        return unsubscribe;
    }, []);

    const value = { user }; //currently signed in user

    return (
        <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
    //children refers to the content inside the wrapper (all routes)
    );
}