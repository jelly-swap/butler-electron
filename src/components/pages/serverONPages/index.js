import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';

import Terminal from './terminal';
import BalanceOf from './balanceOf';

import { useChannel } from '../../../hooks/useChannel';

const ServerONPages = () => {
  const [terminalData, setTerminalData] = useState(['Loading...']);

  const { data } = useChannel('data');

  useEffect(() => {
    setTerminalData(terminalData => [...terminalData, data]);
  }, [data]);

  return (
    <>
      <Route exact path='/terminal' component={() => <Terminal terminalData={terminalData} />} />
      <Route exact path='/balanceOf' component={() => <BalanceOf />} />
    </>
  );
};

export default ServerONPages;
