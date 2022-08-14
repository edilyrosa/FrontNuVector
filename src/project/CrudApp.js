import React, { useEffect, useState } from "react";
import FormProject from "./FormProject";
import Message from "../helpers/Message";
import Loader from "../helpers/Loader";
import CrudTable from "./CrudTable";

function CrudApp() {
  const [projectsDB, setProjectsDB] = useState(null); //Array ProjectDB from DB
  const [registroToEdict, setRegistroToEdict] = useState(null); //Flag-Project
  //?Para la < CrudTable quien es la que se RENDERIZA continuamente, el <Form no
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  //!Get la BBDD de los projectos
  useEffect(() => {
    setLoading(true); //show loader
    fetch("http://localhost:5000/project") //Do Req
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        console.log(json);
        setProjectsDB(json); //Set the ProjectsDB
        setError(null); // Isn't error
        setLoading(false); //Loader off
      })
      .catch((err) => {
        setProjectsDB(null);
        setError(err);
      });
  }, []);

  //!Postea en la BBDD un project. Metoh executed by son <FormProject.js listener of onSumbit
  const createRegistro = (registro) => {
    //Parametro registro es el obj registro del from.
    //TODO:  registro.id = Date.now(); //Le asignamos un ID guardaremos en clientsDB AUTOMATICO???
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
  const updateRegistro = (registro) => {
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
  const deleteRegistro = (id) => {
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
  return (
    <>
      <h2>CRUD PROJECT</h2>
      <article className="grid-1-2">
        {/* */}
        <FormProject
          createRegistro={createRegistro}
          updateRegistro={updateRegistro}
          registroToEdict={registroToEdict}
          setRegistroToEdict={setRegistroToEdict}
        />

        {loading && <Loader />}
        {error && (
          <Message
            msj={`Error: ${error.status}: ${error.statusText}`}
            bgColor={"#dc3545"}
          />
        )}
        {projectsDB && (
          <CrudTable
            setRegistroToEdict={setRegistroToEdict}
            deleteRegistro={deleteRegistro}
            dataProjects={projectsDB}
          />
        )}
      </article>
    </>
  );
}

export default CrudApp;
