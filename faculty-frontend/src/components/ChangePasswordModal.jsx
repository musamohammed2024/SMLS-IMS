 import React from "react";


export default function ChangePasswordModal({

  show,
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
          Change Password
        </h2>



        <form onSubmit={onSubmit}>


          <label>
            Old Password
          </label>


          <input

            type="password"

            name="oldPassword"

            value={form.oldPassword}

            onChange={handleChange}

            style={styles.input}

            required

          />




          <label>
            New Password
          </label>


          <input

            type="password"

            name="newPassword"

            value={form.newPassword}

            onChange={handleChange}

            style={styles.input}

            required

          />





          <label>
            Confirm New Password
          </label>


          <input

            type="password"

            name="confirmPassword"

            value={form.confirmPassword}

            onChange={handleChange}

            style={styles.input}

            required

          />






          <div style={styles.buttons}>


            <button

              type="submit"

              style={styles.save}

            >

              Update Password

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

padding:"25px",

width:"400px",

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

padding:"10px 15px",

borderRadius:"6px",

cursor:"pointer"

},



cancel:{

background:"#64748b",

color:"#fff",

border:"none",

padding:"10px 15px",

borderRadius:"6px",

cursor:"pointer"

}


};