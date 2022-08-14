import React, { useState, useEffect } from "react";
import { createRegistro, updateRegistro } from "../helpers/CrudFuncions";
import Message from "../helpers/Message";
import "../stylies/ComponentForm.css";
import "../index";

const initialDB = {
  id: null,
  client_id: "", //se nutre de un Dropdown que es un JSON [{},{}], pero finalmente captura solo el codigo
  name: "",
  description: "",
  active: "",
};

function FormProject() {
  const [form, setForm] = useState(initialDB);
  const [clients, setClients] = useState([]);
  const [projectsDB, setProjectsDB] = useState(null); //Array ProjectDB from DB
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [registroToEdict, setRegistroToEdict] = useState(null); //Flag-Project

  //!get CLIENTS' table
  useEffect(() => {
    fetch("http://localhost:5000/client")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        console.log(json);
        setClients(json);
      })
      .catch((err) => console.log(err));
  }, []);

  //!Get PROJECTS' table
  useEffect(() => {
    setLoading(true); //show loader
    fetch("http://localhost:5000/project") //Do Req
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

  //!Set project's varible to post at DB
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleChecked = (e) => {
    setForm({ ...form, [e.target.name]: e.target.checked });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    //!Validation before POST
    if (!form.client_id || !form.name || !form.description || !form.active) {
      alert("Please, fill out all the inputs");
      return;
    }
    //!Whiltout ID, is flag to make the POST()
    if (form.id === null) {
      createRegistro(form, setLoading, setProjectsDB, projectsDB, setError);

      //!With ID, is flag to make the UPDATE()
    } else {
      updateRegistro(form, projectsDB, setProjectsDB, setError);
    }
    handleReset();
  };

  const handleReset = (e) => {
    setForm(initialDB);
    setRegistroToEdict(null);
  };
  return (
    <div>
      <h1>PORJECT'S FORM.</h1>
      <h2>
        {!registroToEdict
          ? "Adding a new Project to the list."
          : "Editing... What do you want change of the Project?"}
      </h2>
      <form onSubmit={handleSubmit}>
        <br />
        <label>
          <h3>Select the Client of this Porject.</h3>
          <br />
          <select
            name="client_id"
            defaultValue="Client's List"
            onChange={handleChange}
          >
            {clients.map((client) => (
              <option value={client.id}>
                {client.name} - {client.id}{" "}
              </option>
            ))}
          </select>
        </label>
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
          placeholder="Write project's description"
          autoComplete="on"
          minLength={15}
          maxLength={140}
          rows={4}
          cols={30}
          value={form.description}
          onChange={handleChange}
        />

        <br />
        <label>
          <h3>Is active the project?</h3>
          <input
            type="checkbox"
            name="active"
            onChange={handleChecked}
            required
          />
        </label>
        <br />

        <input type="submit" value="Submit" />
        <input type="reset" value="Reset" onClick={handleReset} />
      </form>
      {error && (
        <Message
          msj={`Error: ${error.status}: ${error.statusText}`}
          bgColor={"#dc3545"}
        />
      )}
    </div>
  );
}

export default FormProject;
