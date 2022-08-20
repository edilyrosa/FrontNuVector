import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Bar } from "@ant-design/plots";
import Loader from "../helpers/Loader";
import Message from "../helpers/Message";
import "../index";
import "../stylies/ComponentForm.css";
import useFetch from "../helpers/useFetch";
import { URL_CLIENT, URL_PROJECT } from "../helpers/ApiURL";

const GraphBar = () => {
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState("");
  const [projectsDB, setProjectsDB] = useState([]); //Array ProjectDB from DB

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //!get CLIENTS' table
  useEffect(() => {
    setLoading(true);
    fetch(URL_CLIENT)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setClients(json);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  //!Get PROJECTS' table  in the VE ProjectsDB
  useEffect(() => {
    setLoading(true);
    fetch(URL_PROJECT)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setProjectsDB(json);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        setProjectsDB(null);
        setError(err);
      });
  }, []);

  const projectsByClient = projectsDB.filter(
    (el) => el.client_id === parseInt(clientId)
  );

  console.log(projectsByClient);
  let data = [];
  //for (let i = 0; i < projectsByClient.legend; i++)

  projectsDB.map((el) => {
    data = [
      {
        year: el.name,
        value: el.id,
      },
    ];
  });

  /*
   data = [
    {
      year: "Projecto 1",
      value: 2,
    },
    {
      year: "Projecto 2",
      value: 4,
    },
    {
      year: "Projecto 3",
      value: 6,
    },
  ];
*/
  const config = {
    data,
    xField: "value",
    yField: "year",
    seriesField: "year",
    legend: {
      position: "top-left",
    },
  };

  return (
    <>
      <div>
        <br />
        <br />
        <h1>GRAPH BY CLIENT.</h1>
        <label>
          <h3>Select the Client.</h3>
          <br />
          <select name="clientId" onChange={(e) => setClientId(e.target.value)}>
            <option>Select a Client</option>
            {clients.map((client) => (
              <option value={client.id} key={client.id}>
                <p>
                  Client's Name: {client.name} ⇒ ID: {client.id}
                </p>
              </option>
            ))}
          </select>
        </label>

        {loading && <Loader />}
        {error && (
          <Message
            msj={`Error: ${error.status}: ${error.statusText}`}
            bgColor={"#dc3545"}
          />
        )}
        {/* {<h2>Client ${dataEndpoint.name}</h2>} */}
        <br />
      </div>
      <Bar {...config} />;<span>Hours spent in each project</span>
    </>
  );
};

export default GraphBar;

/*
import { Bar } from "@ant-design/plots";
const GraphBar = () => {
  const scores = [1, 2, 3, 4, 5, 6, 7, 8];
  const labels = [100, 200, 300, 400, 500, 600, 700, 800];
  const data = {
  labels: ["project1.name", "projecto2.name", "project3.name"],
  datasets: [
       {
         label: labels,
         backgroundColor: "rgba(211, 57, 116)",
         borderColor: "black",
        borderWidth: 1,
         hoverBackgroundColor: "rgba(211, 57, 116, 0.3)",
         hoverBorderColor: "#ff0000",
         data: scores
       },
     ],
   };
   const options = {
     maintainAspectRatio: false,
    responsive: true,
   };

  return (
   <div style={{ width: "90%", height: "500px" }}>
     <h2>Grafica</h2>

       <Bar data={data} options={options} />
     </div>

 );
  }

  export default GraphBar;

  */
