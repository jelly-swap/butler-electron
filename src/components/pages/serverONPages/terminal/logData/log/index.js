import React from 'react';

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

export default ({ log, selectedLogFilters }) => {
  const { info, now } = log;

  if (!info) {
    return null;
  }

  const idxOfDblDots = info.indexOf(':');
  const messageType = idxOfDblDots !== -1 ? info.split(':')[0] : 'DEFAULT';

  return !selectedLogFilters.length ? (
    <div className='log'>{`${MESSAGE_TYPES[messageType]} ${now} ${info.replace(/INFO|ERROR|WARN/, '')}`}</div>
  ) : (
    selectedLogFilters.includes(messageType) && (
      <div className='log'>{`${MESSAGE_TYPES[messageType]} ${now} ${info.replace(/INFO|ERROR|WARN/, '')}`}</div>
    )
  );
};
