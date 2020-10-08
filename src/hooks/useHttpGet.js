import axios from 'axios';
import { useEffect, useState, useRef } from 'react';

export const useHttpGet = (endPoint, isServerStarted, isPeriodically) => {
  const isRendered = useRef();
  const timerRef = useRef();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();


  // TODO: FIX THIs
  const PORT = 100;

  const BASE_URL = useRef(`http://localhost:${PORT}`);

  useEffect(() => {
    if (!isServerStarted) {
      return;
    }

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

    if (isPeriodically) {
      timerRef.current = setInterval(() => {
        getData();
      }, 10000);
    }

    return () => {
      isRendered.current = false;
      clearInterval(timerRef.current);
    };
  }, [endPoint, isServerStarted, isPeriodically]);

  return {
    isLoading,
    data,
  };
};
