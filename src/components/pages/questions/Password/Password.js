import React, { useState, useEffect } from 'react';
import { AppModal } from '../../../common/Modal/Modal';
import Button from '../../../common/Button';
import Emitter from '../../../../utils/emitter';
import { ipcRenderer } from 'electron';
import { DEFAULT_CONFIG } from '../../../../constants';
import Logo from '../../../../images/jelly-butler.svg';
import './style.scss';

let isAppFirstOpen = true;

export const Password = ({ submitModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(isAppFirstOpen);
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [attemptsClassName, setAttemptsClassName] = useState('success');

  useEffect(() => {
    return () => {
      isAppFirstOpen = false;
    };
  }, []);

  const handlePasswordOnChange = event => {
    event.persist();

    setPassword(event.target.value);
  };

  useEffect(() => {
    console.log(attempts);

    switch (attempts) {
      case 1: {
        setAttemptsClassName('warning');
        return;
      }
      case 2: {
        setAttemptsClassName('danger');
        return;
      }
      case 3: {
        ipcRenderer.send('saveConfig', DEFAULT_CONFIG);
        return;
      }
      case 4: {
        setIsModalOpen(false);
        return;
      }
      default:
        return;
    }
  }, [attempts]);

  new Emitter().on('CORRECT_PASSWORD', () => {
    setIsModalOpen(false);
  });

  new Emitter().on('WRONG_PASSWORD', () => {
    setAttempts(attempts + 1);
    setShowErrorMsg(false);
  });

  return (
    <AppModal isOpen={isModalOpen}>
      <div className='password-wrapper'>
        <div className='title'>
          <h1>Welcome to the Jelly Butler!</h1>
          <p>
            <span className='note'>Note:</span> If the user does not enter the correct password 3 times in a row, new
            password will be generated and config will be reset.
          </p>
        </div>
        <div className='logo'>
          <img src={Logo} alt='logo' />
        </div>
        <div className='input-wrapper'>
          <label htmlFor='input-password'> Please Enter your password</label>
          <input
            id='input-password'
            type='password'
            value={password}
            onChange={handlePasswordOnChange}
            placeholder='Password'
          />
          {showErrorMsg && <p className='error-msg'>Password cannot be less than 4 symbols long</p>}
          {3 - attempts > 0 ? (
            <p className='info'>
              You have
              <span className={attemptsClassName}>{3 - attempts}</span>
              to unlock your config
            </p>
          ) : (
            <p>Enter new password and reacreate config</p>
          )}
          <Button
            btnText='Password'
            onClick={() => {
              if (password.length < 4) {
                setShowErrorMsg(true);
                return;
              }

              submitModal(password);
            }}
          />
        </div>
      </div>
    </AppModal>
  );
};
