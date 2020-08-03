import React from 'react';

import LogData from './logData';

import './style.scss';

const JellyTerminal = ({ terminalData }) => {
  return <LogData terminalData={terminalData} />;
};

export default JellyTerminal;
