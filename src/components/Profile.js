import React,{useEffect,useState} from 'react'
import Axios from 'axios';
import {useHistory} from 'react-router-dom' 
import User from '../assets/user.png';
import '../style/profile.css';
import Logout from '../assets/logout.png'
import Back from '../assets/back.png';
import Delete from '../assets/delete.png';
import { useParams } from 'react-router';

const Profile = () => {
    const[userData,setUserdData]=useState([]);
    const[posts,setPosts]=useState([]);
    const username = localStorage.getItem("username");
    let history = useHistory();
    const length = posts.length;
    let {id} = useParams();

    useEffect(() => {
    
        Axios.post(`http://localhost:3001/user/profile/`,{username:username}).then(res=>{
        setUserdData(res.data)
        });

        Axios.post("http://localhost:3001/post/getpostbyusername",{username:username}).then((res=>{
            setPosts(res.data);
        }))

        if(!localStorage.getItem("accessToken")){
            history.push('/');
        }
    
        
    }, []);

    const deletePost=(id)=>{
        console.log(id);
        Axios
        .delete(`http://localhost:3001/post/${id}`, {
          headers: { accessToken: localStorage.getItem("accessToken") },
        })
        .then(() => {
            setPosts(
                posts.filter((val) => {
                  return val.id !== id;
                })
              );
          
        });
    }

    const logout=()=>{
        localStorage.removeItem("accessToken");
        localStorage.removeItem("username");
        history.push("/");
    }
    return (
        <div className="Main">

            <div className="backtohome" onClick={()=>history.push('/')}><img src={Back} alt="back"/> Back to Home</div>
            
        <div className="boxheader">
            <button className="btn btn-light" style={{float:"right",borderRadius:"15px",marginRight:40,marginTop:10,marginBottom:10}}><img style={{width:20}} alt="logout" src={Logout} onClick={logout}/></button>
            <div className="container">
                {userData.map((item)=>{
                    return(
                        <>
                        <div className="image"><img src={item.profile} alt={User} style={{borderRadius:"50%",width:80}}/></div>
                <div className="display">
                    <div>{item.name}    <span style={{fontSize:12,marginLeft:8}}>@{item.username}</span></div>
                    <div>{item.email}</div>
                    <div>{item.mobile}</div>
                    <div className="totalpost" >Total Posts : {length}</div>
                    </div>
                    </>
                    )
                })}
                
                    
            </div>
        </div>
        
        <div className="listofposts">
        {length === 0 ? <div style={{marginLeft:20}}> Nothing Posted yet...</div> :<div>
               {posts.map((item)=>{
                   return(
                       <>
  <div className="titleimage">
               <img src={item.profile} alt={User} style={{borderRadius:"50%",width:32,marginLeft:10,marginTop:18}}/>
               <span className="username">@{item.username}</span>
               
               <span><img src={Delete} alt={Delete} onClick={()=>deletePost(item.id)}/></span>
           </div>
           <div className="title">
           {item.title}
           </div>
           <div className="desc">
               {item.desc}
           </div>
                       </>
                   )
               })}
               </div>
             }
        </div>
  </div>
    )
}
        
    


export default Profile
