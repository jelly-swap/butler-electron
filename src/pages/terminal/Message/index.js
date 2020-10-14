import React from 'react';

import './_style.scss';

const MESSAGE_TYPES = { error: '📕', data: '📗' };

export default ({ level, message, timestamp }) => {
  return (
    <div className={`log ${level}`}>
      <span>{MESSAGE_TYPES[level]}</span>
      <span className='message-timestamp'>{timestamp}</span>
      {message}
    </div>
  );
};
