import React, { useState, useEffect } from 'react';
import Terminal from 'terminal-in-react';

import { useChannel } from '../../../hooks/useChannel';

import './style.scss';

const JellyTerminal = () => {
  const [data, setData] = useState('');

  useChannel('data', setData);

  useEffect(() => {
    console.log(data);
  }, [data]);

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
