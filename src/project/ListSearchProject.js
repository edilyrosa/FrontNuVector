import React, { useState, useEffect } from "react";
import "../stylies/ComponentTable.css";
import { URL_PROJECT } from "../helpers/ApiURL";
import Loader from "../helpers/Loader";

function ListSearchProject() {
  const [projectsDB, setProjectsDB] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //!Get PROJECTS' table in the VE ProjectsDB
  useEffect(() => {
    fetch(URL_PROJECT) //Do Req
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setProjectsDB(json); //Set the ProjectsDB
        setError(null); // Isn't error
      })
      .catch((err) => {
        setProjectsDB([]);
        setError(err);
      });
  }, [setProjectsDB]);

  return (
    <div>
      <br />
      <br />
      <h1>ALL YOUR PROJECTS.</h1>
      {loading && <Loader />}
      <br /> <br /> <br /> <br />
      <div className="listProjects">
        <table>
          <thead>
            <tr>
              <th>Project's id</th>
              <th>Project's Name</th>
              <th>Project's Client</th>
              <th>Project's Description</th>
              <th>Active</th>
            </tr>
          </thead>

          <tbody>
            {projectsDB.length === 0 ? (
              <tr>
                <td colSpan={6}>vacia</td>
              </tr>
            ) : (
              projectsDB.map((el) => (
                <tr key={el.id}>
                  <td>{el.id}</td>
                  <td>{el.name}</td>
                  <td>{el.client_id}</td>
                  <td>{el.description}</td>
                  <td>{el.active ? "Yes" : "No"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        ;
      </div>
    </div>
  );
}

export default ListSearchProject;
