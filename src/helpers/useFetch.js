import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const abortController = new AbortController(); //!If the API doesnt answer, We'll abort the req
    const signal = abortController.signal;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url);
        //!Error
        if (!res.ok) {
          let err = new Error("Fetch failed");
          err.status = res.status || "00";
          err.statusText = res.statusText || "Error: Fetch failed.";
          throw err;
        }
        //?Success
        const json = await res.json();
        if (!signal.aborted) {
          setData(json);
          setError(null);
        }
      } catch (error) {
        if (!signal.aborted) {
          setData(null);
          setError(true);
        }
      } finally {
        if (!signal.aborted) setLoading(false);
      }
    };

    fetchData();
    return () => abortController.abort();
  }, [url]);
  return { data, error, loading };
};
