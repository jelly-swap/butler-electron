import React from 'react';

import { useApp } from '../../../context/AppContext';

export default ({ display, callback }) => {
  const [app] = useApp();

  if (!app.isVisibleSecret) return null;

  if (display) {
    return (
      <span className='fa-eye-container'>
        <i className='fas fa-eye-slash' onClick={() => callback()} />
      </span>
    );
  }

  return (
    <span className='fa-eye-container' title='Reveal secret key' onClick={() => callback()}>
      <i className='fas fa-eye' />
    </span>
  );
};
