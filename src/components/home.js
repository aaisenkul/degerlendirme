// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from 'sweetalert2'

const HomePage = () => {
// eslint-disable-next-line
// captcha secret key 6LelhgccAAAAAIs14dcGOSJv3qnI6W1_gRQQKENd
let history = useHistory();

  
  const FormHeader = props => (
    <h2 id="headerTitle">{props.title}</h2>
);


const Form = props => (
   <div>
     <FormInput description="Adınız" placeholder="İsminizi Giriniz" type="text" onChange={(e)=> localStorage.setItem("username",e.target.value)}/>
     <FormInput description="Şifre" placeholder="Verilen Şifreniz" type="number" onChange={(e)=> localStorage.setItem("password",e.target.value)}/>
     <FormButton title="Ankete Başla" click={() => DecodePassword(localStorage.getItem("password"))}/>
   </div>
);

const FormButton = props => (
  <div id="button" className="row">
    <button onClick={props.click}>{props.title}</button>
  </div>
);

const FormInput = props => (
  <div className="row">
    <label>{props.description}</label>
    <input type={props.type} placeholder={props.placeholder} onChange={props.onChange}/>
  </div>  
);

const DecodePassword = (num) => {
  var numb = num.split("").reverse().join("");
  var newNumb = "";
  for(var i = 0; i < numb.length;i++){
    if(numb[i]!="0"){
      newNumb += (parseInt(numb[i])-1).toString();
    }else{
      newNumb += "9";
    }
  }
  newNumb = parseInt(newNumb);
  var time = new Date(newNumb* 1000);
  var diff = (Date.now() - time)/3600000;
  if(diff<=1&&diff>0){
    history.push("/question/1");
  }
  else{
    Swal.fire("Hata","Hatalı şifre girdiniz veya şifreniz yanlış","error");
    
  }
  
}
  




const OtherMethods = props => (
  <div id="alternativeLogin">
    <img src="/logo.png"/>
  </div>
);


  return (
    <div className="loginpage" style={{display: 'content'}}>
    <div id="loginform">
    <FormHeader title="Kişilik Testi" />
    <Form />
    <OtherMethods/>
    </div>
  </div>
    // <div style={{backgroundColor:"yellowgreen",borderRadius:"0.5rem",width:"30%",height:"30%"}}>
    //   <form style={{ paddingBottom: "20px" }} >
    //     <div className="label">
    //     <label >
    //       isminiz: 
    //       <input className="label1"
    //         type="text"
    //         name="name"
    //         placeholder="isminizi yazın"
    //         onChange={(e) => {
    //           localStorage.setItem("username",e.target.value);
    //           debugger;
    //         }}
    //       />
    //     </label>
    //     </div>
    //     <ReCAPTCHA className="captcha"
    //       sitekey="6LelhgccAAAAAH4RDvr1CK0bbJqJ6qPItKD_T2Dd"
    //       onChange={() => setCaptcha(!captcha)}
    //     />
    //   </form>
    //   <div className={"homepage"} hidden={!captcha}>
    //     <NavLink to="/question/1">Ankete Başla</NavLink>
        
    //   </div>
    // </div>
  );
};



export default HomePage;
