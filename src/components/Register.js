import React,{useState} from 'react';
import Axios from 'axios';
import {useHistory,Link} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingGif from '../assets/loading.gif';
import '../style/login.css';
import Logo from '../assets/logo.png'


const Register = () => {
  const[name,setName]=useState("");
  const[email,setEmail]=useState("");
  const[password,setPassword]=useState("");
  const[username,setUsername]=useState("");
  const[mobile,setMobile]=useState("");
  const[profile,setProfile]=useState("");
  const[loading,setLoading]=useState(false);
  const [file,setFile] = useState("");
  let history= useHistory();

  const  onSubmit = (e)=>{
    e.preventDefault();
   
    Axios.post("http://localhost:3001/user",{name:name,email:email,password:password,username:username,mobile:mobile,profile:profile}).then(res=>{
      console.log(res);
      if(res.data === "User already exist"){
        toast.error(res.data,{position:"top-center"});
      }
      else{
        history.push("/");
      }
     
     
    })
  }

  const upload =()=>{
    setLoading(true);
    const formData = new FormData();
    formData.append("file",file);
    formData.append("upload_preset","udy5hl7k");

   fetch("http://api.cloudinary.com/v1_1/code-siddharth/upload",{
     method:"POST",
     body:formData
   }).then((res)=> res.json()).then((res)=>{
     setLoading(false);
     setProfile(res.secure_url);
   });
   
  }


    return (
        <div className="App" style={{textAlign:"center"}}>
           <ToastContainer />
            <div  style={{marginTop:"100px"}}>
            
<h1 >Register into <div className="logo"><img src={Logo} alt="logo" style={{borderRadius:"0px",width:30,marginRight:10}}/>Code.Blog</div></h1>
</div>
       
            
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
            
    <form onSubmit={onSubmit}>
    <div className="input-group mb-3">
  <span className="input-group-text" >  * </span>
  <input type="text" className="form-control" placeholder="Name" aria-label="Name" onChange={(e)=>setName(e.target.value)} required/>
  
</div>

<div className="input-group mb-3">
  <span className="input-group-text" > @</span>
  <input type="text" className="form-control" placeholder="Email" aria-label="Email" onChange={(e)=>setEmail(e.target.value)}  required/>
</div>

<div className="input-group mb-3">
  <span className="input-group-text" > # </span>
  <input type="password" className="form-control" placeholder="Password" aria-label="password" onChange={(e)=>setPassword(e.target.value)} required/>
  
</div>

<div className="input-group mb-3">
  <span className="input-group-text" > @</span>
  <input type="text" className="form-control" placeholder="Username" aria-label="Username" onChange={(e)=>setUsername(e.target.value)}  required/>
</div>

<div className="input-group mb-3">
  <span className="input-group-text" > /</span>
  <input type="number" className="form-control" placeholder="Mobile" aria-label="Mobile" onChange={(e)=>setMobile(e.target.value)} required/>
</div>

<div className="input-group mb-3">
<span className="input-group-text" > <img src="https://img.icons8.com/ios-glyphs/20/000000/user--v1.png" alt="logo" style={{width:18}}/></span>
  <input type="file" className="form-control" onChange={(e)=>setFile(e.target.files[0])} required/>
  <button type="button" className="btn btn-primary" onClick={upload}>upload</button>
  {!loading ? "":<img src={LoadingGif} alt="loading" style={{width:40,height:40}}/>}
</div>

<button type="submit" className="btn btn-primary">Register</button>
<div style={{paddingTop:"10px"}}>
<Link to="/login">Already a User...Login here</Link>
    </div>
    </form>
</div>
        </div>
    )
}

export default Register
