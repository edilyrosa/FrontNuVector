import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  createRecord,
  updateRecord,
  deleteRecord,
} from "../helpers/CrudFuncions";
import { URL_API } from "../helpers/ApiURL";
import Loader from "../helpers/Loader";
import Message from "../helpers/Message";
import "../stylies/ComponentForm.css";
import "../index";

function TableListProject({
  setForm,
  setRecordToEdict,
  recordToEdict,
  records,
  onDelete,
  error,
  loading,
}) {
  return (
    <div>
      <br />
      <br />
      <h1>CHOOSE THE PROJECT TO UPDATE OR DELETE.</h1>
      {loading && <Loader />}
      {error && (
        <Message
          msj={`Error: ${error.status}: ${error.statusText}`}
          bgColor={"#dc3545"}
        />
      )}
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
          {records.length === 0 ? (
            <tr>
              <td colSpan={6}>You don't have Projects</td>
            </tr>
          ) : (
            records.map((el) => (
              <tr key={el.id}>
                <td>{el.id}</td>
                <td>{el.name}</td>
                <td>{el.Client ? el.Client.name : null}</td>
                <td>{el.description}</td>
                <td>{el.active ? "Yes" : "No"}</td>
                <td className="buttonList">
                  <button
                    onClick={(e) => {
                      setRecordToEdict(el); //!Flag
                      setForm(el);
                      window.scrollTo({
                        top: 0,
                        behavior: "smooth",
                      });
                    }}
                  >
                    Update
                  </button>

                  <button onClick={() => onDelete(el.id, el)}>Delete</button>
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

const initialDB = {
  id: null,
  client_id: "",
  name: "",
  description: "",
  active: "",
};

function CrudFormListProject() {
  const [form, setForm] = useState(initialDB);
  const [clients, setClients] = useState([]);
  const [projectsDB, setProjectsDB] = useState([]); //Array ProjectDB from DB
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recordToEdict, setRecordToEdict] = useState(null); //Flag-Project

  //!get CLIENTS' table
  useEffect(() => {
    setLoading(true);
    fetch(URL_API + "/client")
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
    fetch(URL_API + "/project")
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

  //!Set project's varible to post at DB
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };
  const handleChecked = (e) => {
    setForm({ ...form, [e.target.name]: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //!Validation before POST
    if (!form.name || !form.description || !form.client_id) {
      alert("Please, fill out all the inputs");
      return;
    }
    //!Whiltout ID, is flag to make the POST()
    if (form.id === null) {
      createRecord(
        URL_API + "/project",
        form,
        setLoading,
        setProjectsDB,
        setError,
        "You have sent the Project successfully"
      );
    } else {
      //!With ID, is flag to make the UPDATE()
      updateRecord(
        `${URL_API}/project/${form.id}`,
        form,
        projectsDB,
        setProjectsDB,
        setError,
        setLoading,
        "You have updated the Task Entry successfully"
      );
    }
    handleReset();
  };

  const handleReset = (e) => {
    setForm(initialDB);
    setRecordToEdict(null);
    //e.target.checked = false;
  };

  //!Making the DELETE()
  const handleDelete = (id, el) => {
    deleteRecord(
      `${URL_API}/project/${id}`,
      id,
      projectsDB,
      setProjectsDB,
      setError,
      "You have updated the Project successfully"
    );
  };

  return (
    <div>
      <br />
      <br />
      <h1>PORJECT'S FORM.</h1>
      <h2>
        {!recordToEdict
          ? "Adding a new Project to the list."
          : "Editing... What do you want to change of the Project?"}
      </h2>
      {loading && <Loader />}
      {error && (
        <Message
          msj={`Error: ${error.status}: ${error.statusText}`}
          bgColor={"#dc3545"}
        />
      )}

      <form onSubmit={handleSubmit}>
        <br />
        <label>
          <h3>Select the Client of this Porject.</h3>
          <br />
          <select name="client_id" onChange={handleChange}>
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
        <h4>
          If your client is new, it's not in the list. Just add it, clicking
          <Link className="sonAssets sonAssets2" to="../form-client">
            <i>here</i>
          </Link>
        </h4>
        <br />
        <input
          type="text"
          name="name"
          placeholder="Project's Name"
          value={form.name}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Project's description"
          autoComplete="on"
          minLength={2}
          maxLength={140}
          rows={4}
          cols={30}
          value={form.description}
          onChange={handleChange}
        />

        <br />
        <label>
          <h3>Is active the project?</h3>
          <input type="checkbox" name="active" onChange={handleChecked} />
        </label>
        <br />

        <input type="submit" value="Submit" />
        <input type="reset" value="Reset" onClick={handleReset} />
      </form>
      <br />
      <br />
      <br />
      <TableListProject
        setForm={setForm}
        setRecordToEdict={setRecordToEdict}
        recordToEdict={recordToEdict}
        records={projectsDB}
        onDelete={handleDelete}
        error={error}
        loading={loading}
        clients={clients}
        setClients={setClients}
      />
    </div>
  );
}

export default CrudFormListProject;
