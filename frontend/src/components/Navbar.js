import React from 'react'
import { Link } from 'react-router-dom'
import user from '../images/account_circle.png'
export default function Navbar() {
  return (
    <div style={{padding:30,fontFamily:"Inter",fontWeight:700,textDecorationColor:"#115976"}}>
        <Link to="/" style={{textDecoration:"none",position:'absolute',left:30,color:"#115976"}}> 
            Home
        </Link>
        <Link to="/dashboard" style={{textDecoration:"none",position:'absolute',right:70,color:"#115976"}}> 
            Dashboard
        </Link>
        <Link to="/" style={{textDecoration:"none",position:'absolute',right:20,top:20}}> 
            <img src={user} height="37px"/>
        </Link>
    </div>
  )
}
