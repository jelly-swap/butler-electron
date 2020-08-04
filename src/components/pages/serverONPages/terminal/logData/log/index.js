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
  DATA: '📗',
  ACTION: '📘',
  CANCELED: '📓',
  DEFAULT: '📔',
};

export default ({ log }) => {
  const { info, now, msgType } = log;
  return (
    info && (
      <div className='log'>{`${MESSAGE_TYPES[msgType]} ${now} ${info.replace(
        new RegExp('\\b' + msgType + '\\b'),
        '',
      )}`}</div>
    )
  );
};
