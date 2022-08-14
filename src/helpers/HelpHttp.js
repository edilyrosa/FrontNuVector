export const helpHttp = () => {
  const custumFetch = (endPoint, options) => {
    const defaultHeader = {
      accept: "application/json",
    };
    //Manejador de errores para cancelar la peticion si el servidor de la API REST esta caido. evitando que el louder este eternamente, dando vueltas, esperando. envia el flujo al catch() del fetch()
    const controller = new AbortController();
    options.signal = controller.signal;

    options.method = options.method || "GET";
    options.headers = options.headers
      ? { ...defaultHeader, ...options.headers }
      : defaultHeader;

    options.body = JSON.stringify(options.body) || false;
    if (!options.body) delete options.body;

    //console.log(options);

    setTimeout(() => {
      controller.abort();
    }, 3000); //Esto genera el catch() del fetch()

    return fetch(endPoint, options).then((res) =>
      res.ok
        ? res.json()
        : Promise.reject({
            err: true, //!bandera, si este propiedad existe es pq ocurrio un ERROR y no haremos el CRUD sino mostraremos el error
            status: res.status || "Ocurrio un Error",
            statusText: res.statusText || "404",
          }).catch((err) => err)
    );
  };
  const get = (url, options = {}) => custumFetch(url, options);
  const post = (url, options = {}) => {
    options.method = "POST";
    return custumFetch(url, options);
  };

  const put = (url, options = {}) => {
    options.method = "PUT";
    return custumFetch(url, options);
  };

  const del = (url, options = {}) => {
    options.method = "DELETE";
    return custumFetch(url, options);
  };

  return {
    get,
    post,
    put,
    del,
  };
};
