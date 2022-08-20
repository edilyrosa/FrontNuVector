import React, { useState, useEffect } from "react";

function useFetch(url) {
  const [datas, setDatas] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        //!Error
        if (!res.ok) {
          let err = new Error("Fetch failed");
          err.status = res.status || "00";
          err.statusText = res.statusText || "Fetch failed. Error 400";
          throw err;
        }
        //?Success
        const json = await res.json();
        if (!signal.aborted) {
          setDatas(json);
          setError(null);
        }
      } catch (error) {
        if (!signal.aborted) setDatas(null);
        setError(true);
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    };

    fetchData();
    return () => abortController.abort();
  }, [url]);
  return { datas, error, loading };
}

export default useFetch;
