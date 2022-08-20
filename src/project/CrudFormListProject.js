import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  createRegistro,
  updateRegistro,
  deleteRegistro,
} from "../helpers/CrudFuncions";
import {
  URL_CLIENT,
  URL_PROJECT,
  URL_PROJECT_MORE_ID,
} from "../helpers/ApiURL";
import Loader from "../helpers/Loader";
import Message from "../helpers/Message";
import "../stylies/ComponentForm.css";
import "../index";

function TableListProject({
  setForm,
  setRegistroToEdict,
  registroToEdict,
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
                      setRegistroToEdict(el); //!Flag
                      setForm(el);
                      console.log(el);
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
  const [registroToEdict, setRegistroToEdict] = useState(null); //Flag-Project

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
      createRegistro(
        URL_PROJECT,
        form,
        setLoading,
        setProjectsDB,
        setError,
        "You have sent the Project successfully"
      );

      //TODO: REDIRECCION BOTTOM=0, DE ESTA MISMA PAGINA, PARA NOTAR LA ULTIMA INSERCION QUE ACABO DE HACER
    } else {
      //!With ID, is flag to make the UPDATE()
      updateRegistro(
        `${URL_PROJECT_MORE_ID}${form.id}`,
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
    setRegistroToEdict(null);
    e.target.checked = false;
  };

  //!Making the DELETE()
  const handleDelete = (id, el) => {
    deleteRegistro(
      `${URL_PROJECT_MORE_ID}${id}`,
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
        {!registroToEdict
          ? "Adding a new Project to the list."
          : "Editing... What do you want change of the Project?"}
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
        setRegistroToEdict={setRegistroToEdict}
        registroToEdict={registroToEdict}
        records={projectsDB}
        onDelete={handleDelete}
        error={error}
        loading={loading}
      />
    </div>
  );
}

export default CrudFormListProject;
