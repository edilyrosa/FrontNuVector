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
    setLoading(true); //show loader
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
              <th>Task's Entry ID</th>
              <th>Date</th>
              <th>Hours</th>
              <th>Billable</th>
              <th>Contractor ID</th>
              <th>Client ID</th>
              <th>Project ID</th>
              <th>Product ID</th>
              <th>Activity ID</th>
              <th>Category ID</th>
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
                  <td>{el.contractor_id}</td>
                  <td>{el.client_id}</td>
                  <td>{el.project_id}</td>
                  <td>{el.product_id}</td>
                  <td>{el.activity_id}</td>
                  <td>{el.category_id}</td>
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
