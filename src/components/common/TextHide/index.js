import React from 'react';

export default ({ display, callback }) => {
  if (display) {
    return (
      <span>
        <i className='fas fa-eye-slash' onClick={() => callback()} />
      </span>
    );
  }

  return (
    <span title='Reveal secret key' onClick={() => callback()}>
      <i className='fas fa-eye' />
    </span>
  );
};
