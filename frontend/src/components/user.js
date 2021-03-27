import axios from 'axios';
import React, { useEffect, useState } from 'react';
const User = () => {
  const[data,setData]=useState()
  const[count,setCount]=useState(0)
  const[change,setChange]=useState(true)
  const[user,setUser]=useState({
    name:'',
    email:''
    
      })
  useEffect(()=>{
    const token =sessionStorage.getItem('auth-token')
  
  axios.get("http://localhost:3001/api/user", token&&{
    headers: {
      "auth-token":
        token
    },
  })
  .then(res=>setData(res.data))
  .catch(err=>console.log(err))
  
  },[change])
  function formatDate(string) {
    var options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(string).toLocaleDateString([], options);
  }
const handleChange=()=>{
setCount(1)
}
const handleChange2=()=>{
  setCount(0)
  }
  const handleSave=(id)=>{
    axios.put(`http://localhost:3001/api/admin/${id}`,
    user
   )
   .then(res=>{alert("Successfully editted");
   setCount(0)   
   setChange(!change)
   
})
   .catch(err=>alert(err.response.data))

 
  }

  return (<div>
{
data && count===1? <div>

<label>Name : </label><br></br>
<input id="name"  type='text' value={user.name} onChange={e=>setUser({...user,name:e.target.value})} /> <br></br>
<label>Email : </label><br></br>
<input id="email" type='email'  value={user.email} onChange={e=>setUser({...user,email:e.target.value})} /><br></br>

<button className="btn btn-sm btn-primary m-5" onClick={handleChange2} >cancel</button>
<button className="btn btn-sm btn-primary m-5" onClick={()=>handleSave(data._id)} >Save</button>
</div>


: data&&<div> <h1 className='bg-success text-light'>Hello {data.name}</h1>
<div  className="m-5">
<h3> Name : {data.name}</h3>
<h3>Email: {data.email} </h3>
<h3> Registration Date : {formatDate(data.date)} </h3></div>

<button className='btn btn-lg btn-primary m-5' onClick={handleChange} >Edit Info</button>
<button className='btn btn-lg btn-danger m-5' >Reset password</button>
 </div>
}
  </div>  );
}
 
export default User;