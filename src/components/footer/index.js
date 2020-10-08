import React, { useState } from 'react';

import Button from '../common/Button';

import { usePassword } from '../../context/PasswordContext';

import CoinImage from '../../css/background-coins/Coins-button.svg';

import './style.scss';

export default () => {
  const buttonHandler = () => {
    console.log('tuka sam');
  };

  return (
    <div className='footer-wrapper'>
      <Button
        content={
          <>
            <span>Start</span>
            <img src={CoinImage} alt='coin' />
          </>
        }
        onClick={() => buttonHandler()}
      />
    </div>
  );
};
