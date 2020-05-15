import axios from 'axios';
import { useEffect, useState, useRef } from 'react';

const BASE_URL = 'localhost:9000';

export const useHttpGet = endPoint => {
  const isRendered = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    isRendered.current = true;

    const getData = async () => {
      try {
        console.log();
        // const response = await axios.get(BASE_URL + endPoint);
        const response = await fetch(BASE_URL + endPoint);
        const data = await response.json();

        console.log(data);

        setIsLoading(false);

        console.log(response);
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
    data,
  };
};
