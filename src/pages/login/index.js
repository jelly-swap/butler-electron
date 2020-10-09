import React, { useState, useEffect } from 'react';
import { receiveFromMain, sendFromRenderer } from '../../utils/electronAPI';
import { BUTLER_EVENTS } from '../../constants';

import PageWrapper from '../../components/common/PageWrapper';
import ContentWrapper from '../../components/common/ContentWrapper';
import Input from '../../components/common/Input';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';

import { useButlerConfig } from '../../context/ConfigContext';
import { useHistory } from 'react-router-dom';
import { usePassword } from '../../context/PasswordContext';
import { decrypt } from '../../utils/crypto';

import './style.scss';

export default () => {
  const history = useHistory();
  const [password, setPassword] = usePassword();
  const [, updateConfig] = useButlerConfig();

  const [isLoading, setLoading] = useState(true);
  const [config, setConfig] = useState();
  const [firstLogin, setFirstLogin] = useState(false);
  const [attempts, setAttempts] = useState(3);
  const [errorMessage, setErrorMessage] = useState(false);

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

      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePasswordOnChange = event => {
    event.persist();
    setPassword(event.target.value);

    if (event.target.value.length < 4) {
      setErrorMessage('Password must be longer than or equal to 4 characters');
    } else {
      setErrorMessage('');
    }
  };

  const handleLogin = () => {
    if (firstLogin) {
      if (password.length >= 4) {
        history.push('/home');
      }
    } else {
      try {
        const decryptedConfig = decryptSecrets(config, password);
        updateConfig(decryptedConfig);
        history.push('/home');
      } catch (err) {
        setAttempts(oldValue => oldValue - 1);
        setErrorMessage(`You have ${attempts - 1} attempts to enter the correct password.`);
      }
    }
  };

  return !isLoading ? (
    <PageWrapper>
      <Header hideLogout={true} />
      <ContentWrapper>
        <div className='title'>
          <h1>Welcome to Butler</h1>
          <p>
            The password is used to encrypt all of your sensitive information. Your first entered password will be used
            in the future. If you do not enter the correct password 3 times in a row your settings will be wiped out and
            you'll have to use a new password.
          </p>
        </div>
        <Input
          className='input'
          text='Password'
          type='password'
          value={password || ''}
          errMessage={errorMessage}
          onChange={handlePasswordOnChange}
        />
        <Button className='button' content='Login' color='green' onClick={handleLogin} />
      </ContentWrapper>
    </PageWrapper>
  ) : null;
};

const decryptSecrets = (config, password) => {
  const decryptedConfig = { ...config };

  if (config.WALLETS) {
    for (const asset in config.WALLETS) {
      const secret = config.WALLETS[asset]?.SECRET;
      if (secret) {
        const result = decrypt(secret, password);
        if (result.success) {
          decryptedConfig.WALLETS[asset].SECRET = result.data;
        } else {
          throw new Error('WRONG_PASSWORD');
        }
      }
    }
  }

  return decryptedConfig;
};
