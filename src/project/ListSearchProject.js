import React, { useState, useEffect } from "react";
import "../stylies/ComponentTable.css";
import { URL_API } from "../helpers/ApiURL";
import Loader from "../helpers/Loader";
import "../stylies/ComponenteSearch.css";

function ListSearchProject() {
  const [projectsDB, setProjectsDB] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  //!Get PROJECTS' table in the VE ProjectsDB
  useEffect(() => {
    setLoading(true); //show loader
    fetch(URL_API + '/project') //Do Req
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
  }, [setProjectsDB]);

  //!EVENT INPUT SEARCH
  const onSearchValueChange = (e) => {
    setSearchValue(e.target.value); //!get the text written
  };
  let searchedProjects = [];
  if (searchValue.length === 0) {
    searchedProjects = projectsDB;
  } else {
    searchedProjects = projectsDB.filter((el) => {
      const dbText = el.name.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return dbText.includes(searchText);
    });
  }

  return (
    <div>
      <br />
      <br />
      <h1>All YOUR PROJECTS.</h1>
      {loading && <Loader />}
      <div className="listProjects">
        <input
          className="TodoSearch"
          placeholder="Search your Project by its Name"
          value={searchValue}
          onChange={onSearchValueChange}
        />
        <br />
        <br />
        <br />
        <br />
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
            {searchedProjects.length === 0 ? (
              <tr>
                <td colSpan={6}>vacia</td>
              </tr>
            ) : (
              searchedProjects.map((el) => (
                <tr key={el.id}>
                  <td>{el.id}</td>
                  <td>{el.name}</td>
                  <td>{el.Client.name}</td>
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
