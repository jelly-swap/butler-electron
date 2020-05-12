import React from 'react';
import { useHistory } from 'react-router-dom';

import Button from '../common/Button';

import Emitter from '../../utils/emitter';

import CoinImage from '../../css/background-coins/Coins-button.svg';

import './style.scss';

const statusText = {
  '#/': 'Start',
  '#/terminal': 'Stop',
};

const Footer = () => {
  const history = useHistory();
  const location = history.location.hash;

  console.log(location);
  const buttonHandler = {
    '#/': () => {
      new Emitter().emitAll('startButler');
    },
    '#/terminal': () => {
      const { ipcRenderer } = window.require('electron');
      ipcRenderer.send('stop-butler');

      ipcRenderer.on('butlerHasBeenKilled', (message, pathname) => {
        history.push(pathname);
      });
    },
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
          buttonHandler[location]();
        }}
      />
    </div>
  );
};

export default Footer;
