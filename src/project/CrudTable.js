import React from "react";
import CrudTableRow from "./CrudTableRow";
import "../stylies/ComponentTable.css";

function CrudTable({ dataProjects, setRegistroToEdict, deleteRegistro }) {
  console.log(dataProjects);
  return (
    <div>
      <h4>Project's Data</h4>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Project's Name</th>
            <th>Project's Client</th>
            <th>Project's Description</th>
            <th>Actve</th>
            <th>Accions</th>
          </tr>
        </thead>

        <tbody>
          {dataProjects.length === 0 ? (
            <tr>
              <td colSpan="6">Without Projects</td>
            </tr>
          ) : (
            dataProjects.map((el) => (
              <CrudTableRow
                key={el.id}
                projectRegister={el}
                setRegistroToEdict={setRegistroToEdict}
                deleteRegistro={deleteRegistro}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CrudTable;
