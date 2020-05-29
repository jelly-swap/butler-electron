import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

import Terminal from './terminal';
import BalanceOf from './balanceOf';

import { useChannel } from '../../../hooks/useChannel';

const ServerONPages = () => {
  const [terminalData, setTerminalData] = useState([
    {
      now: new Date().toISOString().substring(0, 19).replace('T', ' '),
      info: 'Loading...',
    },
  ]);

  const { data } = useChannel('data');

  useEffect(() => {
    const now = new Date().toISOString().substring(0, 19).replace('T', ' ');

    const log = {
      now,
      info: data,
    };

    setTerminalData(terminalData => [...terminalData, log]);
  }, [data]);

  return (
    <>
      <Route exact path='/terminal' component={() => <Terminal terminalData={terminalData} />} />
      <Route exact path='/balanceOf' component={() => <BalanceOf />} />
    </>
  );
};

export default ServerONPages;
