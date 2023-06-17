import { AxiosServices } from "@/services";
import { AxiosError, AxiosResponse } from "axios";
import React, { useState } from "react";

type Methods = "get" | "post" | "put" | "delete" | "patch";

const useFectch = <T>(
  api: string,
  method: Methods,
  body: any = {},
  parameters: any = {}
)=> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isError, setIsError] = useState(false)

  React.useEffect(() => {
    if (api && method) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api, method]);

  const fetchData = React.useCallback(async () => {
    setLoading(true);
    try {
      let respuesta: AxiosResponse;
      if (method === "get") {
        respuesta = await AxiosServices.get(api, parameters);
      } else {
        respuesta = await AxiosServices.post(api, body);
      }
      const { data } = respuesta;
      setData((prevData: any) => {
        return data;
      });
    } catch (error) {
      setIsError(true)
      console.log(error);
      
      const { response } = error as AxiosError;
      if (response) {
        const { message } = response.data as { message: string };
        setError((prevError: string | null) => {
          return message || "";
        });
      } else {
        setError("Error de conexión con el servidor");
      }
    } finally {
      setLoading(false);
 
      
    }


  }, [api, method, body, parameters]);

  return { data, loading, error, isError };
};

export default useFectch;
