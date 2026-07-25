 import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";


export default function Header(){


const navigate = useNavigate();



const handleLogout = ()=>{


  logout();


  navigate("/login");


};





return (

<header className="header">


<div>

<h2>
Faculty Management Information System
</h2>

</div>




<div className="header-right">


<span>
👤 Administrator
</span>



<button
onClick={handleLogout}
>

Logout

</button>



</div>


</header>

);


}