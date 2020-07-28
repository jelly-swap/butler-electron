import React, { useRef, useEffect } from 'react';

import Log from './log';

export default ({ terminalData, selectedLogFilters }) => {
  const logsWrapperRef = useRef();
  const isScrollAtBottomRef = useRef(true);

  useEffect(() => {
    if (!logsWrapperRef.current) return;

    if (!isScrollAtBottomRef.current) return;

    logsWrapperRef.current.scrollTop = logsWrapperRef.current.scrollHeight;
  }, [terminalData]);

  const handleOnScroll = event => {
    event.persist();

    const {
      target: { scrollTop, clientHeight, scrollHeight },
    } = event;

    isScrollAtBottomRef.current = scrollTop + clientHeight === scrollHeight;
  };

  return (
    <div ref={logsWrapperRef} onScroll={handleOnScroll} className='logs-wrapper'>
      {terminalData.map(log => (
        <Log key={log.id} log={log} selectedLogFilters={selectedLogFilters} />
      ))}
    </div>
  );
};
