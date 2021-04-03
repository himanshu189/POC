import React, { useEffect, useState } from 'react';
import axios from "axios"
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
const Login = ({inn,setinn}) => {
  const[user,setUser]=useState({
email:'',
password:''

  })
  const[count,setCount]=useState()
  
const handleSubmit=(e)=>{
e.preventDefault()
axios.post('http://localhost:3001/api/user/login',user)
.then(res=>{sessionStorage.setItem("auth-token",res.headers['auth-token']);
setinn(true)

})
.catch(err=>alert(err.response.data))
}

  return ( <div>
<h1>Login!!!</h1>
<form onSubmit={(e)=>handleSubmit(e)}>

<label>Email : </label><br></br>
<input id="email" type='email'  value={user.email} onChange={e=>setUser({...user,email:e.target.value})} /><br></br>
<label>Password : </label><br></br>
<input id="password" type='password'   onChange={e=>setUser({...user,password:e.target.value})} /><br></br>

<button className='btn btn-sm btn-primary m-2' type='submit'>Login</button>
</form>
<p>Don't have an account? <Link to='/signin'> Signin</Link></p>
<Link to='/reset'> <h3>Forgot password?</h3></Link>


    {inn && <Redirect to="/role" />}
  </div> );
}
 
export default Login;
