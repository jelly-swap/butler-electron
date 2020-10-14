import React from 'react';
import Button from '../common/Button';

import { useLogger } from '../../context/LoggerContext';
import './_style.scss';

export default () => {
  const [, updateLogger, clearLogger] = useLogger();

  const handleOnClick = () => {
    clearLogger();
    updateLogger({
      level: 'data',
      timestamp: new Date().toLocaleString(),
      msg: 'Logs cleared.',
    });
  };

  return <Button className='clear-logs-button' color='red' content='Clear logs' onClick={handleOnClick} />;
};
