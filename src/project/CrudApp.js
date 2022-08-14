import React, { useEffect, useState } from "react";
import { helpHttp } from "../helpers/HelpHttp";
import FormProject from "./FormProject";
import Message from "../helpers/Message";
import Loader from "../helpers/Loader";
import CrudTable from "./CrudTable";

function CrudApp({ form: FormComponent }) {
  const [BBDD, setBBDD] = useState(null); //Comprende un array de objs
  const [clients, setClients] = useState([]); //!TRAERME registros clients
  const [registroToEdict, setRegistroToEdict] = useState(null);
  //?Para la < CrudTable quien es la que se RENDERIZA continuamente, el <Form no
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  let api = helpHttp();
  let urlProjects = "http://localhost:5000/project";
  let urlClients = "http://localhost:3000/api/ApiFake.json"; //todo: debe ser clients

  useEffect(() => {
    setLoading(true); //Pinto el loader
    helpHttp()
      .get(urlClients)
      .then((res) => {
        //Ya viene en TDD Json
        //Obtengo la res exitosa o no
        if (!res.err) {
          //err es una bandera de error = true
          setBBDD(res); //obj res exitoso y la meto en BBDD
          setError(null); //No hay error
        } else {
          setBBDD(null);
          setError(res);
        }
        setLoading(false); //!lo cierro aca, antes de saalir del then() asincrono. La  cerrada del lauder se dara cuando se obtenga la respuesta q es TARDIA, exitosa o no, pq si no hago depues, seria una accion sincrona, se borraria el loader antes de obtener la promesa.
      });
  }, [urlProjects]);

  useEffect(() => {
    setLoading(true); //Pinto el loader

    helpHttp()
      .get(urlClients)
      .then((res) => {
        //Ya viene en TDD Json
        //Obtengo la res exitosa o no
        if (!res.err) {
          //err es una bandera de error = true
          setClients(res); //obj res exitoso y la meto en BBDD
          setError(null); //No hay error
        } else {
          setClients(null);
          setError(res);
        }
        setLoading(false); //!lo cierro aca, antes de saalir del then() asincrono. La  cerrada del lauder se dara cuando se obtenga la respuesta q es TARDIA, exitosa o no, pq si no hago depues, seria una accion sincrona, se borraria el loader antes de obtener la promesa.
      });
  }, [urlClients]);

  //*Metodo llamado por hijo <FormCrud.js oyente de onSumbit
  const createRegistro = (registro) => {
    //Parametro registro es el obj de info inputs.
    registro.id = Date.now(); //Le asignamos un ID guardaremos en BBDD
    let options = {
      body: registro,
      headers: { "content-type": "application/json" },
    };
    api.post(urlProjects, options).then((res) => {
      console.log(res);
      res.err ? setError(res) : setBBDD([...BBDD, res]);
      //!Si existe en true la propiedad err del obj res, es pq hay un error, el cual se pintara en el componente <Mensaje
      //? Si no existe err=true, mesclamos la BBDD con la res promesa del fetch del metodo post().
    });
  };

  //*Metodo llamado por Hijo <FormCrud.js oyente de onSubmit
  const updateRegistro = (registro) => {
    //Parametro registro es el obj de info inputs a EDITAR.
    //?Recorremos cada obj de Array BBDD, cuando halle la coincidencia de ID, le asignara el registro EDITADO a ese ID, que le pertenece y se hace la actualizacion de info de ese registro..

    let endPoint = `${urlProjects}/${registro.id}`;
    let options = {
      body: registro,
      headers: { "content-type": "application/json" },
    };
    api.put(endPoint, options).then((res) => {
      let nuevaBBDD = BBDD.map((el) => (el.id === res.id ? res : el));
      res.err ? setError(res) : setBBDD(nuevaBBDD);
    });
  };

  //*Metodo llamado por hijo < CrudTable.js oyente con el boton "Eliminar"
  const deleteRegistro = (id) => {
    let isDelete = window.confirm(`Desea borrar el registro con ID = ${id}`);
    if (isDelete) {
      let endPoind = `${urlProjects}/${id}`;
      let options = {
        headers: { "content-type": "application/json" },
      };
      api.del(endPoind, options).then((res) => {
        let nuevaBBDD = BBDD.filter((el) => el.id !== id);
        res.err ? setError(res) : setBBDD(nuevaBBDD);
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
        <FormComponent
          create={createRegistro}
          update={updateRegistro}
          recordToEdit={registroToEdict}
          setRecordToEdit={setRegistroToEdict}
        />

        {loading && <Loader />}
        {error && (
          <Message
            msj={`Error: ${error.status}: ${error.statusText}`}
            bgColor={"#dc3545"}
          />
        )}
        {BBDD && (
          <CrudTable
            BBDD={BBDD}
            setRegistroToEdict={setRegistroToEdict}
            deleteRegistro={deleteRegistro}
          />
        )}
      </article>
    </>
  );
}

export default CrudApp;
