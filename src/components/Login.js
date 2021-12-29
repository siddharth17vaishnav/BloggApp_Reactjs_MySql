import React,{useState} from 'react';
import Axios from 'axios';
import {useHistory,Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from '../assets/logo.png'
import '../style/login.css';


const Login = () => {
  const[username,setUsername]=useState("");
  const[password,setPassword]=useState("");

  let history= useHistory();

  const onSubmit=(e)=>{
    e.preventDefault();
    Axios.post("http://localhost:3001/user/login",{username:username,password:password}).then(res=>{
      const error = res.data.error;
      if(error){
        toast.error(error,{position:"top-center"});
      }
      else{
        localStorage.setItem("accessToken",res.data.token);
        localStorage.setItem("username",res.data.username);

        toast.success("Successfully logged in",{position:"top-center"});
        if(res.data.type === "user"){
          setTimeout(() => { history.push("/");  }, 2000);
        }
        else{
          setTimeout(() => { history.push("/user/admin/dashboard");  }, 2000);
        }
        
      
      
      }
      
    })
  }


    return (
        <div className="App" style={{textAlign:"center"}}>
           <ToastContainer />
            <div  style={{marginTop:"100px"}}>
          
<h1 >Login into <div className="logo"><img src={Logo} alt="logo" style={{borderRadius:"0px",width:30,marginRight:10}}/>Code.Blog</div></h1>
</div>
       
            
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>     
                <form onSubmit={onSubmit}>
                <div className="input-group mb-3">
              <span className="input-group-text" >  @ </span>
              <input type="text" className="form-control" placeholder="Username" aria-label="Username" onChange={(e)=>setUsername(e.target.value)} required/>
              
            </div>

              <div className="input-group mb-3">
                <span className="input-group-text" > <img src="https://img.icons8.com/material-rounded/24/000000/lock--v1.png" alt="lock" style={{width:18}}/></span>
                <input type="password" className="form-control" placeholder="Password" aria-label="Password" onChange={(e)=>setPassword(e.target.value)}  required/>
              </div>
              <button type="submit" className="btn btn-primary">Login</button>

              <div style={{paddingTop:"10px"}}>
              <Link to="/register">New user Register here</Link>
                  </div>
                  </form>
              </div>
        </div>
    )
}

export default Login
