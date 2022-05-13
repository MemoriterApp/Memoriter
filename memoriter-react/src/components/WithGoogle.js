import React from "react";
import signInwithGoogle from "../utils/googleSignin";

function WithGoogle({login}) {
    return (
        <button onClick={login} type="submit" className="google-button">
            Sign In with Google 
        </button>
    );
}

export default WithGoogle;
