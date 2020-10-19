import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useButlerConfig } from '../../context/ConfigContext';
import { usePassword } from '../../context/PasswordContext';

import { BUTLER_EVENTS } from '../../constants';

import { decrypt } from '../../utils/crypto';
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

const decryptSecrets = async (config, password) => {
  const decryptedConfig = { ...config };

  if (config.WALLETS) {
    for (const asset in config.WALLETS) {
      const secret = config.WALLETS[asset].SECRET;
      const encrypted = config.WALLETS[asset].ENCRYPTED;

      if (secret && encrypted) {
        const result = await decrypt(secret, password);
        if (result.success && result.data) {
          decryptedConfig.WALLETS[asset].SECRET = result.data;
        } else {
          throw new Error('WRONG_PASSWORD');
        }
      }
    }
  }

  if (config.NOTIFICATIONS?.EMAIL?.ENABLED) {
    const emailPassword = config.NOTIFICATIONS.EMAIL.PASSWORD;
    const result = await decrypt(emailPassword, password);

    if (result.success && result.data) {
      decryptedConfig.NOTIFICATIONS.EMAIL.PASSWORD = result.data;
    }
  }

  if (config.EXCHANGE?.API_KEY) {
    const exchangeApiKey = config.EXCHANGE.API_KEY;
    const result = await decrypt(exchangeApiKey, password);

    if (result.success && result.data) {
      decryptedConfig.EXCHANGE.API_KEY = result.data;
    }
  }

  if (config.EXCHANGE?.SECRET_KEY) {
    const exchangeSecretKey = config.EXCHANGE.SECRET_KEY;
    const result = await decrypt(exchangeSecretKey, password);

    if (result.success && result.data) {
      decryptedConfig.EXCHANGE.SECRET_KEY = result.data;
    }
  }

  return decryptedConfig;
};
