import React from 'react';

import JELLY from '../../../images/logo.png';

import './style.scss';

export default ({ isValid, children, className }) => {
  return !isValid ? (
    <div className={`jelly-icon-wrapper ${className}`}>
      <div className='logo-wrapper'>
        <img src={JELLY} alt='jelly-icon' />
      </div>
      <div className='jelly-icon-content-wrapper'>{children}</div>
    </div>
  ) : null;
};
