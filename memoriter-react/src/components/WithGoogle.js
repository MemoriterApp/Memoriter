import React from "react";
import signInwithGoogle from "../utils/googleSignin";

function WithGoogle() {
    return (
        <button onClick={signInwithGoogle} type="submit" className="google-button">
            Sign in with Google 
        </button>
    );
}

export default WithGoogle;
