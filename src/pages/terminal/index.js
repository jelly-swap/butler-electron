import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

import LogData from './logData';

import { useChannel } from '../../hooks/useChannel';

import './style.scss';

const JellyTerminal = () => {
  const [terminalData, setTerminalData] = useState([INIT_STATE]);

  const { data } = useChannel('data');

  // useEffect(() => {
  // const messageType = getMessageType(data);

  // if (ALLOWED_MESSAGES.includes(messageType)) {
  //   const now = getCurrentDate();

  //   // if (data.includes('Server started on port')) {
  //   //   setIsServerStarted(true);
  //   // }

  //   const log = { now, info: data, msgType: messageType, id: uuidv4() };

  //   setTerminalData(terminalData => [...terminalData, log]);
  // }
  // }, [data, setIsServerStarted]);
  // }, [data]);

  useEffect(() => {
    if (terminalData.length === MAX_LOGS) {
      const dataRef = [...terminalData];

      dataRef.splice(0, LOGS_TO_REMOVE);

      setTerminalData(dataRef);
    }
  }, [terminalData]);

  return <LogData terminalData={terminalData} />;
};

const getCurrentDate = () => moment().format('MMM Do YYYY h:mm:s A');
const getMessageType = message => message?.indexOf(':') !== -1 && message?.split(':')[0];

const INIT_STATE = { now: getCurrentDate(), info: ': Loading...', id: uuidv4(), msgType: 'DATA' };
const ALLOWED_MESSAGES = ['DATA', 'ERROR'];
const MAX_LOGS = 9999;
const LOGS_TO_REMOVE = 1000;

export default JellyTerminal;
