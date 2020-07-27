import React, { useRef, useEffect } from 'react';

import Log from './log';

export default ({ terminalData, selectedLogFilters }) => {
  const logsWrapperRef = useRef();

  useEffect(() => {
    if (!logsWrapperRef.current) return;

    logsWrapperRef.current.scrollTop = logsWrapperRef.current.scrollHeight;
  }, [terminalData]);

  return (
    <div ref={logsWrapperRef} className='logs-wrapper'>
      {terminalData.map(log => (
        <Log key={log.id} log={log} selectedLogFilters={selectedLogFilters} />
      ))}
    </div>
  );
};
