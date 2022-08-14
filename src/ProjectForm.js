import React from "react";

function ProjectForm({ clients }) {
  return (
    <div>
      <h3>FORMULARIO</h3>
      <form>
        <br />
        <label>
          Client of this Porject.
          <br />
          <select name="client_id" defaultValue="Client's List">
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
          value="BLUE"
        />

        <textarea
          name="description"
          placeholder="Wriite project's description"
          autoComplete="on"
          minLength={15}
          maxLength={140}
          rows={4}
          cols={30}
          value="TODO FINO"
        />

        <br />
        <label>
          Is active the project?
          <input type="checkbox" name="active" required />
        </label>
        <br />

        <input type="submit" value="Enviar" />
        <input type="reset" value="Limpiar" />
      </form>
    </div>
  );
}

export default ProjectForm;