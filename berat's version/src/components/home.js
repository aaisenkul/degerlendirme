// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";


const HomePage = () => {
// eslint-disable-next-line
  const [userName, setUserName] = useState("");
  const [captcha, setCaptcha] = useState(false);
// captcha secret key 6LelhgccAAAAAIs14dcGOSJv3qnI6W1_gRQQKENd

  // eslint-disable-next-line
  function onChange(value) {
    console.log("Captcha value:", value);
  }
  



  return (
    <div style={{backgroundColor:"yellowgreen",borderRadius:"0.5rem",width:"30%",height:"30%"}}>
      <form style={{ paddingBottom: "20px" }} >
        <div className="label">
        <label >
          isminiz: 
          <input className="label1"
            type="text"
            name="name"
            placeholder="isminizi yazın"
            onChange={(e) => {
              localStorage.setItem("username",e.target.value);
              debugger;
            }}
          />
        </label>
        </div>
        <ReCAPTCHA className="captcha"
          sitekey="6LelhgccAAAAAH4RDvr1CK0bbJqJ6qPItKD_T2Dd"
          onChange={() => setCaptcha(!captcha)}
        />
      </form>
      <div className={"homepage"} hidden={!captcha}>
        <NavLink to="/question/1">Ankete Başla</NavLink>
        
      </div>
    </div>
  );
};



export default HomePage;
