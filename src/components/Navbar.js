import React from 'react';
import User from '../assets/user.png';
import Logo from '../assets/logo.png'
import { useHistory } from 'react-router';

const Navbar = () => {
  let history = useHistory();
  const profile=localStorage.getItem("profile");

    const logout=()=>{
        localStorage.removeItem("accessToken");
        localStorage.removeItem("profile");
        localStorage.removeItem("username");
        window.location.reload(false);
    }
    return (
        <div>
            <nav class="navbar navbar-expand-lg navbar navbar-dark bg-primary">
  <div class="container-fluid">
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div className="logo">
    <a class="navbar-brand" href="/"><img src={Logo} alt="logo" style={{borderRadius:"0px",width:30}}/>Code.Blog</a>
    </div>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        
      </ul>
      <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-success" type="submit">Search</button>
      </form>
      <button className="btn btn-light" style={{marginLeft:10,borderRadius:"50px"}} onClick={()=>history.push('/createPost')}>create Post</button>
      <div>
      <li class="nav-item dropdown">
          <span class="nav-link dropdown-toggle" hre="/profile" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          <img src={profile} alt={User} style={{width:30,borderRadius:"50%",marginLeft:1,marginTop:0}}/>
          </span>
          <ul class="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
            <li><a class="dropdown-item" href="/profile">Profile</a></li>
            <li><a class="dropdown-item" href="/contactus">Contact Us</a></li>
            <li><span class="dropdown-item" onClick={logout}>Logout</span></li>
          </ul>
        </li>
        </div>
    </div>
  </div>
</nav>
        </div>
    )
}

export default Navbar
