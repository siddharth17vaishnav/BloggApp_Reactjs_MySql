import React from 'react'

import Logo from '../assets/logo.png';

const sideNav = () => {
    return (
        <div classNameName="">
        <nav id="sidebar">
        <div className="sidebar-header">
        <a href="/user/admin/dashboard">
            <h3 style={{color: 'white',fontFamily:'Dancing Script'}}>
            <span><img src={Logo} alt="logo" style={{width:"20px"}}/></span>
            Code.Blog</h3>
            </a>
        </div>

        <ul className="list-unstyled components">
         
            <li className="">
                <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Home</a>
                <ul className="collapse list-unstyled" id="homeSubmenu">
                    <li>
                        <a href="#">Home 1</a>
                    </li>
                    <li>
                        <a href="#">Home 2</a>
                    </li>
                    <li>
                        <a href="#">Home 3</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="/user/admin/dashboard/users">Users</a>
            </li>
            <li>
                <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Pages</a>
                <ul className="collapse list-unstyled" id="pageSubmenu">
                    <li>
                        <a href="#">Page 1</a>
                    </li>
                    <li>
                        <a href="#">Page 2</a>
                    </li>
                    <li>
                        <a href="#">Page 3</a>
                    </li>
                </ul>
            </li>
            <li>
                <a href="#">Portfolio</a>
            </li>
            <li>
                <a href="#">Contact</a>
            </li>
        </ul>

    </nav>
        </div>
    )
}

export default sideNav