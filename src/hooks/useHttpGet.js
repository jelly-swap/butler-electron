import axios from 'axios';
import { useEffect, useState, useRef } from 'react';
import { useServerPort } from '../context/ServerPortContext';

export const useHttpGet = endPoint => {
  const isRendered = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  const { PORT } = useServerPort();

  const BASE_URL = useRef(`http://localhost:${PORT}`);

  useEffect(() => {
    isRendered.current = true;

    const getData = async () => {
      try {
        const response = await axios.get(BASE_URL.current + endPoint, {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        });

        setData(response.data);

        setIsLoading(false);
      } catch (err) {
        console.log(`error getting data, endpoint: ${endPoint}`, err);
      }
    };

    getData();

    return () => {
      isRendered.current = false;
    };
  }, [endPoint]);

  return {
    isLoading,
    data,
  };
};
