import React, { useState, useEffect } from "react";
import "../stylies/ComponentTable.css";
import { URL_TASK } from "../helpers/ApiURL";
import Loader from "../helpers/Loader";

function ListSearchTask(props) {
  const [taskEntriesDB, setTaskEntriesDB] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //!Get TASK' table in the VE taskEntryDB
  useEffect(() => {
    fetch(URL_TASK)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setTaskEntriesDB(json);
        setError(null);
      })
      .catch((err) => {
        setTaskEntriesDB([]);
        setError(err);
      });
  }, [setTaskEntriesDB]);

  return (
    <div>
      <br />
      <br />
      <h1>ALL YOUR TASK ENTRIES.</h1>
      {loading && <Loader />}
      <br /> <br /> <br /> <br />
      <div className="listProjects">
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
            {taskEntriesDB.length === 0 ? (
              <tr>
                <td colSpan={12}>You don't have Task Entries.</td>
              </tr>
            ) : (
              taskEntriesDB.map((el) => (
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
