const createRegistro = (URL, registro, setLoading, setterDB, setError, msg) => {
  //Parametro registro es el obj registro del from.
  let options = {
    method: "POST",
    body: JSON.stringify(registro), //!aca va el registro  a postear
    headers: {
      "content-type": "application/json",
      // acept: "application/json",
    },
  };
  setLoading(true);
  fetch(URL, options)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      console.log(setterDB, json);
      setterDB((prev) => [...prev, json]);
      console.log(`${msg}${json}`);
      setLoading(false);
    })
    .catch((err) => {
      setError(err);
    });
};

//*Metodo llamado por Hijo <FormCrud.js oyente de onSubmit
const updateRegistro = (
  URL_ID,
  registro,
  EntityDB,
  setterDB,
  setError,
  setLoading,
  msg
) => {
  //?Recorremos cada obj de Array clientsDB, cuando halle la coincidencia de ID, le asignara el registro EDITADO a ese ID, que le pertenece y se hace la actualizacion de info de ese registro..

  let options = {
    method: "PUT",
    body: JSON.stringify(registro),
    headers: {
      "content-type": "application/json",
      acept: "application/json",
    },
  };
  setLoading(true);
  fetch(URL_ID, options)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      let newDB = EntityDB.map((el) => (el.id === json.id ? json : el));
      setterDB(newDB);
      console.log(`${msg}${json}`);
      setLoading(false);
    })
    .catch((err) => {
      setError(err);
    });
};

//*Metodo llamado por hijo < CrudTable.js oyente con el boton "Eliminar"
const deleteRegistro = (URL_ID, id, entityDB, setterDB, setError, msg) => {
  let isDelete = window.confirm(`Desea borrar el registro con ID = ${id}`);
  if (isDelete) {
    let options = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        //acept: "application/json",
      },
    };
    fetch(URL_ID, options)
      .then((res) => (res.ok ? res.text() : Promise.reject(res)))
      .then((json) => {
        let newDB = entityDB.filter((el) => el.id !== id);
        setterDB(newDB);
        console.log(`${msg} ${json}`);
      })
      .catch((err) => {
        setError(err);
      });
  } else {
    return;
  }
};

export { createRegistro, updateRegistro, deleteRegistro };
