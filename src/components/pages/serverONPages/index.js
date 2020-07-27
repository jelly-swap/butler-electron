import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import Terminal from './terminal';
import BalanceOf from './balanceOf';

import { useChannel } from '../../../hooks/useChannel';

const MAX_LOGS = 9999;
const LOGS_TO_REMOVE = 1000;

const ServerONPages = () => {
  const [terminalData, setTerminalData] = useState([
    {
      now: new Date().toISOString().substring(0, 19).replace('T', ' '),
      info: 'Loading...',
      id: uuidv4(),
    },
  ]);

  const { data } = useChannel('data');

  useEffect(() => {
    const now = new Date().toISOString().substring(0, 19).replace('T', ' ');

    const log = {
      now,
      info: data,
      id: uuidv4(),
    };

    setTerminalData(terminalData => [...terminalData, log]);
  }, [data]);

  useEffect(() => {
    if (terminalData.length === MAX_LOGS) {
      const dataRef = [...terminalData];

      dataRef.splice(0, LOGS_TO_REMOVE);

      setTerminalData(dataRef);
    }
  }, [terminalData]);

  return (
    <>
      <Route exact path='/terminal' component={() => <Terminal terminalData={terminalData} />} />
      <Route exact path='/balanceOf' component={() => <BalanceOf />} />
    </>
  );
};

export default ServerONPages;
