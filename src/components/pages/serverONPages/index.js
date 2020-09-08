import React, { useState, useEffect } from 'react';

import { Route } from 'react-router-dom';

import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

import Terminal from './terminal';
import BalanceOf from './balanceOf';

import { useChannel } from '../../../hooks/useChannel';
import { useBalanceTable } from '../../../hooks/useBalanceTable';
const { ipcRenderer } = window.require('electron');

const ALLOWED_MESSAGES = ['DATA', 'ERROR'];
const MAX_LOGS = 9999;
const LOGS_TO_REMOVE = 1000;

const getCurrentDate = () => moment().format('MMM Do YYYY h:mm:s A');
const getMessageType = message => message?.indexOf(':') !== -1 && message?.split(':')[0];

const ServerONPages = () => {
  const [terminalData, setTerminalData] = useState([
    { now: getCurrentDate(), info: ': Loading...', id: uuidv4(), msgType: 'DATA' },
  ]);
  const [isServerStarted, setIsServerStarted] = useState(false);

  const { data } = useChannel('data');

  useEffect(() => {
    const checkIfAlive = () => {
      ipcRenderer.send('butler-alive');
    };

    setInterval(() => {
      checkIfAlive();
    }, 60000);
  }, []);

  useEffect(() => {
    ipcRenderer.on('butler-died', (__message, { globalConfig }) => {
      setTerminalData(terminalData => [
        ...terminalData,
        { now: getCurrentDate(), info: ': Restarting...', id: uuidv4(), msgType: 'DATA' },
      ]);

      ipcRenderer.send('start-butler', globalConfig);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const messageType = getMessageType(data);

    if (ALLOWED_MESSAGES.includes(messageType)) {
      const now = getCurrentDate();

      if (data.includes('Server started on port')) {
        setIsServerStarted(true);
      }

      const log = { now, info: data, msgType: messageType, id: uuidv4() };

      setTerminalData(terminalData => [...terminalData, log]);
    }
  }, [data, setIsServerStarted]);

  useEffect(() => {
    if (terminalData.length === MAX_LOGS) {
      const dataRef = [...terminalData];

      dataRef.splice(0, LOGS_TO_REMOVE);

      setTerminalData(dataRef);
    }
  }, [terminalData]);

  const tableData = useBalanceTable(isServerStarted);

  return (
    <>
      <Route exact path='/terminal' component={() => <Terminal terminalData={terminalData} />} />
      <Route exact path='/balanceOf' component={() => <BalanceOf tableData={tableData} />} />
    </>
  );
};

export default ServerONPages;
