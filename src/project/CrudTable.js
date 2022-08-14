import React from "react";
import CrudTableRow from "./CrudTableRow";

function CrudTable({ data, setRegistroToEdict, deleteRegistro }) {
  return (
    <div>
      <h3>Datos del Usuario</h3>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Comentario</th>
            <th>Pais</th>
            <th>Forma de Pago</th>
            <th>Terminos</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="6">Sin datos</td>
            </tr>
          ) : (
            data.map((el) => (
              <CrudTableRow
                key={el.id}
                registro={el}
                setRegistroToEdict={setRegistroToEdict}
                deleteRegistro={deleteRegistro} //?PUDO HABER SIDO ASI TAMB deleteRegistro(el.id) PASANDOLE DE UNA EL ID DEL ELEMENTO
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CrudTable;
