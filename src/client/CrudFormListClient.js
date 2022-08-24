import React, { useState, useEffect } from "react";
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

function TableListClient({
  setForm,
  setRecordToEdict,
  recordToEdict,
  records,
  onDelete,
  error,
  loading,
}) {
  return (
    <div className="div">
      <br />
      <br />
      <h1>CHOOSE THE CLIENT TO UPDATE OR DELETE.</h1>
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
            <th>Client's id</th>
            <th>Client's Name</th>
            <th>Client's City</th>
            <th>Client's State</th>
            <th>Client's Country</th>
            <th>Client's industry_codes</th>
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {records.length === 0 ? (
            <tr>
              <td colSpan={7}>You don't have Clients</td>
            </tr>
          ) : (
            records.map((el) => (
              <tr key={el.id}>
                <td>{el.id}</td>
                <td>{el.name}</td>
                <td>{el.city}</td>
                <td>{el.state}</td>
                <td>{el.country}</td>
                <td>{el.industry_codes}</td>
                <td>{el.active}</td>
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
  name: "",
  city: "",
  state: "",
  country: "",
  industry_codes: "",
  active: "",
};
function CrudFormListClient() {
  const [form, setForm] = useState(initialDB);
  const [clients, setClients] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [recordToEdict, setRecordToEdict] = useState(null); //Flag-Project

  //!get CLIENTS' table State Var clients
  useEffect(() => {
    setLoading(true);
    fetch(URL_API + "/client")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setClients(json);
        setError(null);
        setLoading(false);
      })
      .catch((err) => {
        setClients(null);
        setError(err);
      });
  }, []);

  //!Set client's varible to post at DB
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    //!Validation before POST
    if (
      !form.name ||
      !form.city ||
      !form.state ||
      !form.country ||
      !form.industry_codes ||
      !form.active
    ) {
      alert("Please, fill out all the inputs");
      return;
    }
    //!Whiltout ID, is flag to make the POST()
    if (form.id === null) {
      createRecord(
        URL_API + "/client",
        form,
        setLoading,
        setClients,
        setError,
        "You have sent the Project successfully"
      );
    } else {
      //!With ID, is flag to make the UPDATE()
      updateRecord(
        `${URL_API}/client/${form.id}`,
        form,
        clients,
        setClients,
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
  };

  //!Making the DELETE()
  const handleDelete = (id, el) => {
    deleteRecord(
      `${URL_API}/client/${id}`,
      id,
      clients,
      setClients,
      setError,
      "You have updated the Project successfully"
    );
  };

  return (
    <div>
      <br />
      <br />
      <h1>CLIENT'S FORM.</h1>
      <h2>
        {!recordToEdict
          ? "Adding a new Client to the list."
          : "Editing... What do you want to change of the Client?"}
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
        <input
          type="text"
          name="name"
          placeholder="Client's Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="city"
          placeholder="Client's City"
          value={form.city}
          onChange={handleChange}
        />

        <input
          type="text"
          name="state"
          placeholder="Client's State"
          value={form.state}
          onChange={handleChange}
        />

        <input
          type="text"
          name="country"
          placeholder="Client's Country"
          value={form.country}
          onChange={handleChange}
        />
        <input
          type="text"
          name="industry_codes"
          placeholder="Industry_codes of the Client"
          value={form.industry_codes}
          onChange={handleChange}
        />
        <input
          type="text"
          name="active"
          placeholder="Is active the Client? Y/N"
          value={form.active}
          onChange={handleChange}
        />

        <input type="submit" value="Submit" />
        <input type="reset" value="Reset" onClick={handleReset} />
      </form>
      <br />
      <br />
      <br />
      <TableListClient
        setForm={setForm}
        setRecordToEdict={setRecordToEdict}
        recordToEdict={recordToEdict}
        records={clients}
        onDelete={handleDelete}
        error={error}
        loading={loading}
      />
    </div>
  );
}

export default CrudFormListClient;
