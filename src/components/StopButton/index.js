import React, { useCallback } from 'react';
import swal from 'sweetalert';

import Button from '../common/Button';

import { useHistory } from 'react-router-dom';
import { useEvent } from '../../context/EventContext';
import { useApp } from '../../context/AppContext';
import { usePassword } from '../../context/PasswordContext';
import { sendFromRenderer } from '../../utils/electronAPI';

import { BUTLER_EVENTS } from '../../constants';

import './_style.scss';
import { useLogger } from '../../context/LoggerContext';

export default () => {
  const history = useHistory();
  const [, updateLogger] = useLogger();
  const [, updatePassword] = usePassword();
  const [, updateApp] = useApp();

  const handleEvent = useCallback(() => {
    updatePassword('');
    updateApp({ msg: 'SERVER_STOPPED' });
    updateLogger({
      level: 'error',
      timestamp: new Date().toLocaleString(),
      msg: 'Butler stopped.',
    });
    history.push('/login');
  }, [updatePassword, updateApp, updateLogger, history]);

  useEvent(BUTLER_EVENTS.STOPPED, handleEvent);

  const handleOnClick = () => {
    swal({
      title: 'Are you sure?',
      text: 'Are you sure you want to stop Butler? Please check if you have any pending swaps.',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        sendFromRenderer(BUTLER_EVENTS.STOP);
      }
    });
  };

  return <Button color='red' className='stop-button' content={<span>Stop Butler</span>} onClick={handleOnClick} />;
};
