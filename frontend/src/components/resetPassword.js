import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
const ResetPassword = () => {

  const[email,setEmail]=useState({email:''})
  const history = useHistory()

const handleReset=()=>{

axios.post('http://localhost:3001/api/user/reset',email)
.then(res=>{alert(res.data)
history.push('/login')
})
.catch(err=>alert(err.response.data))

}

  return ( <div>

    <h1>reset password</h1>
    <input className='m-3' type="email" placeholder="enter your email" onChange={(e)=>setEmail({...email,email:e.target.value})} ></input> <br></br>
    <button className='btn btn-lg btn-primary m-2'
    onClick={handleReset} > Send email </button>
  </div> );
}
 
export default ResetPassword;