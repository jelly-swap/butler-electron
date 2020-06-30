import React, { useState, useEffect } from 'react';
import { AppModal } from '../../../common/Modal/Modal';
import Button from '../../../common/Button';
import Emitter from '../../../../utils/emitter';
import { ipcRenderer } from 'electron';

let isAppFirstOpen = true;

const MAX_ATTEMPTS_TO_ENTER_PASSWORD = 3;

export const Password = ({ submitModal, shouldCloseModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(isAppFirstOpen);
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    return () => {
      isAppFirstOpen = false;
    };
  }, []);

  useEffect(() => {
    if (shouldCloseModal) {
      setIsModalOpen(false);
    }
  }, [shouldCloseModal]);

  const handlePasswordOnChange = event => {
    event.persist();

    setPassword(event.target.value);
  };

  useEffect(() => {
    if (attempts === MAX_ATTEMPTS_TO_ENTER_PASSWORD) {
      ipcRenderer.send('saveConfig', {});
    }
  }, [attempts]);

  new Emitter().on('SUCCESS_PASSWORD', () => {
    setIsModalOpen(false);
  });

  return (
    <AppModal isOpen={isModalOpen}>
      <input type='password' value={password} onChange={handlePasswordOnChange} />
      <p>You have {attempts} to unlock your config</p>
      <Button
        btnText='Password'
        onClick={() => {
          submitModal(password);
          setAttempts(attempts + 1);
        }}
      />
    </AppModal>
  );
};
