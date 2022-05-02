import React from "react";
import signInwithGoogle from "../utils/googleSignin";

function WithGoogle({login}) {
    return (
        <button onClick={login} type="submit" className="google-button">
            Sign in with Google 
        </button>
    );
}

export default WithGoogle;
