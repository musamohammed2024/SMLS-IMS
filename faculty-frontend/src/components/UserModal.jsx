 import React from "react";


export default function UserModal({

  show,
  editUser,
  form,
  handleChange,
  onClose,
  onSubmit

}) {


  if(!show) return null;



  return (

    <div style={styles.overlay}>


      <div style={styles.modal}>


        <h2>
          Edit User
        </h2>



        <form onSubmit={onSubmit}>


          <label>
            Full Name
          </label>


          <input

            name="name"

            value={form.name}

            onChange={handleChange}

            style={styles.input}

            required

          />




          <label>
            Email
          </label>


          <input

            type="email"

            name="email"

            value={form.email}

            onChange={handleChange}

            style={styles.input}

            required

          />





          <label>
            Role
          </label>


          <select

            name="role"

            value={form.role}

            onChange={handleChange}

            style={styles.input}

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





          <div style={styles.buttons}>


            <button

              type="submit"

              style={styles.save}

            >

              Update

            </button>




            <button

              type="button"

              onClick={onClose}

              style={styles.cancel}

            >

              Cancel

            </button>



          </div>



        </form>


      </div>


    </div>

  );

}




const styles={


overlay:{

position:"fixed",

top:0,

left:0,

right:0,

bottom:0,

background:"rgba(0,0,0,.45)",

display:"flex",

justifyContent:"center",

alignItems:"center",

zIndex:1000

},



modal:{


background:"#fff",

width:"400px",

padding:"25px",

borderRadius:"10px",

boxShadow:"0 5px 20px rgba(0,0,0,.2)"

},



input:{


width:"100%",

padding:"10px",

marginBottom:"15px",

border:"1px solid #ccc",

borderRadius:"6px",

boxSizing:"border-box"

},



buttons:{


display:"flex",

justifyContent:"flex-end",

gap:"10px"

},



save:{


background:"#2563eb",

color:"#fff",

border:"none",

padding:"10px 20px",

borderRadius:"6px",

cursor:"pointer"

},



cancel:{


background:"#64748b",

color:"#fff",

border:"none",

padding:"10px 20px",

borderRadius:"6px",

cursor:"pointer"

}


};