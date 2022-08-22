const createRecord = (URL, registro, setLoading, setterDB, setError, msg) => {
  let options = {
    method: "POST",
    body: JSON.stringify(registro),
    headers: {
      "content-type": "application/json",
      // acept: "application/json",
    },
  };
  setLoading(true);
  fetch(URL, options)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      setterDB((prev) => [...prev, json]);
      console.log(`${msg}${json}`);
      setLoading(false);
    })
    .catch((err) => {
      setError(err);
    });
};

const updateRecord = (
  URL_ID,
  registro,
  EntityDB,
  setterDB,
  setError,
  setLoading,
  msg
) => {
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

const deleteRecord = (URL_ID, id, entityDB, setterDB, setError, msg) => {
  let isDelete = window.confirm(`Do you want to delete the record-ID = ${id}`);
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

const getOneRecord = (URL_ID, setLoading, setterDB, setError) => {
  let options = {
    headers: {
      "content-type": "application/json",
      // acept: "application/json",
    },
  };
  setLoading(true);
  fetch(URL_ID, options)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      setterDB(json);
      setLoading(false);
    })
    .catch((err) => {
      setError(err);
    });
};

export { createRecord, updateRecord, deleteRecord, getOneRecord };
