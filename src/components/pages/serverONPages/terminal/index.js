import React, { useState } from 'react';

import LogFilter from './logFilter';
import LogData from './logData';

import './style.scss';

const JellyTerminal = ({ terminalData }) => {
  const [selectedLogFilters, setSelectedLogFilters] = useState([]);

  const onLogFilterSelected = selectedFilter => {
    selectedLogFilters.includes(selectedFilter)
      ? setSelectedLogFilters(selectedLogFilters.filter(f => f !== selectedFilter))
      : setSelectedLogFilters([...selectedLogFilters, selectedFilter]);
  };

  return (
    <>
      <LogFilter selectedLogFilters={selectedLogFilters} onLogFilterSelected={onLogFilterSelected} />

      <LogData terminalData={terminalData} selectedLogFilters={selectedLogFilters} />
    </>
  );
};

export default JellyTerminal;
