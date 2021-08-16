// eslint-disable-next-line
import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import { useHistory } from "react-router-dom";


const FinalPage = ({ setIsHeaderShown,columnOne,columnTwo,columnThree,columnFour,userName1}) => {
  
    let history = useHistory();
    useEffect(() => {
        setIsHeaderShown(false);
    }, [setIsHeaderShown])
    Swal.fire({
        // eslint-disable-next-line
        title: 'Tebrikler.' + "\n KOLON 1 TOPLAMINIZ " + (columnOne) + "\n KOLON 2 TOPLAMINIZ " + (columnTwo) + "\n KOLON 3 TOPLAMINIZ " + (columnThree) + "\n KOLON 4 TOPLAMINIZ " + (columnFour) + "\n İSİM: " + (localStorage.getItem("username")),
        imageUrl: 'https://media-exp3.licdn.com/dms/image/C4D0BAQFeJsyITY4v0w/company-logo_200_200/0/1519892480269?e=1634169600&v=beta&t=elZl28kSwhAauf3XJ6-a5FgpRySD10NKeEdyPK_TfdU',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
      }).then((result) => {
        if (result.isConfirmed) {
            history.push("/");
              }
            
          
      }
)
    return (
        ""
    )}

export default FinalPage
