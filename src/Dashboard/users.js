import React,{useState,useEffect} from 'react';
import SideNav from '../Dashboard/sideNav';
import NavBar from '../Dashboard/navbar';
import '../style/dashboard.css';
import Axios from 'axios';




const Users = () => {
  const[user,setUser] = useState([]);
 

  useEffect(() => {
    Axios.get("http://localhost:3001/user/users").then((response) =>{setUser(response.data)})
  },[]);

  const makeAdmin = (id) =>{
    Axios.put(`http://localhost:3001/user/makeadmin/${id}`,{type:"admin",id:id});
    window.location.reload(false)
  }

  const removeAdmin = (id) =>{
    Axios.put(`http://localhost:3001/user/removeadmin/${id}`,{type:"user",id:id});
    window.location.reload(false)
  }

  const deleteUser = (id) =>{
   Axios.delete(`http://localhost:3001/user/${id}`);
   window.location.reload(false)
  }

    return (
        <div className="wrapper">
        <SideNav/>
          <div id="content">
          <NavBar/>
          <div className="App">
          <button className="btn btn-dark" style={{marginBottom:20}} data-bs-toggle="modal" data-bs-target="#exampleModal">Add User</button>
          <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Username</th>
      <th scope="col">Mobile</th>
      <th scope="col">Profile</th>
      <th scope="col">Type</th>
      <th scope="col">Action</th>
      <th scope="col">Admin</th>
    </tr>
  </thead>
  <tbody>
    {user.map((item)=>{
      return(
        <>
        <tr>
        <th scope="row">{item.id}</th>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.username}</td>
        <td>{item.mobile}</td>
        <td>{item.profile}</td>
        <td>{item.type}</td>
        <td>
            <tr>
            <td><button class="btn btn-danger" onClick={()=>deleteUser(item.id)}>delete</button></td>
            </tr>
        </td>
        <td>
            <tr>
            <td><button class="btn btn-primary" onClick={()=>makeAdmin(item.id)}>Make Admin</button></td>
            <td><button class="btn btn-danger" onClick={()=>removeAdmin(item.id)}>Remove Admin</button></td>
            </tr>
        </td>
        </tr>
        </>
      )
    })}
      
   

  </tbody>
</table>
          </div>
          </div>

         #modal
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Add User</button>
      </div>
    </div>
  </div>
</div>
        </div>


        
   
    )
}


export default Users
