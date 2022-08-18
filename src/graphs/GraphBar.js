import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Bar } from "@ant-design/plots";
import Loader from "../helpers/Loader";
import Message from "../helpers/Message";
import "../index";
import { URL_CLIENT, URL_PROJECT, URL_TASK } from "../helpers/ApiURL";

const GraphBar = () => {
  const [clients, setClients] = useState([]);
  const [projectsDB, setProjectsDB] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [taskEntriesDB, setTaskEntriesDB] = useState([]);

  //!Get PROJECTS' table in the VE ProjectsDB
  useEffect(() => {
    setLoading(true); //show loader
    fetch(URL_PROJECT) //Do Req
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setProjectsDB(json); //Set the ProjectsDB
        setError(null); // Isn't error
        setLoading(false); //show loader
      })
      .catch((err) => {
        setProjectsDB([]);
        setError(err);
      });
  }, []);

  //!get CLIENTS' table
  useEffect(() => {
    setLoading(true); //show loader
    fetch(URL_CLIENT) //Do Req
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setClients(json); //Set the ProjectsDB
        setError(null); // Isn't error
        setLoading(false); //Loader off
        console.log();
      })
      .catch((err) => {
        setClients(null);
        setError(err);
      });
  }, []);

  //!Get TASKENTRY' table  in the VE ProjectsDB
  useEffect(() => {
    setLoading(true); //show loader
    fetch(URL_TASK) //Do Req
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setTaskEntriesDB(json); //Set the ProjectsDB
        setError(null); // Isn't error
        setLoading(false); //Loader off
        console.log();
      })
      .catch((err) => {
        setTaskEntriesDB(null);
        setError(err);
      });
  }, []);

  const NameClient = setProjectsDB(...projectsDB, clients);

  const data = [];

  data = projectsDB.map((el) => ({
    year: el.name,
    value: el.cient_id,
  }));

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
      <h1>GRAPH BY PROJECT-CLIENT</h1>
      {loading && <Loader />}
      {error && (
        <Message
          msj={`Error: ${error.status}: ${error.statusText}`}
          bgColor={"#dc3545"}
        />
      )}
      <h2>Client.name</h2>
      <br />
      <Bar {...config} />;
    </>
  );
};

export default GraphBar;
