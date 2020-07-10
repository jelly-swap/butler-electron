import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../common/Input';
import Button from '../common/Button';
import { AppModal } from '../common/Modal/Modal';

import { usePassword } from '../../context/PasswordContext';

import Emitter from '../../utils/emitter';

import CoinImage from '../../css/background-coins/Coins-button.svg';

import './style.scss';

const statusText = {
  '/': 'Start',
  '/terminal': 'Stop',
  '/balanceOf': 'Stop',
};

const Footer = () => {
  const history = useHistory();
  const location = history.location;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState('');
  const [isPasswordIncorrect, setIsPasswordIncorrect] = useState(false);
  const { password } = usePassword();

  const buttonHandler = () => {
    return {
      '/': () => {
        new Emitter().emitAll('startButler');
      },

      '/terminal': () => {
        setIsModalOpen(true);
      },

      '/balanceOf': () => {
        setIsModalOpen(true);
      },
    };
  };

  const handlePasswordOnChange = event => {
    event.persist();

    setEnteredPassword(event.target.value);
  };

  const handleQuitOnClick = () => {
    if (password === enteredPassword) {
      const { ipcRenderer } = window.require('electron');
      ipcRenderer.send('stop-butler');
      setIsModalOpen(false);
    } else {
      setIsPasswordIncorrect(true);
    }
  };

  return (
    <div className='footer-wrapper'>
      <Button
        btnText={
          <>
            <span>{statusText[location.pathname]}</span>
            <img src={CoinImage} alt='coin' />
          </>
        }
        onClick={() => {
          buttonHandler()[location.pathname]();
        }}
      />
      <AppModal isOpen={isModalOpen}>
        <div className='modal-content'>
          <h2>Enter password</h2>
          <div className='input-wrapper'>
            <Input value={enteredPassword} onChange={handlePasswordOnChange} type='password' />
            {isPasswordIncorrect && <p className='error-msg'>Wrong password! Please try again.</p>}
            <Button btnText='Quit' onClick={handleQuitOnClick} />
          </div>
        </div>
      </AppModal>
    </div>
  );
};

export default Footer;
