import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  //createRegistro,
  //updateRegistro,
  deleteRegistro,
} from "../helpers/CrudFuncions";
import {
  URL_CLIENT,
  URL_PROJECT,
  URL_CONTRACTOR,
  URL_TASK,
  URL_PRODUCT,
  URL_ACTIVITY,
  URL_CATEGORY,
} from "../helpers/ApiURL";
import Loader from "../helpers/Loader";
import Message from "../helpers/Message";
import "../stylies/ComponentForm.css";
import "../index";

const initialDB = {
  id: null,
  date: "",
  contractor_id: "",
  hour: "",
  billable: "",
  project_id: "",
  client_id: "",
  product_id: "",
  activity_id: "",
  category_id: "",
  description: "",
};
function CrudFormListTaskEntry(props) {
  const [form, setForm] = useState(initialDB);
  const [clients, setClients] = useState([]);
  const [projectsDB, setProjectsDB] = useState([]);
  const [contractorsDB, setContractorsDB] = useState([]);
  const [productDB, setProductDB] = useState([]);
  const [activitiesDB, setActivitiesDB] = useState([]);
  const [categoriesDB, setCategoriesDB] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [registroToEdict, setRegistroToEdict] = useState(null);

  //!get CLIENTS' table
  useEffect(() => {
    //setLoading(true); //show loader
    fetch(URL_CLIENT)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setClients(json);
        //setLoading(false); //show loader
      })
      .catch((err) => console.log(err));
  }, []);

  //!Get PROJECTS' table  in the VE ProjectsDB
  useEffect(() => {
    setLoading(true); //show loader
    fetch(URL_PROJECT) //Do Req
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setProjectsDB(json); //Set the ProjectsDB
        setError(null); // Isn't error
        setLoading(false); //Loader off
        console.log();
      })
      .catch((err) => {
        setProjectsDB(null);
        setError(err);
      });
  }, []);

  //!get CONTRACTOR'S table
  useEffect(() => {
    //setLoading(true); //show loader
    fetch(URL_CONTRACTOR)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setContractorsDB(json);
        //setLoading(false); //show loader
      })
      .catch((err) => console.log(err));
  }, []);

  //!get PRODUCT'S table
  useEffect(() => {
    fetch(URL_PRODUCT)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setProductDB(json);
      })
      .catch((err) => console.log(err));
  }, []);

  //!get ACTIVITY'S table
  useEffect(() => {
    fetch(URL_ACTIVITY)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setActivitiesDB(json);
      })
      .catch((err) => console.log(err));
  }, []);

  //!get CATEGORY'S table
  useEffect(() => {
    fetch(URL_CATEGORY)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setCategoriesDB(json);
      })
      .catch((err) => console.log(err));
  }, []);

  //////////////////////////////////
  //!Set project's varible from info form
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleChecked = (e) => {
    setForm({ ...form, [e.target.name]: e.target.checked });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    //!Validation before POST
    if (!form.name || !form.description) {
      alert("Please, fill out all the inputs");
      return;
    }

    //!quede aquiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
    //!Whiltout ID, is flag to make the POST()
    if (form.id === null) {
      createRegistro(
        URL_PROJECT,
        form,
        setLoading,
        setProjectsDB,
        projectsDB,
        setError
      );
      //TODO: REDIRECCION BOTTOM=0, DE ESTA MISMA PAGINA, PARA NOTAR LA ULTIMA INSERCION QUE ACABO DE HACER

      //!With ID, is flag to make the UPDATE()
    } else {
      updateRegistro(
        `${URL_PROJECT_MORE_ID}${form.id}`,
        form,
        projectsDB,
        setProjectsDB,
        setError
      );
    }
    handleReset();
    //TODO: REDIRECCION AL TOP=0, DE ESTA MISMA PAGINA, PARA NOTAR LA ULTIMA INSERCION QUE ACABO DE HACER
  };

  const handleReset = (e) => {
    setForm(initialDB);
    setRegistroToEdict(null);
  };

  const handleDelete = (id, el) => {
    deleteRegistro(
      `${URL_PROJECT_MORE_ID}${id}`,
      id,
      projectsDB,
      setProjectsDB,
      setError
    );
  };

  /////////////////////
  return (
    <div>
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
            {clients.map((client) => (
              <option value={client.id}>
                <p>
                  Client's Name: {client.name} ⇒ ID: {client.id}
                </p>
              </option>
            ))}
          </select>
        </label>
        <h4>
          If your client is new, it's not in the list. Just add it, clicking
          <Link className="sonAssets sonAssets2" to="./form-client">
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
      {/* <TableListProject
        setForm={setForm}
        setRegistroToEdict={setRegistroToEdict}
        registroToEdict={registroToEdict}
        records={projectsDB}
        onDelete={handleDelete}
        error={error}
        loading={loading}
      /> */}
    </div>
  );
}

export default CrudFormListTaskEntry;
