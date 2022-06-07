import { setCurrentScreen } from "firebase/analytics";
import React, { useContext, useEffect, useState } from "react";
import { firebase } from '../utils/firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser, setcurrentUser] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const unsubscribe = firebase.auth.onAuthStateChanged(user => {
            setcurrentUser(user)
            setLoading(false)
        })

        return unsubscribe;
    }, [])

    const value = {
        currentUser,
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

