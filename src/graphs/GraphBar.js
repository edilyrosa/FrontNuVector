import React, { useState, useEffect, useMemo } from "react";
import Loader from "../helpers/Loader";
import Message from "../helpers/Message";
import "../index";
import "../stylies/ComponentForm.css";
import { URL_CLIENT, URL_PROJECT, URL_TASK } from "../helpers/ApiURL";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function GraphBar() {
  const [clients, setClients] = useState([]);
  const [clientId, setClientId] = useState("");
  const [projectsDB, setProjectsDB] = useState([]); //Array ProjectDB from DB
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [taskEntriesDB, setTaskEntriesDB] = useState([]);
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

  //!Get TASKENTRY' table  in State Var TaskEntriesDB
  useEffect(() => {
    setLoading(true);
    fetch(URL_TASK)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setTaskEntriesDB(json);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        setTaskEntriesDB(null);
        setError(err);
      });
  }, []);

  const projectsByClient = projectsDB.filter(
    (el) => el.client_id === parseInt(clientId)
  );

  let cliName = projectsByClient.map((el) => el.Client.name); //!EL CLIENTE

  let cliPros = projectsByClient.map((el) => el.name); //!LOS PROYECTOS DEL CLIENTE
  let iDcliPros = projectsByClient.map((el) => el.id); //!LOS PROYECTOS DEL CLIENTE

  let arrayByClient = taskEntriesDB.filter((task) => {
    //!TAREAS POR ID CLIENTE
    return parseInt(task.Client.id) === parseInt(clientId);
  });

  let objDefinitivo;

  iDcliPros.map(
    (ids) =>
      (objDefinitivo = taskEntriesDB.map((task) =>
        task.Project.id === parseInt(ids) ? task.duration : undefined
      ))
  );
  console.log(iDcliPros);

  taskEntriesDB.map(
    (task) =>
      (objDefinitivo = iDcliPros.map(
        (ids) => task.project_id === parseInt(ids) || task.duration
      ))
  );

  console.log(objDefinitivo);
  /////////////////////////////////////
  let hoursPros = arrayByClient.map((pro) => pro.duration); //!ARRAY DE HORAS POR TAREA

  //!SUMAR HORAS DE TAREAS POR PROYECTO FALRA
  ////////////////////////////////////////

  const scores = [...hoursPros];
  const labels = [...cliPros];

  const options = {
    fill: true,
    Animations: true,
    scales: {
      y: {
        min: 0,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
    },
  };
  console.log(labels);
  const data = useMemo(
    function () {
      return {
        datasets: [
          {
            label: "Projects",
            tension: 0.3,
            data: scores,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.3)",
          },
        ],
        labels,
      };
    },
    [labels, scores]
  );
  //SELECT SUM(duration) as total_hours from task_entries where client_id = '313123' group by project_id;

  const optionsStyle = {
    width: "50%",
    height: "6rem",
    marginLeft: "auto",
    marginRight: "auto",
  };

  return (
    <>
      <div>
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
        {<h2>Client {cliName[0]}.</h2>}
        <br />
      </div>
      <div className="App" style={optionsStyle}>
        <span style={{ color: "grey" }}>Hours by project</span>
        <Bar data={data} options={options} />
      </div>
    </>
  );
}
