import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../common/Button';

import Emitter from '../../utils/emitter';

import CoinImage from '../../css/background-coins/Coins-button.svg';

import './style.scss';

const statusText = {
  '/': 'Start',
  '/terminal': 'Stop',
};

const Footer = () => {
  const history = useHistory();
  const location = history.location;

  const buttonHandler = () => {
    return {
      '/': () => {
        new Emitter().emitAll('startButler');
      },
      '/terminal': () => {
        const { ipcRenderer } = window.require('electron');
        ipcRenderer.send('stop-butler');
      },
      '/balanceOf': () => {
        const { ipcRenderer } = window.require('electron');
        ipcRenderer.send('stop-butler');
      },
    };
  };

  return (
    <div className='footer-wrapper'>
      <Button
        btnText={
          <>
            <span>{statusText[location]}</span>
            <img src={CoinImage} alt='coin' />
          </>
        }
        onClick={() => {
          console.log(location, buttonHandler()[location]);

          buttonHandler()[location.pathname]();
        }}
      />
    </div>
  );
};

export default Footer;
