import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { isAuthenticated } from "../utils/auth";

import {
  getUsers,
  createUser,
  updateUser,
  deleteUser as deleteUserAPI,
  changePassword,
} from "../services/userService";

import UserModal from "../components/UserModal";
import ChangePasswordModal from "../components/ChangePasswordModal";


export default function Users() {

  const navigate = useNavigate();


  const [users, setUsers] = useState([]);

  const [showModal, setShowModal] = useState(false);

  const [showPasswordModal, setShowPasswordModal] = useState(false);



  const [form, setForm] = useState({
    _id:"",
    name:"",
    email:"",
    role:"staff"
  });



  const [passwordUser, setPasswordUser] = useState({
    _id:"",
    newPassword:"",
    confirmPassword:""
  });



  const [newUser, setNewUser] = useState({
    name:"",
    email:"",
    password:"",
    role:"staff"
  });



  useEffect(()=>{

    if(!isAuthenticated()){
      navigate("/login",{replace:true});
      return;
    }

    loadUsers();

  },[navigate]);





  const loadUsers = async()=>{

    try{

      const data = await getUsers();

      setUsers(data || []);

    }
    catch(error){

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Cannot load users"
      );

    }

  };





  const handleNewUserChange=(e)=>{

    const {name,value}=e.target;

    setNewUser(prev=>({
      ...prev,
      [name]:value
    }));

  };





  const handleAddUser=async(e)=>{

    e.preventDefault();


    try{

      await createUser(newUser);

      await loadUsers();


      setNewUser({
        name:"",
        email:"",
        password:"",
        role:"staff"
      });


      alert("User created successfully");


    }
    catch(error){

      alert(
        error.response?.data?.message ||
        "Create failed"
      );

    }

  };





  const openEdit=(user)=>{

    setForm({

      _id:user._id,

      name:user.name,

      email:user.email,

      role:user.role

    });


    setShowModal(true);

  };





  const handleUpdate = async (e) => {

  e.preventDefault();

  console.log("handleUpdate called");

  try {

    await updateUser(
      form._id,
      {
        name: form.name,
        email: form.email,
        role: form.role
      }
    );


    await loadUsers();


    setShowModal(false);


    alert("✅ User updated successfully");


  }
  catch(error) {

    console.error(error);


    alert(
      error.response?.data?.message ||
      "Update failed"
    );

  }

};




  const openPasswordChange=(user)=>{

    setPasswordUser({

      _id:user._id,

      newPassword:"",

      confirmPassword:""

    });


    setShowPasswordModal(true);

  };





  const handlePasswordChange=async(e)=>{

    e.preventDefault();


    if(
      passwordUser.newPassword !==
      passwordUser.confirmPassword
    ){

      alert("Passwords do not match");

      return;

    }



    try{


      await changePassword(

        passwordUser._id,

        {
          newPassword:
          passwordUser.newPassword
        }

      );


      alert(
        "Password updated successfully"
      );


      setShowPasswordModal(false);


    }
    catch(error){

      alert(
        error.response?.data?.message ||
        "Password update failed"
      );

    }


  };





  const handleDelete=async(id)=>{


    if(!window.confirm(
      "Delete this user?"
    ))
    return;



    try{


      await deleteUserAPI(id);


      await loadUsers();


    }
    catch(error){

      alert(
        error.response?.data?.message ||
        "Delete failed"
      );

    }


  };
  return (

<div style={styles.container}>


<div style={styles.header}>

<div>

<h2>User Management</h2>

<p>
Manage system users and permissions
</p>

</div>


<button
style={styles.back}
onClick={()=>navigate("/dashboard")}
>
← Back
</button>


</div>





<div style={styles.card}>

<h3>Add New User</h3>


<form
onSubmit={handleAddUser}
style={styles.form}
>


<input
style={styles.input}
placeholder="Name"
name="name"
value={newUser.name}
onChange={handleNewUserChange}
/>



<input
style={styles.input}
placeholder="Email"
name="email"
value={newUser.email}
onChange={handleNewUserChange}
/>



<input
style={styles.input}
type="password"
placeholder="Password"
name="password"
value={newUser.password}
onChange={handleNewUserChange}
/>



<select
style={styles.input}
name="role"
value={newUser.role}
onChange={handleNewUserChange}
>

<option value="admin">
Admin
</option>

<option value="staff">
Staff
</option>

<option value="viewer">
Viewer
</option>

</select>



<button style={styles.addBtn}>
Add User
</button>


</form>


</div>






<div style={styles.tableContainer}>


<table style={styles.table}>


<thead>

<tr>

<th style={styles.th}>
Name
</th>


<th style={styles.th}>
Email
</th>


<th style={styles.th}>
Role
</th>


<th style={styles.th}>
Actions
</th>


</tr>

</thead>



<tbody>


{
users.map(user=>(


<tr
key={user._id}
>


<td style={styles.td}>
{user.name}
</td>



<td style={styles.td}>
{user.email}
</td>



<td style={styles.td}>

<span style={styles.badge}>
{user.role}
</span>

</td>



<td style={styles.td}>


<button
style={styles.edit}
onClick={()=>openEdit(user)}
>
Edit
</button>



<button
style={styles.password}
onClick={()=>openPasswordChange(user)}
>
Password
</button>



<button
style={styles.delete}
onClick={()=>handleDelete(user._id)}
>
Delete
</button>


</td>



</tr>


))

}


</tbody>


</table>


</div>







<UserModal

show={showModal}

form={form}

handleChange={(e)=>{

const {name,value}=e.target;

setForm(prev=>({
...prev,
[name]:value
}));

}}

onClose={()=>setShowModal(false)}

onSubmit={handleUpdate}

/>







<ChangePasswordModal

show={showPasswordModal}

form={passwordUser}

handleChange={(e)=>{

const {name,value}=e.target;

setPasswordUser(prev=>({
...prev,
[name]:value
}));

}}

onClose={()=>setShowPasswordModal(false)}

onSubmit={handlePasswordChange}

/>




</div>

);

}




