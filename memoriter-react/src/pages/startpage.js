import React from "react";
import Logo from "./Logo.png"
import Logo_klein from "./Memoriter_logo.png";

function Startpage() {
  return (
    <>
      <header className="StartpageHeader">
        <img className="StartpageHeaderLogo" src={Logo}/><span className="StartpageHeaderSpan"><button className="StartpageHeaderButton">Create Account</button><button className="StartpageHeaderButton">Login</button></span>
      </header>
      {/*Startpage Content Section*/}
      <body>
        <div className="StartpageSection1">
          <img className="StartpageSectionPicture" src={Logo_klein}/>
          <span className="StartpageSectionText">
            <h1>Memoriter?</h1>
            Das ist ein verüüücktes Online-Tool.
            Das ist ein verüüücktes Online-Tool.
            Das ist ein verüüücktes Online-Tool.
          </span>
        </div>
        <div className="StartpageSection1">
          <img className="StartpageSectionPicture" src={Logo_klein}/>
          <span className="StartpageSectionText">
            <h1>Memoriter?</h1>
            Das ist ein verüüücktes Online-Tool.
            Das ist ein verüüücktes Online-Tool.
            Das ist ein verüüücktes Online-Tool.
          </span>
        </div>
      </body>
    </>
  );
}

export default Startpage;
