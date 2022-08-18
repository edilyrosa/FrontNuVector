import React, { useState, useEffect } from "react";
import "../stylies/ComponentTable.css";
import { URL_TASK } from "../helpers/ApiURL";
import Loader from "../helpers/Loader";

function ListSearchTask(props) {
  const [taskEntriesDB, setTaskEntriesDB] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  //!Get TASK' table in the VE taskEntryDB
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
        setTaskEntriesDB([]);
        setError(err);
      });
  }, [setTaskEntriesDB]);

  //!EVENT INPUT SEARCH
  const onSearchValueChange = (e) => {
    setSearchValue(e.target.value); //!get the text written
  };
  let searchedTask = [];
  if (searchValue.length === 0) {
    searchedTask = taskEntriesDB;
  } else {
    searchedTask = taskEntriesDB.filter((el) => {
      const dbText = el.description.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return dbText.includes(searchText);
    });
  }
  return (
    <div>
      <br />
      <br />
      <h1>ALL YOUR TASK ENTRIES.</h1>
      {loading && <Loader />}

      <div className="listProjects">
        <input
          className="TodoSearch"
          placeholder="Search your Task Entry by its Description"
          value={searchValue}
          onChange={onSearchValueChange}
        />
        <br /> <br /> <br /> <br />
        <table>
          <thead>
            <tr>
              <th>Task's Entry id</th>
              <th>Date</th>
              <th>Hours</th>
              <th>Billable</th>
              <th>Contractor</th>
              <th>Client</th>
              <th>Project</th>
              <th>Product</th>
              <th>Activity</th>
              <th>Category</th>
              <th>Description</th>
            </tr>
          </thead>

          <tbody>
            {searchedTask.length === 0 ? (
              <tr>
                <td colSpan={12}>You don't have Task Entries.</td>
              </tr>
            ) : (
              searchedTask.map((el) => (
                <tr key={el.id}>
                  <td>{el.id}</td>
                  <td>{el.date}</td>
                  <td>{el.duration}</td>
                  <td>{el.billable ? "Yes" : "No"}</td>
                  <td>{el.Contractor ? el.Contractor.fullname : null}</td>
                  <td>{el.Client ? el.Client.name : null}</td>
                  <td>{el.Project ? el.Project.name : null}</td>
                  <td>{el.Product ? el.Product.description : null}</td>
                  <td>{el.Activity ? el.Activity.description : null}</td>
                  <td>{el.Category ? el.Category.description : null}</td>
                  <td>{el.description}</td>
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

export default ListSearchTask;
