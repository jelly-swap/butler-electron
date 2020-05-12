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

  return (
    <div className='footer-wrapper'>
      <Button
        btnText={
          <>
            <span>{statusText[history.location.pathname]}</span>
            <img src={CoinImage} alt='coin' />
          </>
        }
        onClick={() => {
          const { ipcRenderer } = window.require('electron');

          if (history.location.pathname === '/') {
            new Emitter().emitAll('startButler');
          } else {
            ipcRenderer.send('stop-butler');

            ipcRenderer.on('butlerHasBeenKilled', (message, pathname) => {
              history.push(pathname);
            });
          }
        }}
      />
    </div>
  );
};

export default Footer;
