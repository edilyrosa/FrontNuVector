import React, { useState, useEffect } from "react";
import {
  createRegistro,
  updateRegistro,
  deleteRegistro,
} from "../helpers/CrudFuncions";
import { URL_CLIENT, URL_CLIENT_ID } from "../helpers/ApiURL";
import Loader from "../helpers/Loader";
import Message from "../helpers/Message";
import "../stylies/ComponentForm.css";
import "../index";

function TableListClient({
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
                      setRegistroToEdict(el);
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
  const [registroToEdict, setRegistroToEdict] = useState(null); //Flag-Project

  //!get CLIENTS' table
  useEffect(() => {
    setLoading(true); //show loader
    fetch(URL_CLIENT) //Do Req
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        setClients(json); //Set the ProjectsDB
        setError(null); // Isn't error
        setLoading(false); //Loader off
        console.log();
      })
      .catch((err) => {
        setClients(null);
        setError(err);
      });
  }, []);

  //!Set project's varible to post at DB
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
      createRegistro(
        URL_CLIENT,
        form,
        setLoading,
        setClients,
        setError,
        "You have sent the Project successfully"
      );

      //TODO: REDIRECCION BOTTOM=0, DE ESTA MISMA PAGINA, PARA NOTAR LA ULTIMA INSERCION QUE ACABO DE HACER
    } else {
      //!With ID, is flag to make the UPDATE()
      updateRegistro(
        `${URL_CLIENT_ID}${form.id}`,
        form,
        clients,
        setClients,
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
  };

  //!Making the DELETE()
  const handleDelete = (id, el) => {
    deleteRegistro(
      `${URL_CLIENT_ID}${id}`,
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
        {!registroToEdict
          ? "Adding a new Client to the list."
          : "Editing... What do you want change of the Client?"}
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
        setRegistroToEdict={setRegistroToEdict}
        registroToEdict={registroToEdict}
        records={clients}
        onDelete={handleDelete}
        error={error}
        loading={loading}
      />
    </div>
  );
}

export default CrudFormListClient;
