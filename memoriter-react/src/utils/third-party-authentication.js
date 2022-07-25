//functions for Google, Apple, Facebook and Github authentication

import { firebase } from './firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export function signInWithGoogle() { //google sign in function
    const provider = new GoogleAuthProvider(); //google account data

    signInWithPopup(firebase.auth, provider); //firebase pre-built sign in function
};