import React from "react";

function CrudTableRow({ registro, setRegistroToEdict, deleteRegistro }) {
  let { client_id, name, description, active, id } = registro; //Destructuramos
  return (
    <tr>
      <td>{client_id}</td>
      <td>{name}</td>
      <td>{description}</td>
      <td>{active ? "Yes" : "No"}</td>
      <td>
        <button
          onClick={() => {
            setRegistroToEdict(registro); //!Deja de ser NULL
          }}
        >
          Edit
        </button>
        <button
          onClick={() => {
            deleteRegistro(id);
          }}
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

export default CrudTableRow;
