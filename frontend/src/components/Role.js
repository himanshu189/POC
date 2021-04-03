import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Admin from './admin';
import User from './user';
const Role = ({inn,setinn}) => {
    const[state,setState]=useState('')

useEffect(()=>{
 const token =sessionStorage.getItem('auth-token')
    axios
      .get("http://localhost:3001/api/posts", token&&{
        headers: {
          "auth-token":
            token
        },
      })
      .then(res => {
        console.log(res.data)
        setState(res.data)
      })
      .catch(err =>  setState(err.response.data)
      );

},[])

   

  

  return ( <div>




{state=="0"?<User  inn={inn} setinn={setinn} />:state=="1"?<Admin/>:<h1>{state}</h1>}



  </div> );
}
 
export default Role;