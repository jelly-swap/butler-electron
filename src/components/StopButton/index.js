import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { BUTLER_EVENTS } from '../../constants';
import { useEvent } from '../../context/EventContext';
import { useApp } from '../../context/AppContext';
import { usePassword } from '../../context/PasswordContext';
import { sendFromRenderer } from '../../utils/electronAPI';

import Button from '../common/Button';

import './_style.scss';

export default () => {
  const history = useHistory();
  const [, updatePassword] = usePassword();
  const [app, updateApp] = useApp();

  const handleEvent = useCallback(() => {
    updatePassword('');
    updateApp({ msg: 'SERVER_STOPPED' });
    history.push('/login');
  }, [updatePassword, updateApp, history]);

  useEvent(BUTLER_EVENTS.STOPPED, handleEvent);

  const handleOnClick = () => {
    sendFromRenderer(BUTLER_EVENTS.STOP);
  };

  return <Button color='red' className='stop-button' content={<span>Stop</span>} onClick={handleOnClick} />;
};
