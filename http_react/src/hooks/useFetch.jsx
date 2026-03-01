import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [config, setConfig] = useState(null);
  const [method, setMethod] = useState(null);
  const [callFetch, setCallFetch] = useState(null);
  const [id, setId] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingRequest, setLoadingRequest] = useState(false);
  const [error, setError] = useState(null);

  const httpConfig = (data, method) => {
    if (method === "POST") {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setMethod(method);
    }

    if (method === "DELETE") {
      setConfig({
        method,
      });

      setId(data);
      setMethod(method);
    }

    if (method === "PUT") {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setId(data.id);
      setMethod(method);
    }

    if (method === "PATCH") {
      setConfig({
        method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      setId(data.id);
      setMethod(method);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res = await fetch(url);
        const json = await res.json();

        setData(json);
      } catch (error) {
        console.log(error);
        setError("Houve algum erro ao carregar os dados!");
      }

      setLoading(false);
    };

    fetchData();
  }, [url, callFetch]);

  useEffect(() => {
    const httpRequest = async () => {
      let json;
      try {
        setLoading(true);
        setLoadingRequest(true);

        if (method === "POST") {
          let fetchOptions = [url, config];
          const res = await fetch(...fetchOptions);
          json = await res.json();
        }

        if (method === "DELETE" || method === "PUT" || method === "PATCH") {
          const urlWithId = `${url}/${id}`;
          const res = await fetch(urlWithId, config);
          json = await res.json();
        }

        setLoadingRequest(false);
        setCallFetch(json);
      } catch (error) {
        console.log(error);
        setError("Erro ao executar requisição!");
      }
    };

    httpRequest();
  }, [config, method, url]);

  return { data, httpConfig, loading, loadingRequest, error };
};
