import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebase } from "./firebase";


const provider = new GoogleAuthProvider()
const signInwithGoogle = (...args) => {
    signInWithPopup(firebase.auth, provider).then((results) => {
        console.log('just logged in', results);
        
    }).catch((error) => {
        console.log(error)
    })
}

export default signInwithGoogle;
