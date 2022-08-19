import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Bar } from "@ant-design/plots";
import Loader from "../helpers/Loader";
import Message from "../helpers/Message";
import "../index";
import { URL_TASK } from "../helpers/ApiURL";

const GraphBar = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchId, setSearchId] = useState("");
  // const [taskEntriesDB, setTaskEntriesDB] = useState([]);

  const onsearchIdChange = (e) => {
    setSearchId(e.target.value); //!get the ID written
  };

  //TODO: Hacer el fetch(), cuya URL tenga el ID dado
  // TODO: Obj client- proyectosss a pintar en la grafica
  //! useEffect(() => {
  //   setLoading(true); //show loader
  //   fetch(URL_TASK) //Do Req
  //     .then((res) => (res.ok ? res.json() : Promise.reject(res)))
  //     .then((json) => {
  //       setTaskEntriesDB(json); //Set the ProjectsDB
  //       setError(null); // Isn't error
  //       setLoading(false); //Loader off
  //       console.log();
  //     })
  //     .catch((err) => {
  //       setTaskEntriesDB(null);
  //       setError(err);
  //     });
  // }, []);

  // const dataByClient = [];
  // dataByClient = taskEntriesDB.map((el) => ({
  //   year: el.name,
  //   value: el.cient_id,
  // }));

  const data = [
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
        <input
          className="small"
          placeholder="Client's ID to Serach Graph"
          value={searchId}
          onChange={onsearchIdChange}
        />

        {loading && <Loader />}
        {error && (
          <Message
            msj={`Error: ${error.status}: ${error.statusText}`}
            bgColor={"#dc3545"}
          />
        )}
        {/* //TODO <h2>Client ${client.name}</h2> */}
        <br />
      </div>
      <Bar {...config} />;<span>Hours spent in each project</span>
    </>
  );
};

export default GraphBar;
