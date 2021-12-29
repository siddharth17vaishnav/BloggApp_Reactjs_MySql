import React,{useState} from 'react';
import BackArrow from '../assets/backarrow.png';
import '../style/createpost.css';
import {useHistory} from 'react-router-dom';
import Axios from 'axios';

const CreateaPost = () => {
    let history= useHistory();
    const profile = localStorage.getItem("profile");
    const username = localStorage.getItem("username");
    const[title,setTitle]=useState("");
    const[desc,setDesc]=useState("");


    const post = ()=>{
        Axios.post("http://localhost:3001/post",{title:title,desc:desc,username:username,profile : profile});
        history.push("/");
        setTimeout(() => { window.location.reload(false)  }, 1000);
    }
   
    return (
        <div>
            <div className="back" onClick={()=>history.push("/")}>
                <img src={BackArrow} alt="back to Home" style={{width:30}}/>
                <span style={{marginLeft:10}}>Back to Home</span>
             </div>

            <div className="header">
                <div className="cp">
                Create a Post
                </div>
            </div>
            <form onSubmit={post}>
            <div className="titleWrapper">
                <input type="text" placeholder="title here" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" onChange={(e)=>setTitle(e.target.value)} required/>
            </div>

            <div className="discriptionWrapper">
             <textarea class="form-control" placeholder=" description here" id="floatingTextarea2" style={{height:"500px"}} onChange={(e)=>setDesc(e.target.value)} required></textarea>
            </div>

            <div className="submit">
            <button className="btn btn-success" type="submit">Submit </button>
            </div>
            </form>
        </div>
    )
}

export default CreateaPost
