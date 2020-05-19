import { useState, useEffect, useRef } from 'react';

const { ipcRenderer } = window.require('electron');

export const useChannel = channel => {
  const renderedRef = useRef();
  const [data, setData] = useState();

  useEffect(() => {
    renderedRef.current = true;

    ipcRenderer.on(channel, (message, args) => {
      if (renderedRef.current) {
        setData(args);
      }
    });

    return () => {
      renderedRef.current = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data };
};
