import React, { useEffect } from 'react';
import Terminal from 'terminal-in-react';

import './style.scss';

const JellyTerminal = ({ terminalData }) => {
  useEffect(() => {
    for (const info of terminalData) {
      if (info) {
        const now = new Date().toISOString().substring(0, 19).replace('T', ' ');

        console.log(`${now} ${info}`);
      }
    }
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
