import axios from 'axios';
import { useEffect, useState, useRef } from 'react';

const BASE_URL = 'http://localhost:9000';

export const useHttpGet = endPoint => {
  const isRendered = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();

  useEffect(() => {
    isRendered.current = true;

    const getData = async () => {
      try {
        const response = await axios.get(BASE_URL + endPoint, {
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        });
        // const response = await fetch(BASE_URL + endPoint, {
        //   headers: {
        //     'Access-Control-Allow-Origin': '*',
        //   },
        // });

        // axios.get(BASE_URL + endPoint, {
        //   headers: {
        //     'Access-Control-Allow-Origin': '*',
        //   }
        // })

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
    data,
  };
};
