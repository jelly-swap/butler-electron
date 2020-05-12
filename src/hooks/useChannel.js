import { useEffect, useRef } from 'react';

const { ipcRenderer } = window.require('electron');

export const useChannel = (channel, setState) => {
  const renderedRef = useRef();

  useEffect(() => {
    renderedRef.current = true;

    ipcRenderer.on(channel, (message, args) => {
      console.log(renderedRef.current);
      if (renderedRef.current) {
        const now = new Date().toISOString().substring(0, 19).replace('T', ' ');

        setState(`${now} ${args} \n`);
      }
    });

    return () => {
      renderedRef.current = false;
    };
  }, []);
};
