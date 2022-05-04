import { setCurrentScreen } from "firebase/analytics";
import React, { useContext, useEffect, useState } from "react";
import { firebase } from '../utils/firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setcurrentUser] = useState();

    function signup(email, password) {
        return firebase.auth.createUserWithEmailAndPassword(email, password)
    }
    useEffect(()=> {
        const unsubscribe = firebase.auth.onAuthStateChanged(user => {
            setcurrentUser(user)
        })

        return unsubscribe;
    }, [])

    const value = {
        currentUser,
        signup
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

