import React from 'react';

import Logo from '../../../images/jelly-sad.png';

import './_style.scss';

export default () => {
  return (
    <div className='empty-page-wrapper'>
      <h3 className='caption'>Butler is not active</h3>
      <p>You need to start Butler</p>
      <div className='image-wrapper'>
        <img src={Logo} alt={'Sad Jelly'} />
      </div>
    </div>
  );
};
