import axios from "axios";
import React, { useState, useEffect } from "react";

const initialDB = {
  id: null,
  client_id: "", //se nutre de un Dropdown que es un JSON [{},{}], pero finalmente captura solo el codigo
  name: "",
  description: "",
  active: "",
};
function FormProject({
  createRegistro,
  updateRegistro,
  registroToEdict,
  setRegistroToEdict,
  clients, //todo trae todos los clientes de la tabla y NUTRA EL INPUT client_id}) {
}) {
  const [form, setForm] = useState(initialDB);

  useEffect(() => {
    axios.get("http://localhost:5000/client").then((res) => {
      console.log(res);
    });
  }, []);

  useEffect(() => {
    if (registroToEdict) setForm(registroToEdict);
    // registroToEdict, trae la info modificada del registro existente, y la establece en el formulario para q usuario la modifique.
    else setForm(initialDB);
  }, [registroToEdict]); //?Ella es null, si cambiara renderizara el componente. Esta a la espera, a q esta variable, deje de ser nula, para hacer la EDICION. Dejara de ser una al EVENTO onclik sobre el n=botton EDITAR de la tabla

  //*Cada q usuario llene input oyente de value (no booleano = checked) actualizara la Var de Edo q tiene al info del registro completo.
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleChecked = (e) => {
    setForm({ ...form, [e.target.name]: e.target.checked });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    //!Validation
    if (!form.client_id || !form.name || !form.description || !form.active) {
      alert("Please, fill out all the inputs");
      return;
    }
    //!Whiltout ID, is flag to make the CREATE()
    if (form.id === null) {
      createRegistro(form);
      //!With ID, is flag to make the UPDATE()
    } else {
      updateRegistro(form);
    }
    handleReset();
  };

  const handleReset = (e) => {
    setForm(initialDB);
    setRegistroToEdict(null);
  };
  return (
    <div>
      <h3>{!registroToEdict ? "Adding" : "Editing"}</h3>
      <form onSubmit={handleSubmit}>
        <br />
        <label>
          Client of this Porject.
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
          placeholder="Project's name"
          value={form.name}
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Wriite project's description"
          autoComplete="on"
          minLength={15}
          maxLength={140}
          rows={4}
          cols={30}
          value={form.comentarios}
          onChange={handleChange}
        />

        <br />
        <label>
          Is active the project?
          <input
            type="checkbox"
            name="active"
            onChange={handleChecked}
            required
          />
        </label>
        <br />

        <input type="submit" value="Enviar" />
        <input type="reset" value="Limpiar" onClick={handleReset} />
      </form>
    </div>
  );
}

export default FormProject;
