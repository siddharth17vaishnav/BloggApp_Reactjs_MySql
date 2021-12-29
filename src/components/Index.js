import React from 'react';
import Login from './Login';
import Home from './Home';

const Index = () => {
    return (
        <div>
         {!localStorage.getItem("accessToken") ? <Login/> : <Home/>}
           
        </div>
    )
}

export default Index
