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

//!Child's Table
function TableListTaskEntry({
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
      <h1>CHOOSE THE TASK ENTRY TO UPDATE OR DELETE.</h1>
      {loading && <Loader />}
      {error && (
        <Message
          msj={`Error: ${error.status}: ${error.statusText}`}
          bgColor={"#dc3545"}
        />
      )}
      <table className="TableTask">
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
                <td>{el.Contractor ? el.Contractor.fullname : null}</td>
                <td>{el.Client ? el.Client.name : null}</td>
                <td>{el.Project ? el.Project.name : null}</td>
                <td>{el.Product ? el.Product.description : null}</td>
                <td>{el.Activity ? el.Activity.description : null}</td>
                <td>{el.Category ? el.Category.description : null}</td>
                <td>{el.description}</td>
                <td className="buttonList">
                  <button
                    onClick={(e) => {
                      setRecordToEdict(el);
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
  const [recordToEdict, setRecordToEdict] = useState(null);

  //!get CLIENTS' table State Var clients
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

  //!Get PROJECTS' table  in State Var ProjectsDB
  useEffect(() => {
    setLoading(true);
    fetch(URL_API + "/project")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setProjectsDB(json);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  //!Get TASKENTRY' table  in State Var TaskEntriesDB
  useEffect(() => {
    setLoading(true);
    fetch(URL_API + "/taskentry")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setTaskEntriesDB(json);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        setTaskEntriesDB(null);
        setError(err);
      });
  }, []);

  //!get CONTRACTOR'S table
  useEffect(() => {
    setLoading(true); //show loader
    fetch(URL_API + "/contractor")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setContractorsDB(json);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  //!get PRODUCT'S table
  useEffect(() => {
    setLoading(true);
    fetch(URL_API + "/product")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setProductDB(json);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  //!get ACTIVITY'S table
  useEffect(() => {
    setLoading(true);
    fetch(URL_API + "/activity")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setActivitiesDB(json);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  //!get CATEGORY'S table
  useEffect(() => {
    setLoading(true);
    fetch(URL_API + "/category")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setCategoriesDB(json);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  //!Set project's varible from info form
  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleChecked = (e) => {
    setForm({ ...form, [e.target.name]: e.target.checked });
  };

  const selectedProject = projectsDB.find(
    (project) => project.id === +form.project_id
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    //!Validation before POST
    if (
      !form.duration ||
      !form.description ||
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
      createRecord(
        URL_API + "/taskentry",
        { ...form, client_id: selectedProject.Client.id },
        setLoading,
        setTaskEntriesDB,
        setError,
        "You have posted the Task Entry successfully"
      );
    } else {
      //!With ID, is flag to make the UPDATE()
      updateRecord(
        `${URL_API}/taskentry/${form.id}`,
        form,
        taskEntriesDB,
        setTaskEntriesDB,
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
    e.target.checked = false;
  };

  //!Making the DELETE()
  const handleDelete = (id, el) => {
    deleteRecord(
      `${URL_API}/taskentry/${id}`,
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
        {!recordToEdict
          ? "Adding a new Task Entry to the list."
          : "Editing... What do you want to change of the Task Entry?"}
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

        <h3>Tak's Date</h3>
        <br />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
        />
        <br />

        <label>
          <h3>Task's Duration</h3>
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
            <option>Select a Contractor</option>
            {contractorsDB.map((contractor) => (
              <option value={contractor.id} key={contractor.id}>
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
            <option>Select a Project</option>
            {projectsDB.map((project) => (
              <option value={project.id} key={project.id}>
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
          <h3>Task's Client.</h3>
          <br />

          <select
            name="client_id"
            onChange={handleChange}
            disabled
            value={selectedProject ? selectedProject.Client.id : null}
          >
            <option>Client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
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
            <option>Select a Product</option>
            {productDB.map((product) => (
              <option value={product.id} key={product.id}>
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
            <option>Select a Activity</option>
            {activitiesDB.map((activity) => (
              <option value={activity.id} key={activity.id}>
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
            <option>Select a Category</option>
            {categoriesDB.map((category) => (
              <option value={category.id} key={category.id}>
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
          setRecordToEdict={setRecordToEdict}
          recordToEdict={recordToEdict}
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
