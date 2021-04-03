import axios from 'axios';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
const NewPassword = () => {
  var idd=useParams()
  const[data,setData]=useState({
    id:idd.id,
    new:''
    , confirm:''

  })
  // setData({...data,id:useParams()})
const history=useHistory()


  const handleReset=()=>{


    axios.put('http://localhost:3001/api/user/newPassword',data)
    .then(res=>alert(res.data))
    .catch(err=>alert(err.response.data))


history.push('/login')


  }


  return ( <div>
{console.log(data)}
<h1>Reset Password</h1>

<input className='m-2' type='password' placeholder='Enter new password'
onChange={(e)=>setData({...data,new:e.target.value})} /><br></br>
<input className='m-2'  type='password' placeholder='Confirm new password' 
  onChange={(e)=>setData({...data,confirm:e.target.value})} 
/><br></br>
<button className='btn btn-lg btn-primary m-2' onClick={handleReset} >RESET</button>

  </div> );
}
 
export default NewPassword;