 import React from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";

import "../styles/Layout.css";



export default function Layout({children}){


return (

<div className="layout">


<Sidebar />



<div className="main-area">


<Header />



<main className="content">


{children}


</main>


</div>



</div>

);


}