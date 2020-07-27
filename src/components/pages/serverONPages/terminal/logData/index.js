import React from 'react';

import Log from './log';

export default ({ terminalData, selectedLogFilters }) => (
  <div className='logs-wrapper'>
    {terminalData.map(log => (
      <Log key={log.id} log={log} selectedLogFilters={selectedLogFilters} />
    ))}
  </div>
);
