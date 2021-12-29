import React,{useState,useEffect} from 'react';
import '../style/home.css';
import { useHistory } from 'react-router';
import Navbar from './Navbar';
import 'react-toastify/dist/ReactToastify.css';
import Axios from 'axios';
import User from '../assets/user.png';
import Delete from '../assets/delete.png';



const Home = () => {
    const[post,setPost]=useState([]);
    const[comment,setComment]=useState("");
    const[commentids,setCommentIds]=useState("");
    const[commentBody,setCommentBody]=useState([]);
    const username = localStorage.getItem("username");
    const[userData,setUserdData]=useState([]);
    let history = useHistory();
    userData.map((item)=>{
      return(localStorage.setItem("profile",item.profile))
    });


    

            useEffect(() => {
                Axios.get("http://localhost:3001/post").then(res=>{
                  let sorted = res.data.sort((a, b) => {
                   return b.id - a.id;
                 });
                   setPost(sorted);
                });

                Axios.post(`http://localhost:3001/user/profile/`,{username:username}).then(res=>{
                  console.log("data:",res)
                setUserdData(res.data);
                });
            }, []);


            const like =(postId)=>{
                Axios.post('http://localhost:3001/likes',{PostId:postId},{headers:{accessToken : localStorage.getItem("accessToken")}}).then(res=>{
                  setPost(post.map((post)=>{
                    if(post.id === postId){
                      if(res.data.liked){
                        return {...post,Likes: [...post.Likes,0]};
                      }
                      else{
                        const likearray = post.Likes;
                        likearray.pop();
                        return {...post,Likes: likearray};
                      }
                      
                    }
                    else{
                      return post
                    }
                  }))
                });
               
            }

            const commentid=(postId)=>{
                setCommentIds(postId);
                
                  Axios.get(`http://localhost:3001/comments/${postId}`).then(res=>{
                     
                      let sorted = res.data.sort((a, b) => {
                        return b.id - a.id;
                      });
                      setCommentBody(sorted);
                      
                  });

                
          
            

         
            }

            const postComment=()=>{
              Axios.post(`http://localhost:3001/comments`,{PostId:commentids,commentBody:comment},{headers:{accessToken:localStorage.getItem("accessToken")}}).then(res=>{
                const commenttoAdd = {commentBody: comment , username:res.data.username};
                setCommentBody([...commentBody,commenttoAdd]);
                setComment("");      
                
                    });

             
            }

            const deletecomment =(id)=>{
              Axios
              .delete(`http://localhost:3001/comments/${id}`, {
                headers: { accessToken: localStorage.getItem("accessToken") },
              })
              .then(() => {
                setCommentBody(
                  commentBody.filter((val) => {
                    return val.id !== id;
                  })
                );
              });
          }

    return (

        <div >
           
           <Navbar/>
            <div className="container-md" style={{position:"sticky",top:0,border:"0px solid black"}}>
        
                <div className="box" style={{marginBottom:100}}>
                {post.map((result)=>{
                       return(
                           <>
<div className="tweet" key={result.id}>
                    <img src={result.profile} alt="profile-pic" style={{borderRadius:"50%",width:50}}/>
                    <p>@{result.username}</p>
                    
                    </div>
                    <div className="title" >{result.title}</div>
                    <div className="desc" onClick={()=>history.push(`/post/${result.id}`)}>
                      <span >{result.desc}</span>
                    </div>
                    <div className="footer">
                    <button className="btn btn-light" onClick={()=>like(result.id)} >❤️ {result.Likes.length}</button>
                    <button type="button" className="btn btn-light" onClick={()=>commentid(result.id)} data-bs-toggle="modal" data-bs-target="#staticBackdrop">💬</button>
                    
                    </div>
                   
               
                </>
                       )
                   })}
                    </div>


        
                </div>

                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="staticBackdropLabel">Comments</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <div className="inputcomment">
        <input type="text" onChange={(e)=>setComment(e.target.value)} value={comment}/>
                <button className="btn btn-primary" style={{marginLeft:10}} onClick={postComment}>comment</button>
                    
        </div>

        <div className="commentlist">
                {commentBody.map((item)=>{
                  return(
                    <>
                    <div>
                    {localStorage.getItem("username") === item.username ? <img src={localStorage.getItem("profile")} alt={User} style={{width:22,borderRadius:"50%",marginRight:10}}/>
                         : <img src={User} alt={User} style={{width:22,borderRadius:"50%",marginRight:10}}/>}
                      <span style={{fontSize:11}}>@{item.username}</span>
                      <span>
                      {localStorage.getItem("username") === item.username ? <img src={Delete} alt="delete" onClick={()=>deletecomment(item.id)} style={{width:12,marginLeft:10}}/>
                         : ""}
                      </span>
                      
                      </div>
                    <div style={{marginLeft:42}}>{item.commentBody}</div>
                    </>
                  )
                })}
        </div>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

</div>

    )
}

export default Home
