import React, { useEffect } from 'react';
import Terminal from 'terminal-in-react';

import LogFilter from './logFilter';

import './style.scss';

// 📕: error message
// 📙: warning message
// 📗: ok status message
// 📘: action message
// 📓: canceled status message
// 📔: Or anything you like and want to recognize immediately by color

const MESSAGE_TYPES = {
  ERROR: '📕',
  WARN: '📙',
  INFO: '📗',
  ACTION: '📘',
  CANCELED: '📓',
  DEFAULT: '📔',
};

const JellyTerminal = ({ terminalData, selectedLogFilters, onLogFilterSelected }) => {
  useEffect(() => {
    terminalData.forEach(log => {
      const { now, info } = log;

      if (!info) return;

      const idxOfDblDots = info.indexOf(':');

      const messageType = idxOfDblDots !== -1 ? info.split(':')[0] : 'DEFAULT';

      if (!selectedLogFilters.length) {
        console.log(`${MESSAGE_TYPES[messageType]} ${now} ${info.replace(/INFO|ERROR|WARN/, '')}`);
      } else {
        if (selectedLogFilters.includes(messageType)) {
          console.log(`${MESSAGE_TYPES[messageType]} ${now} ${info.replace(/INFO|ERROR|WARN/, '')}`);
        }
      }
    });
  }, [terminalData, selectedLogFilters]);

  return (
    <>
      <LogFilter selectedLogFilters={selectedLogFilters} onLogFilterSelected={onLogFilterSelected} />

      <div className='terminal-wrapper'>
        <Terminal
          allowTabs={false}
          hideTopBar={true}
          watchConsoleLogging={true}
          color='green'
          backgroundColor='#e4e4e4'
          barColor='#e4e4e4'
          style={{ fontWeight: 'bold', fontSize: '1em', height: '500px' }}
        />
      </div>
    </>
  );
};

// const labelToColor = {
//   Info: 'INFO',
//   Error: 'ERROR',
//   Warning: 'WARN',
// };

// const getFilter = checked => {
//   checked.reduce((c, p) => {
//     if (c.checked) {
//       p[labelToColor[c.name]] = true;
//     }

//     return p;
//   }, {});
// };

export default JellyTerminal;
