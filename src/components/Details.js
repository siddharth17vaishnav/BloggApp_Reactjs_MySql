import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router';
import Axios from 'axios';


const Details = () => {
    let {id} = useParams();
    const[data,setData]=useState([]);
    

    useEffect(() => {
       Axios.get(`http://localhost:3001/post/byId/${id}`).then(res=>{
           setData(res.data);
       });

    }, []);
    return (
       <div></div>
    )
}

export default Details
