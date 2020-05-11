import React from 'react';

import Button from '../common/Button';

import Emitter from '../../utils/emitter';

import CoinImage from '../../css/background-coins/Coins-button.svg';

import './style.scss';

const Footer = () => {
  return (
    <div className='footer-wrapper'>
      <Button
        btnText={
          <>
            <span>Start</span>
            <img src={CoinImage} alt='coin-image' />
          </>
        }
        onClick={() => {
          console.log('emitted');
          new Emitter().emitAll('startButler');
        }}
      />
    </div>
  );
};

export default Footer;
