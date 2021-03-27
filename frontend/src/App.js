import './App.css';
import Signin from './components/signin';
import "bootstrap/dist/css/bootstrap.css"
import Login from './components/login';
import Role from './components/Role';
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom';
import Welcome from './components/Welcome';
import { useEffect, useState } from 'react';
function App() {

  const[out,setOut]=useState()
  const[inn,setinn]=useState()
  const[re,setre]=useState(false)


  useEffect(()=>{

    var tok= sessionStorage.getItem('auth-token')
    if(!tok){
      setOut(true)
    }
    else{setOut(false)}

  },[inn])

  const handleOut=()=>{

sessionStorage.removeItem('auth-token')
setinn(false)
setre(true)

  }
  return (
    <div className="App">
<ul>
  <li><Link to='/' >HOME</Link></li>
  <li><Link to='/role' >PROFILE</Link></li>
 {out?( <div><li><Link to='/login' >LOGIN</Link></li>
   <li><Link to='/signin' >SIGNIN</Link></li> </div>
)
 :<li><button className='btn btn-lg' onClick={handleOut} >LOGOUT</button></li>} 
</ul>   

  <Switch>
<Route exact path="/" component={Welcome} />
<Route exact path="/signin" component={Signin} />
<Route exact path="/login" component={props=> < Login inn={inn} setinn={setinn} />} />
<Route exact path="/role" component={Role} />

  </Switch>
     {!inn && re && <Redirect to='/login'/>}
    </div>
  );
}

export default App;
