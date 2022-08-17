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
  URL_CONTRACTOR,
  URL_TASK,
  URL_TASK_MORE_ID,
  URL_PRODUCT,
  URL_ACTIVITY,
  URL_CATEGORY,
} from "../helpers/ApiURL";
import Loader from "../helpers/Loader";
import Message from "../helpers/Message";
import "../stylies/ComponentForm.css";
import "../index";

//!Child's Table
function TableListTaskEntry({
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
      <h1>CHOOSE THE TASK ENTRY TO UPDATE OR DELETE.</h1>
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
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan={12}>You don't have Task Entries.</td>
            </tr>
          ) : (
            records.map((el) => (
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
                <td className="buttonList">
                  <button
                    onClick={(e) => {
                      setRegistroToEdict(el); //!Deja de ser NULL, cambia titulo
                      setForm(el);
                      console.log(el);
                      //TODO: window.scrollTo = "0px";
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
  date: "",
  contractor_id: "",
  duration: "",
  billable: "",
  project_id: "",
  client_id: "",
  product_id: "",
  activity_id: "",
  category_id: "",
  description: "",
};
function CrudFormListTaskEntry() {
  const [form, setForm] = useState(initialDB);
  const [clients, setClients] = useState([]);
  const [projectsDB, setProjectsDB] = useState([]);
  const [taskEntriesDB, setTaskEntriesDB] = useState([]);
  const [contractorsDB, setContractorsDB] = useState([]);
  const [productDB, setProductDB] = useState([]);
  const [activitiesDB, setActivitiesDB] = useState([]);
  const [categoriesDB, setCategoriesDB] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [registroToEdict, setRegistroToEdict] = useState(null);

  //!get CLIENTS' table
  useEffect(() => {
    setLoading(true); //show loader
    fetch(URL_CLIENT)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setClients(json);
        setLoading(false); //show loader
      })
      .catch((err) => console.log(err));
  }, []);

  //!Get PROJECTS' table  in the VE ProjectsDB
  useEffect(() => {
    setLoading(true); //show loader
    fetch(URL_PROJECT) //Do Req
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setProjectsDB(json);
        setLoading(false); //show loader
      })
      .catch((err) => console.log(err));
  }, []);

  //!Get TASKENTRY' table  in the VE ProjectsDB
  useEffect(() => {
    setLoading(true); //show loader
    fetch(URL_TASK) //Do Req
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setTaskEntriesDB(json); //Set the ProjectsDB
        setError(null); // Isn't error
        setLoading(false); //Loader off
        console.log();
      })
      .catch((err) => {
        setTaskEntriesDB(null);
        setError(err);
      });
  }, []);

  //!get CONTRACTOR'S table
  useEffect(() => {
    setLoading(true); //show loader
    fetch(URL_CONTRACTOR)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setContractorsDB(json);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  //!get PRODUCT'S table
  useEffect(() => {
    setLoading(true); //show loader
    fetch(URL_PRODUCT)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setProductDB(json);
        setLoading(false); //show loader
      })
      .catch((err) => console.log(err));
  }, []);

  //!get ACTIVITY'S table
  useEffect(() => {
    setLoading(true); //show loader
    fetch(URL_ACTIVITY)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setActivitiesDB(json);
        setLoading(false); //show loader
      })
      .catch((err) => console.log(err));
  }, []);

  //!get CATEGORY'S table
  useEffect(() => {
    setLoading(true); //show loader
    fetch(URL_CATEGORY)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setCategoriesDB(json);
        setLoading(false); //show loader
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
    if (
      !form.duration ||
      !form.description ||
      !form.client_id ||
      !form.product_id ||
      !form.project_id ||
      !form.activity_id ||
      !form.category_id ||
      !form.contractor_id
    ) {
      alert("Please, fill out all the inputs");
      return;
    }

    //!Whiltout ID, is flag to make the POST()
    if (form.id === null) {
      createRegistro(
        URL_TASK,
        form,
        setLoading,
        setTaskEntriesDB,
        setError,
        "You have posted the Task Entry successfully"
      );

      //TODO: REDIRECCION BOTTOM=0, DE ESTA MISMA PAGINA, PARA NOTAR LA ULTIMA INSERCION QUE ACABO DE HACER
    } else {
      //!With ID, is flag to make the UPDATE()
      updateRegistro(
        `${URL_TASK_MORE_ID}${form.id}`,
        form,
        taskEntriesDB,
        setTaskEntriesDB,
        setError,
        setLoading,
        "You have updated the Task Entry successfully"
      );
    }
    handleReset();
    //TODO: REDIRECCION AL TOP=0, DE ESTA MISMA PAGINA, PARA NOTAR LA ULTIMA INSERCION QUE ACABO DE HACER
  };

  const handleReset = (e) => {
    setForm(initialDB);
    setRegistroToEdict(null);
    e.target.checked = false;
  };

  //!Making the DELETE()
  const handleDelete = (id, el) => {
    deleteRegistro(
      `${URL_TASK_MORE_ID}${id}`,
      id,
      taskEntriesDB,
      setTaskEntriesDB,
      setError,
      "You have deleted the Task Entry successfully"
    );
  };

  return (
    <div>
      <br />
      <br />
      <h1>FORM OF TASK ENTRIES.</h1>
      <h2>
        {!registroToEdict
          ? "Adding a new Task Entry to the list."
          : "Editing... What do you want change of the Task Entry?"}
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

        <h3>Project's Date</h3>
        <br />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />
        <br />

        <label>
          <h3>Task's Dutation</h3>
          <input
            type="number"
            name="duration"
            placeholder="Horurs spent"
            value={form.duration}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          <h3>Select the Task's Contractor.</h3>
          <br />
          <select name="contractor_id" onChange={handleChange}>
            {contractorsDB.map((contractor) => (
              <option value={contractor.id}>
                <p>
                  Contractor's Name: {contractor.fullname} ⇒ ID: {contractor.id}
                </p>
              </option>
            ))}
          </select>
        </label>

        <br />
        <label>
          <h3>Select the Task's Project.</h3>
          <br />
          <select name="project_id" onChange={handleChange}>
            {projectsDB.map((project) => (
              <option value={project.id}>
                <p>
                  Project's Name: {project.name} ⇒ ID: {project.id}
                </p>
              </option>
            ))}
          </select>
        </label>
        <h4>
          If your project is new, it's not in the list. Just add it, clicking
          <Link className="sonAssets sonAssets2" to="../form-project">
            <i>here</i>
          </Link>
        </h4>
        <br />

        <br />
        <label>
          <h3>Select the Task's Client.</h3>
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
          <Link className="sonAssets sonAssets2" to="../form-client">
            <i>here</i>
          </Link>
        </h4>
        <br />

        <label>
          <h3>Select the Task's Product.</h3>
          <br />
          <select name="product_id" onChange={handleChange}>
            {productDB.map((product) => (
              <option value={product.id}>
                <p>
                  Product's Description: {product.description} ⇒ ID:{" "}
                  {product.id}
                </p>
              </option>
            ))}
          </select>
        </label>

        <br />

        <label>
          <h3>Select the Task's Activity.</h3>
          <br />
          <select name="activity_id" onChange={handleChange}>
            {activitiesDB.map((activity) => (
              <option value={activity.id}>
                <p>
                  Activity's Description: {activity.description} ⇒ ID:{" "}
                  {activity.id}
                </p>
              </option>
            ))}
          </select>
        </label>

        <br />

        <label>
          <h3>Select the Task's Category.</h3>
          <br />
          <select name="category_id" onChange={handleChange}>
            {categoriesDB.map((category) => (
              <option value={category.id}>
                <p>
                  Category's Description: {category.description} ⇒ ID:{" "}
                  {category.id}
                </p>
              </option>
            ))}
          </select>
        </label>

        <br />

        <textarea
          name="description"
          placeholder="Task's description"
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
          <h3>Is billable this task?</h3>
          <input type="checkbox" name="billable" onChange={handleChecked} />
        </label>
        <br />

        <input type="submit" value="Submit" />
        <input type="reset" value="Reset" onClick={handleReset} />
      </form>
      <br />
      <br />
      <br />
      {
        <TableListTaskEntry
          setForm={setForm}
          setRegistroToEdict={setRegistroToEdict}
          registroToEdict={registroToEdict}
          records={taskEntriesDB}
          onDelete={handleDelete}
          error={error}
          loading={loading}
        />
      }
    </div>
  );
}

export default CrudFormListTaskEntry;
