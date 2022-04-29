import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebase } from "./firebase";


const provider = new GoogleAuthProvider()
const signInwithGoogle = () => {
    signInWithPopup(firebase.auth, provider).then((results) => {
        console.log(results);

    }).catch((error) => {
        console.log(error)
    })
}

export default signInwithGoogle;
