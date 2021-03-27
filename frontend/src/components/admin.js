import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "../App.css"
const Admin = () => {
  const[users,setUsers]=useState([])
  const[change,setChange]=useState(true)
  const[count,setCount]=useState(0)
  const[count2,setCount2]=useState(0)
  const[ind,setInd]=useState()

  const[data,setData]=useState({
    name:'',
    email:'',
    password:''
    
      })
      const[data2,setData2]=useState({
        name:'',
        email:''
        
          })
useEffect(()=>{
  const token =sessionStorage.getItem('auth-token')

axios.get("http://localhost:3001/api/admin", token&&{
  headers: {
    "auth-token":
      token
  },
})
.then(res=> setUsers(res.data))
.catch(err=>console.log(err))

},[change])
const handleDelete=(id)=>{

axios.delete(`http://localhost:3001/api/admin/${id}`)
.then(result=>{console.log(result);
setChange(!change)})
.catch(err=>console.log(err))

}
const handleAdd=()=>{
 setCount(1)
}
const handleEdit=(i)=>{
  setInd(i)
  setCount2(1)
 }
const HandleAdding=()=>{
  axios.post('http://localhost:3001/api/user/register',
     data
    )
    .then(res=>{alert("Successfully Added");
    setCount(0);
    setChange(!change)
})
    .catch(err=>alert(err.response.data))

}
const HandleAdding2=()=>{
    setCount(0);
}
const HandleAdding3=()=>{
  setCount2(0);
}

const HandleEditting=(id)=>{
  axios.put(`http://localhost:3001/api/admin/${id}`,
     data2
    )
    .then(res=>{alert("Successfully editted");
    setCount2(0);
    setChange(!change)
})
    .catch(err=>alert(err.response.data))

}
  return (<div className='container'>
{users &&users.map((user,i)=>(
  user.role==1&&<h1>hello {user.name}  (admin) </h1>
))}

{count==0?<button className="btn btn-lg btn-primary m-5" onClick={handleAdd} >Add New </button>:<div>
<label>Name : </label><br></br>
<input id="name"  type='text' value={data.name} onChange={e=>setData({...data,name:e.target.value})} /> <br></br>
<label>Email : </label><br></br>
<input id="email" type='email'  value={data.email} onChange={e=>setData({...data,email:e.target.value})} /><br></br>
<label>Password : </label><br></br>
<input id="password" type='password'  onChange={e=>setData({...data,password:e.target.value})} /><br></br>
<button button className="btn btn-sm btn-primary m-5" onClick={HandleAdding2} >cancel</button>

<button button className="btn btn-sm btn-primary m-5" onClick={HandleAdding} >ADD</button>
</div>

 }

  <div className='marg'>

   {console.log(users)}
    {users &&users.map((user,i)=>(
      
      user.role==0? <div className='card bg-dark text-light'>
      
<h3>{user.name}</h3>
<h3>{user.email}</h3>
{count2 === 1 && ind &&  i === ind ?<div>
<label>Name : </label><br></br>
<input id="name"  type='text' value={data2.name} onChange={e=>setData2({...data2,name:e.target.value})} /> <br></br>
<label>Email : </label><br></br>
<input id="email" type='email'  value={data2.email} onChange={e=>setData2({...data2,email:e.target.value})} /><br></br>
<button button className="btn btn-sm btn-primary m-5" onClick={HandleAdding3} >cancel</button>

<button button className="btn btn-sm btn-primary m-5" onClick={()=>HandleEditting(user.id)} >Edit</button>
</div>:<button className='btn btn-sm btn-warning' onClick={()=>handleEdit(i)} >edit</button>
}


<button className='btn btn-sm btn-danger' onClick={()=>handleDelete(user.id)} >delete</button>

      </div>:<span></span>
    ))  } </div>
  </div>  );
}
 
export default Admin;