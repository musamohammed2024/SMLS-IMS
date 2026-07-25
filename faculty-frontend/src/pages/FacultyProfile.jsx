import React, {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import axios from "axios";

import {
  getToken
} from "../utils/auth";


const API = `${import.meta.env.VITE_API_URL}/faculty`;


export default function FacultyProfile() {

  const { id } = useParams();

  const navigate = useNavigate();


  const [faculty, setFaculty] = useState(null);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    loadFaculty();

  }, []);



  const loadFaculty = async () => {

    try {

      const res = await axios.get(
        `${API}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`
          }
        }
      );


      setFaculty(res.data);


    } catch (error) {

      console.error(
        "Error loading faculty profile:",
        error
      );

    } finally {

      setLoading(false);

    }

  };




  if (loading) {

    return (

      <div style={styles.loading}>

        Loading Profile...

      </div>

    );

  }




  if (!faculty) {

    return (

      <div style={styles.error}>

        Faculty record not found

      </div>

    );

  }





  return (

    <div style={styles.container}>


      <div style={styles.topButtons}>

  <button
    style={styles.back}
    onClick={() => navigate("/faculty")}
  >
    ⬅ Back
  </button>


  <button
    style={styles.print}
    onClick={() => window.print()}
  >
    🖨 Print Profile
  </button>

</div>





      <div style={styles.profileHeader}>


        {

          faculty.photo ?

          <img

           src={`${import.meta.env.VITE_API_URL.replace("/api", "")}${faculty.photo}`}

            style={styles.photo}

            alt="faculty"

          />

          :

          <div style={styles.noPhoto}>

            👤

          </div>

        }




        <div>


          <h1>

            {faculty.title} {faculty.fullName}

          </h1>



          <p>

            {faculty.academicRank}

          </p>



          <span style={styles.status}>

            {faculty.currentStatus}

          </span>


        </div>


      </div>

            <div style={styles.grid}>


        <Card

          title="Qualification"

          value={faculty.qualification}

        />



        <Card

          title="Specialization"

          value={faculty.fieldOfSpecialization}

        />



        <Card

          title="Position"

          value={faculty.currentPosition}

        />



        <Card

          title="Years of Service"

          value={faculty.serviceYear}

        />



        <Card

          title="Publications"

          value={faculty.totalPublications}

        />



        <Card

          title="Country"

          value={faculty.country}

        />






        <Card
  title="Email"
  value={
    faculty.email ? (
      <a
        href={`mailto:${faculty.email}`}
        style={styles.link}
      >
        {faculty.email}
      </a>
    ) : "-"
  }
/>


<Card
  title="Telephone"
  value={
    faculty.telephone ? (
      <a
        href={`tel:${faculty.telephone}`}
        style={styles.link}
      >
        {faculty.telephone}
      </a>
    ) : "-"
  }
/>


<Card
  title="ORCID"
  value={
    faculty.orcid ? (
      <a
        href={
          faculty.orcid.startsWith("http")
            ? faculty.orcid
            : `https://orcid.org/${faculty.orcid}`
        }
        target="_blank"
        rel="noopener noreferrer"
        style={styles.link}
      >
        {faculty.orcid}
      </a>
    ) : "-"
  }
/>


      </div>






      <h2>

        Publication History

      </h2>




      {

        faculty.publicationsByYear &&

        Object.keys(faculty.publicationsByYear).length > 0 ? (



          <table style={styles.historyTable}>


            <thead>

              <tr>

                <th style={styles.historyTh}>

                  Year

                </th>


                <th style={styles.historyTh}>

                  Publications

                </th>


              </tr>

            </thead>




            <tbody>


              {

                Object.entries(faculty.publicationsByYear)

                .sort((a, b) => Number(b[0]) - Number(a[0]))

                .map(([year, count]) => (


                  <tr key={year}>


                    <td style={styles.historyTd}>

                      {year}

                    </td>



                    <td style={styles.historyTd}>

                      {count}

                    </td>


                  </tr>


                ))


              }


            </tbody>



          </table>



        ) : (


          <p>

            No publication history available.

          </p>


        )


      }





    </div>

  );


}








function Card({

  title,

  value

}) {


  return (

    <div style={styles.card}>


      <h4>

        {title}

      </h4>



      <p>

        {value ?? "-"}

      </p>


    </div>

  );


}








const styles = {


  container: {

    padding: "30px",

    background: "#ffffff",

    borderRadius: "12px",

    boxShadow: "0 5px 20px rgba(0,0,0,.1)"

  },



  back: {

    padding: "10px 15px",

    border: "none",

    background: "#64748b",

    color: "#fff",

    borderRadius: "8px",

    cursor: "pointer",

    marginBottom: "20px"

  },

  topButtons: {

  display:"flex",

  justifyContent:"space-between",

  marginBottom:"20px",

  flexWrap:"wrap",

  gap:"10px"

},


print: {

  padding:"10px 15px",

  border:"none",

  background:"#059669",

  color:"#ffffff",

  borderRadius:"8px",

  cursor:"pointer",

  fontWeight:"600"

},



  profileHeader: {

    display: "flex",

    alignItems: "center",

    gap: "25px",

    marginBottom: "30px"

  },



  photo: {

    width: "150px",

    height: "150px",

    borderRadius: "50%",

    objectFit: "cover",

    border: "4px solid #2563eb"

  },



  noPhoto: {

    width: "150px",

    height: "150px",

    borderRadius: "50%",

    background: "#e2e8f0",

    display: "flex",

    alignItems: "center",

    justifyContent: "center",

    fontSize: "60px"

  },



  status: {

    display: "inline-block",

    marginTop: "10px",

    background: "#dcfce7",

    color: "#166534",

    padding: "6px 12px",

    borderRadius: "20px",

    fontWeight: "600"

  },



  grid: {

    display: "grid",

    gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",

    gap: "20px",

    marginBottom: "35px"

  },



  card: {

    background: "#ffffff",

    border: "1px solid #dbeafe",

    padding: "18px",

    borderRadius: "12px",

    boxShadow: "0 4px 12px rgba(0,0,0,.06)"

  },

    
  publication: {

    background: "#f8fafc",

    padding: "20px",

    borderRadius: "10px"

  },



  historyTable: {

    width: "100%",

    borderCollapse: "collapse",

    marginTop: "20px",

    background: "#ffffff",

    borderRadius: "10px",

    overflow: "hidden",

    boxShadow: "0 3px 10px rgba(0,0,0,.08)"

  },



  historyTh: {

    background: "#2563eb",

    color: "#ffffff",

    padding: "12px",

    textAlign: "left"

  },



  historyTd: {

    padding: "12px",

    borderBottom: "1px solid #e5e7eb"

  },



  loading: {

    padding: "50px",

    textAlign: "center",

    fontSize: "22px"

  },



  error: {

  padding: "30px",

  textAlign: "center",

  color: "red",

  fontSize: "20px"

},

link: {

  color:"#2563eb",

  textDecoration:"none",

  fontWeight:"600"

}

};

