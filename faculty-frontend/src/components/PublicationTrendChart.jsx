import React from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";


const PublicationTrend = ({ data = [] }) => {


  return (

    <div
      style={{
        width: "100%",
        height: 350,
      }}
    >


      <ResponsiveContainer
        width="100%"
        height="100%"
      >


        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 10,
            bottom: 10,
          }}
        >


          <CartesianGrid
            strokeDasharray="3 3"
          />



          <XAxis
            dataKey="year"
          />



          <YAxis
            allowDecimals={false}
          />



          <Tooltip
            formatter={(value) => [
              value,
              "Publications"
            ]}
          />



          <Legend />



          <Line

            type="monotone"

            dataKey="publications"

            name="Publications"

            stroke="#6366f1"

            strokeWidth={3}

            dot={{
              r: 5
            }}

            activeDot={{
              r: 7
            }}

          />



        </LineChart>



      </ResponsiveContainer>



    </div>

  );


};


export default PublicationTrend;
