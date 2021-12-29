import React,{useEffect,useState} from 'react';
import SideNav from './sideNav';
import NavBar from './navbar';
import '../style/dashboard.css';
import { Doughnut } from "react-chartjs-2";
import { chartColors } from "./Colors";
import Axios from 'axios';

const Main = () => {
  const [user,setUser] = useState("");
  const [post,setPost] = useState("");
  const [likes,setLikes] = useState("");
  const [comment,setComment] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/user/users").then((res)=>{setUser(res.data.length)});

    Axios.get("http://localhost:3001/post").then((res)=>{setPost(res.data.length)});

    Axios.get("http://localhost:3001/likes").then((res)=>{setLikes(res.data.length)});

    Axios.get("http://localhost:3001/comments").then((res)=>{setComment(res.data.length)});
  },[]);


  const options = {
    cutoutPercentage:80,
    animation:{
      animation: true,
    },
      legend: {
        display: false,
        position: "right"
      },
      elements: {
        arc: {
          borderWidth: 0
        },
       
      },
    
    };
  
    const data = {
      maintainAspectRatio: false,
      responsive: false,
      labels: ["Users", "Post", "Likes", "Comments"],
      datasets: [
        {
          data: [user, post, likes, comment],
          backgroundColor: chartColors,
          hoverBackgroundColor: chartColors
        },
      ]
    };
  

    return (
        <div className="wrapper">
        <SideNav/>
          <div id="content">
          <NavBar/>
          <div className="App">
          <div  className="chart">
          <Doughnut data={data} options={options} />
          </div>
          </div>
        </div>
    </div>
    )
}


export default Main
