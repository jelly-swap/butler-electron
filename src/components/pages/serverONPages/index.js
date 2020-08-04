import React, { useState, useEffect } from 'react';

import { Route } from 'react-router-dom';

import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import Terminal from './terminal';
import BalanceOf from './balanceOf';

import { useChannel } from '../../../hooks/useChannel';
import { useBalanceTable } from '../../../hooks/useBalanceTable';

const ALLOWED_MESSAGES = ['DATA', 'ERROR'];
const MAX_LOGS = 9999;
const LOGS_TO_REMOVE = 1000;

const getCurrentDate = () => moment().format('MMM Do YYYY h:mm:s A');
const getMessageType = message => message?.indexOf(':') !== -1 && message?.split(':')[0];

const ServerONPages = () => {
  const [terminalData, setTerminalData] = useState([
    { now: getCurrentDate(), info: ': Loading...', id: uuidv4(), msgType: 'DATA' },
  ]);

  const { data } = useChannel('data');

  useEffect(() => {
    const messageType = getMessageType(data);

    if (ALLOWED_MESSAGES.includes(messageType)) {
      const now = getCurrentDate();

      const log = { now, info: data, msgType: messageType, id: uuidv4() };

      setTerminalData(terminalData => [...terminalData, log]);
    }
  }, [data]);

  useEffect(() => {
    if (terminalData.length === MAX_LOGS) {
      const dataRef = [...terminalData];

      dataRef.splice(0, LOGS_TO_REMOVE);

      setTerminalData(dataRef);
    }
  }, [terminalData]);

  const tableData = useBalanceTable();

  return (
    <>
      <Route exact path='/terminal' component={() => <Terminal terminalData={terminalData} />} />
      <Route exact path='/balanceOf' component={() => <BalanceOf tableData={tableData} />} />
    </>
  );
};

export default ServerONPages;
