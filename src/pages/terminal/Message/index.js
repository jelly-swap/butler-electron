import React from 'react';

const MESSAGE_TYPES = { error: '📕', data: '📗' };

export default ({ level, message }) => {
  return <div className='log'>{`${MESSAGE_TYPES[level]} ${message}`}</div>;
};
