import React, { useEffect, useState } from 'react';
import axios from "axios"
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
const Signin = () => {
  const[user,setUser]=useState({
name:'',
email:'',
password:''

  })
  const[count,setCount]=useState()

  // useEffect(()=>{
  //   axios.post('http://localhost:3001/api/user/register',
  //     {
  //       name:"himanww",
  //       email:"admin1@gmail.com",
  //       password:"himanshu@123",role:1
  //   }
  //   )
  //   .then(res=>console.log(res))
  //   .catch(err=>console.log(err.response.data))
  // },[])
const handleSubmit=(e)=>{
e.preventDefault()
axios.post('http://localhost:3001/api/user/register',
     user
    )
    .then(res=>{alert("Successfully Registered");
    setCount(1)
})
    .catch(err=>alert(err.response.data))
}

  return ( <div>
<h1>Register!!!</h1>
<form onSubmit={(e)=>handleSubmit(e)}>

<label>Name : </label><br></br>
<input id="name"  type='text' value={user.name} onChange={e=>setUser({...user,name:e.target.value})} /> <br></br>
<label>Email : </label><br></br>
<input id="email" type='email'  value={user.email} onChange={e=>setUser({...user,email:e.target.value})} /><br></br>
<label>Password : </label><br></br>
<input id="password" type='password'  onChange={e=>setUser({...user,password:e.target.value})} /><br></br>
 {/* <p>Please select your role:</p>
  <input type="radio" id="admin" name="role" value={1} onClick={()=>console.log('jhdikjh')} />
  <label for="admin">admin</label><br/>
  <input type="radio" id="user" name="eole"  value={0} />
  <label for="user">user</label><br/>  */}
<button className='btn btn-sm btn-primary m-2' type='submit'>Register</button>
</form>
<p>Already have an account? <Link to='/login'> login</Link></p>
        {count && <Redirect to="/login" />}

  </div> );
}
 
export default Signin;
