// eslint-disable-next-line
import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import { useHistory } from "react-router-dom";
import emailjs from 'emailjs-com';


const FinalPage = ({ setIsHeaderShown,columnOne,columnTwo,columnThree,columnFour,userName1}) => {
  
    let history = useHistory();

    function sendEmail() {
        emailjs.send("service_7x2p9e9","template_ivteynx",{
            from_name: localStorage.getItem("username"),
            c1: columnOne,
            c2: columnTwo,
            c3: columnThree,
            c4: columnFour,
            },"user_elVGwF3RMAhJrypWMNILy").then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
        return;
      }
      const ShowMessage = () => {
        Swal.fire({
            // eslint-disable-next-line
            title: 'Teşekkürler, Anketi tamamladınız.',
            imageUrl: 'https://media-exp3.licdn.com/dms/image/C4D0BAQFeJsyITY4v0w/company-logo_200_200/0/1519892480269?e=1634169600&v=beta&t=elZl28kSwhAauf3XJ6-a5FgpRySD10NKeEdyPK_TfdU',
            imageWidth: 400,
            imageHeight: 200,
            imageAlt: 'Custom image',
          }).then((result) => {
            if (result.isConfirmed) {
                sendEmail();
                history.push("/");
                  }
          }
    )
      }
     


    useEffect(() => {
        setIsHeaderShown(false);
        ShowMessage();
    }, [setIsHeaderShown])

    return(
        <div></div>
    )
    
}

export default FinalPage
