//functions for Google, Apple, Facebook and Github authentication

import { firebase } from './firebase';
import { signInWithPopup, GoogleAuthProvider, OAuthProvider, FacebookAuthProvider, GithubAuthProvider } from 'firebase/auth';

export function signInWithGoogle() { //google sign in function
    const provider = new GoogleAuthProvider(); //connection to google sign in

    signInWithPopup(firebase.auth, provider); //firebase pre-built sign in function
};

export function signInWithApple() { //apple sign in function
    const provider = OAuthProvider('apple.com'); //connection to apple sign in

    signInWithPopup(firebase.auth, provider); //firebase pre-built sign in function
}

export function signInWithFacebook() { //facebook sign in function
    const provider = new FacebookAuthProvider(); //connection to facebook sign in

    signInWithPopup(firebase.auth, provider); //firebase pre-built sign in function
};

export function signInWithGithub() { //github sign in function
    const provider = new GithubAuthProvider(); //connection to github sign in

    signInWithPopup(firebase.auth, provider); //firebase pre-built sign in function
};