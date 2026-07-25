import React from "react";

export default function Footer() {

  return (

    <footer style={styles.footer}>

  


      <p>
        © 2026 HU-CMHSs.
        <br />
        All Rights Reserved.
      </p>


            

      <p>
        Version 1.0.0
      </p>


      <p>
        📧 Email: musa@hu.edu.et
      </p>


      <p>
        📞 Phone: +251-926044997
      </p>


    </footer>

  );

}



const styles = {


  footer: {

    marginTop: "40px",

    padding: "25px 20px",

    textAlign: "center",

    background: "#0f172a",

    color: "#ffffff",

    fontSize: "14px",

    width: "100%",

    boxSizing: "border-box",

    lineHeight: "1.6",

  },


  title: {

    fontSize: "16px",

    marginBottom: "10px",

  },


};