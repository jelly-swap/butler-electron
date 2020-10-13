import React from 'react';

export default ({ display, callback }) => {
  if (display) {
    return (
      <span className="fa-eye-container">
        <i className='fas fa-eye-slash' onClick={() => callback()} />
      </span>
    );
  }

  return (
    <span className="fa-eye-container" title='Reveal secret key' onClick={() => callback()}>
      <i className='fas fa-eye' />
    </span>
  );
};
