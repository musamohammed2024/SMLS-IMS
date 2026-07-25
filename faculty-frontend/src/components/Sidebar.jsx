 import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import {
  logout,
  getUserRole
} from "../utils/auth";



export default function Sidebar() {


  const navigate = useNavigate();

  const role = getUserRole();



  const menuItems = [

  {
    name:"📊 Dashboard",
    path:"/dashboard",
    roles:[
      "admin",
      "staff",
      "viewer"
    ]
  },


  {
    name:"👨‍🏫 Faculty",
    path:"/faculty",
    roles:[
      "admin",
      "staff",
      "viewer"
    ]
  },


  {
    name:"👥 Users",
    path:"/users",
    roles:[
      "admin"
    ]
  },


  {
    name:"📑 Reports",
    path:"/reports",
    roles:[
      "admin",
      "staff",
      "viewer"
    ]
  },


  {
    name:"⚙ Settings",
    path:"/settings",
    roles:[
      "admin"
    ]
  }

];




  const handleLogout = () => {

    logout();

    navigate("/login");

  };

    return (

    <aside className="sidebar">


      <div className="sidebar-logo">

        SMLS-IMS

      </div>





      <nav>


        {
          menuItems

          .filter(

            item =>

            item.roles.includes(role)

          )

          .map((item)=>(


            <NavLink


              key={item.path}


              to={item.path}


              className={({isActive}) =>

                isActive

                ? "menu-link active"

                : "menu-link"

              }


            >

              {item.name}


            </NavLink>


          ))

        }


      </nav>






      <button

        className="logout-button"

        onClick={handleLogout}

      >

        🚪 Logout

      </button>





    </aside>

  );

}