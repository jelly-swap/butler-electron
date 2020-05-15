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
        console.log();
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

        console.log(response);

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
