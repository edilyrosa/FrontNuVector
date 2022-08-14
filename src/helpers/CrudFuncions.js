const createRegistro = (
  registro,
  setLoading,
  setProjectsDB,
  projectsDB,
  setError
) => {
  //Parametro registro es el obj registro del from.
  let options = {
    method: "POST",
    body: JSON.stringify(registro), //!aca va el registro  a postear
    headers: {
      "content-type": "application/json",
      // acept: "application/json",
    },
  };
  setLoading(true); //Pinto el loader
  fetch("http://localhost:5000/project", options)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      setProjectsDB([...projectsDB, json]);
      console.log(`Has sent the Project ${json}`);
    })
    .catch((err) => {
      setError(err);
    });
};

//*Metodo llamado por Hijo <FormCrud.js oyente de onSubmit
const updateRegistro = (registro, projectsDB, setProjectsDB, setError) => {
  //Parametro registro es el obj de info inputs a EDITAR.
  //?Recorremos cada obj de Array clientsDB, cuando halle la coincidencia de ID, le asignara el registro EDITADO a ese ID, que le pertenece y se hace la actualizacion de info de ese registro..

  let options = {
    method: "PUT",
    body: JSON.stringify(registro), //!aca va el registro  a postear
    headers: {
      "content-type": "application/json",
      //acept: "application/json",
    },
  };
  fetch(`http://localhost:5000/project/${registro.id}`, options)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      let newProjectDB = projectsDB.map((el) =>
        el.id === json.id ? json : el
      );
      setProjectsDB(newProjectDB);
      console.log(`Has updated the Project ${json}`);
    })
    .catch((err) => {
      setError(err);
    });
};

//*Metodo llamado por hijo < CrudTable.js oyente con el boton "Eliminar"
const deleteRegistro = (id, projectsDB, setProjectsDB, setError) => {
  let isDelete = window.confirm(`Desea borrar el registro con ID = ${id}`);
  if (isDelete) {
    let options = {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        //acept: "application/json",
      },
    };
    fetch(`http://localhost:5000/project/${id}`, options)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        let newProjectDB = projectsDB.filter((el) => el.id !== id);
        setProjectsDB(newProjectDB);
        console.log(`Has DETELE the Project ${json}`);
      })
      .catch((err) => {
        setError(err);
      });
  } else {
    return;
  }
};

export { createRegistro, updateRegistro, deleteRegistro };