const styles={


container:{
padding:"30px"
},


header:{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"20px"
},


back:{
background:"#475569",
color:"#fff",
border:"none",
padding:"10px 15px",
borderRadius:"6px",
cursor:"pointer"
},


card:{
background:"#fff",
padding:"20px",
borderRadius:"10px",
marginBottom:"20px",
border:"1px solid #ddd"
},


form:{
display:"grid",
gridTemplateColumns:"repeat(4,1fr)",
gap:"10px"
},


input:{
padding:"10px",
border:"1px solid #ccc",
borderRadius:"6px"
},


addBtn:{
background:"#2563eb",
color:"#fff",
border:"none",
padding:"10px",
borderRadius:"6px",
cursor:"pointer"
},



/* ===========================
   IMPROVED USER TABLE STYLE
   =========================== */


tableContainer:{
width:"100%",
overflowX:"auto",
background:"#fff",
borderRadius:"12px",
boxShadow:"0 4px 15px rgba(0,0,0,0.08)"
},


table:{
width:"100%",
borderCollapse:"separate",
borderSpacing:"0",
background:"#fff",
border:"1px solid #e2e8f0",
borderRadius:"12px",
overflow:"hidden"
},


th:{
background:"#f1f5f9",
color:"#1e293b",
padding:"15px",
textAlign:"left",
fontSize:"14px",
fontWeight:"700",
borderBottom:"2px solid #cbd5e1"
},


td:{
padding:"14px 15px",
borderBottom:"1px solid #e2e8f0",
fontSize:"14px",
color:"#334155"
},



edit:{
background:"#f59e0b",
color:"#fff",
border:"none",
padding:"7px 10px",
marginRight:"5px",
borderRadius:"5px",
cursor:"pointer"
},


password:{
background:"#16a34a",
color:"#fff",
border:"none",
padding:"7px 10px",
marginRight:"5px",
borderRadius:"5px",
cursor:"pointer"
},


delete:{
background:"#dc2626",
color:"#fff",
border:"none",
padding:"7px 10px",
borderRadius:"5px",
cursor:"pointer"
},


badge:{
background:"#dbeafe",
padding:"5px 10px",
borderRadius:"15px",
fontSize:"13px"
}


};