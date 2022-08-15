import React, { useState, useEffect } from "react";
import CrudTableRow from "./CrudTableRow";
import "../stylies/ComponentTable.css";
import { URL_PROJECT } from "../helpers/ApiURL";
import { deleteRegistro, updateRegistro } from "../helpers/CrudFuncions";

function CrudTable() {
  const [projectsDB, setProjectsDB] = useState([]); //Array ProjectDB from DB
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [registroToEdict, setRegistroToEdict] = useState(null); //Flag-Project

  //!Get PROJECTS' table in the VE [projectsDB
  useEffect(() => {
    setLoading(true); //show loader
    fetch(URL_PROJECT) //Do Req
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        console.log(json);
        setProjectsDB(json); //Set the ProjectsDB
        setError(null); // Isn't error
        setLoading(false); //Loader off
      })
      .catch((err) => {
        setProjectsDB(null);
        setError(err);
      });
  }, []);

  console.log(projectsDB);

  return (
    <div>
      <h1>ALL YOUR PROJECTS.</h1>
      <table>
        <thead>
          <tr>
            <th>Project's id</th>
            <th>Project's Name</th>
            <th>Project's Client</th>
            <th>Project's Description</th>
            <th>Active</th>
            <th>Accions</th>
          </tr>
        </thead>

        <tbody>
          {projectsDB === 0 ? (
            <tr>
              <td colSpan={6}>vacia</td>
            </tr>
          ) : (
            projectsDB.map((el) => (
              <tr>
                <td>{el.id}</td>
                <td>{el.name}</td>
                <td>{el.client_id}</td>
                <td>{el.description}</td>
                <td>{el.active ? "Yes" : "No"}</td>
                <td>
                  <button
                    onClick={() => {
                      setRegistroToEdict(el.id); //!Deja de ser NULL
                    }}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => {
                      deleteRegistro(el.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      ;
    </div>
  );
}

export default CrudTable;

/*
import React from "react";
import CrudTableRow from "./CrudTableRow";
import "../stylies/ComponentTable.css";

function CrudTable({ dataProjects, setRegistroToEdict, deleteRegistro }) {
  console.log(dataProjects);
  return (
    <div>
      <h4>Project's Data</h4>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Project's Name</th>
            <th>Project's Client</th>
            <th>Project's Description</th>
            <th>Actve</th>
            <th>Accions</th>
          </tr>
        </thead>

        <tbody>
          {dataProjects.length === 0 ? (
            <tr>
              <td colSpan="6">Without Projects</td>
            </tr>
          ) : (
            dataProjects.map((el) => (
              <CrudTableRow
                key={el.id}
                projectRegister={el}
                setRegistroToEdict={setRegistroToEdict}
                deleteRegistro={deleteRegistro}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CrudTable;


*/

//!otro return
/*
 return (
    <div>
      <h4>Project's Data</h4>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Project's Name</th>
            <th>Project's Client</th>
            <th>Project's Description</th>
            <th>Active</th>
            <th>Accions</th>
          </tr>
        </thead>

        <tbody>
          {projectsDB.length === 0 ? (
            <tr>
              <td colSpan="6">Without Projects to show</td>
            </tr>
          ) : (
            projectsDB.map((el) => (
              <tr>
                <td>{el.id}</td>
                <td>{el.name}</td>
                <td>{el.description}</td>
                <td>{el.active ? "Yes" : "No"}</td>
                <td>
                  <button
                    onClick={(e) => {
                      setRegistroToEdict(projectsDB); //!Deja de ser NULL
                      console.log(e.target);
                      // updateRegistro(
                      //   projectsDB,
                      //   projectsDB,
                      //   setProjectsDB,
                      //   setError
                      // );
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      //TODOdeleteRegistro(id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
*/
