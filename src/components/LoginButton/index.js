import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useButlerConfig } from '../../context/ConfigContext';
import { usePassword } from '../../context/PasswordContext';

import { BUTLER_EVENTS } from '../../constants';
import { decryptSecrets } from '../../utils';

import { receiveFromMain, sendFromRenderer } from '../../utils/electronAPI';

import Button from '../common/Button';

import './_style.scss';

export default ({ onSubmitPassword }) => {
  const history = useHistory();
  const [config, setConfig] = useButlerConfig();
  const [password, setPassword] = usePassword();

  const [firstLogin, setFirstLogin] = useState(false);

  useEffect(() => {
    setPassword('');

    sendFromRenderer(BUTLER_EVENTS.LOAD);

    receiveFromMain(BUTLER_EVENTS.LOADED, (event, data) => {
      if (!data.success && data.reason === 'FILE_NOT_FOUND') {
        setFirstLogin(true);
      }

      if (data.success && data.config) {
        setConfig(data.config);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogin = async () => {
    if (firstLogin) {
      if (password.length >= 4) {
        history.push('/home');
      }
    } else {
      try {
        const decryptedConfig = await decryptSecrets(config, password);
        onSubmitPassword(true);
        setConfig(decryptedConfig);
        history.push('/home');
      } catch (err) {
        onSubmitPassword(false);
      }
    }
  };

  return <Button className='button' content='Login' color='green' onClick={handleLogin} />;
};
