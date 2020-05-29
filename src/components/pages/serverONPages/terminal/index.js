import React, { useEffect } from 'react';
import Terminal from 'terminal-in-react';

import './style.scss';

// 📕: error message
// 📙: warning message
// 📗: ok status message
// 📘: action message
// 📓: canceled status message
// 📔: Or anything you like and want to recognize immediately by color

const MESSAGE_COLORS = {
  ERROR: '📕',
  WARNING: '📙',
  INFO: '📗',
  ACTION: '📘',
  CANCELED: '📓',
  DEFAULT: '📔',
};

const JellyTerminal = ({ terminalData }) => {
  useEffect(() => {
    terminalData.forEach(log => {
      const { now, info } = log;

      if (!info) return;

      const idxOfDblDots = info.indexOf(':');

      const color = idxOfDblDots !== -1 ? info.split(':')[0] : 'DEFAULT';

      console.log(`${MESSAGE_COLORS[color]} ${now} ${info.replace(/INFO|ERROR/, '')}`);
    });
  }, [terminalData]);

  return (
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
  );
};

export default JellyTerminal;
