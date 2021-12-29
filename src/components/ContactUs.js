import React,{useState} from 'react';
import '../style/contact.css';
import Back from '../assets/backarrow.png';
import Twitter from '../assets/twitter.png';
import Linkedn from '../assets/linkedin.png';
import Whatsapp from '../assets/whatsapp.png';
import Instagram from '../assets/instagram.png';
import Facebook from '../assets/facebook.png';
import {useHistory} from 'react-router-dom';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {
    const[name,setName]=useState("");
    const[email,setEmail]=useState("");
    const[subject,setSubject]=useState("");
    const[message,setMessage]=useState("");
    let history = useHistory();

    const sendMessage=(e)=>{
        emailjs.sendForm('service_oxoxbnt', 'template_0tb2fzg', e.target, 'user_s07Ev7vi75OCVyeFUqGSO')
        .then((result) => {
            console.log(result.text);
            toast.success("Great! we will get back to you ASAP",{
              position:"top-center"
            });
        }, (error) => {
            console.log(error.text);
        });
        e.target.reset();
        toast.success("GREAT! WE WILL GET BACK TO YOU ASAP",{position:"top-center"});
    }

    const goback=()=>{
        history.push("/");
    }

    return (
        <div className="App">
            <ToastContainer/>
            <img src={Back} alt="back to home" onClick={goback}/> <div onClick={goback}>BACK TO HOME</div>
            <div className="connect">
                Connect with Us
                <div className="socialmedia">
                <a href="https://www.instagram.com/code.siddharth/" target="blank">
                    <img src={Instagram} alt="instagram"/>
                </a>
                    <a href="https://wa.me/9409239563" target="blank">
                    <img src={Whatsapp} alt="whatsapp"/>
                    </a>
                    <a href="https://www.linkedin.com/in/siddharth-vaishnav-6b44ba185/" target="blank">
                    <img src={Linkedn} alt="linkedn"/>
                    </a>
                    <a href="https://www.facebook.com/siddharth.vaishnav.007" target="blank">
                    <img src={Facebook} alt="facebook"/>
                    </a>
                    <a href="https://twitter.com/code_siddharth" target="blank">
                    <img src={Twitter} alt="twitter"/>
                    </a>
                </div>
            </div>
            <div className="sendmessage">
                Message Us
                <div className="container-md">
                    <form onSubmit={sendMessage}>
                        <div className="name">
                <div class="input-group">
                <span class="input-group-text">Name</span>
                <input type="text" aria-label="First name" class="form-control" name="name" id="name" onChange={(e)=>setName(e.target.value)} required/>
                </div>
                </div>
                <div className="email">
                <div class="input-group">
                <span class="input-group-text">Email</span>
                <input type="text" aria-label="First name" class="form-control" name="email" id="email" onChange={(e)=>setEmail(e.target.value)} required/>
                </div>
                </div>
                <div className="subject">
                <div class="input-group">
                <span class="input-group-text">Subject</span>
                <input type="text" aria-label="First name" class="form-control" name="subject"  id="subject" onChange={(e)=>setSubject(e.target.value)} required/>
                </div>
                </div>
                <div className="message">
                <div class="input-group">
                <span class="input-group-text">Message</span>
                <textarea class="form-control" aria-label="With textarea" name="message" style={{height:"300px"}} onChange={(e)=>setMessage(e.target.value)}  required></textarea>
                </div>
                </div>
                <button className="btn btn-primary" type="submit">Submit</button>
                </form>
            </div>
            </div>
        </div>
    )
}

export default ContactUs
