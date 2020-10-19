import React, { useState } from 'react';

import PageWrapper from '../../components/common/PageWrapper';
import ContentWrapper from '../../components/common/ContentWrapper';
import Input from '../../components/common/Input';
import Header from '../../components/common/Header';
import LoginButton from '../../components/LoginButton';

import { useButlerConfig } from '../../context/ConfigContext';

import { usePassword } from '../../context/PasswordContext';
import { useHistory } from 'react-router-dom';

import { BUTLER_EVENTS, BUTLER_VERSION, DEFAULT_CONFIG } from '../../constants';
import { sendFromRenderer } from '../../utils/electronAPI';

import './style.scss';

export default () => {
  const history = useHistory();
  const [, setConfig] = useButlerConfig();
  const [password, setPassword] = usePassword();
  const [attempts, setAttempts] = useState(3);
  const [errorMessage, setErrorMessage] = useState(false);

  const handlePasswordOnChange = event => {
    event.persist();
    setPassword(event.target.value);

    if (event.target.value.length < 4) {
      setErrorMessage('Password must be longer than or equal to 4 characters');
    } else {
      setErrorMessage('');
    }
  };

  const handlePasswordSubmission = correctPassword => {
    if (!correctPassword) {
      if (attempts > 1) {
        setAttempts(oldValue => oldValue - 1);
        setErrorMessage(`You have ${attempts - 1} attempts to enter the correct password.`);
      } else {
        setErrorMessage(`Pick new password.`);
        setConfig(DEFAULT_CONFIG);
        sendFromRenderer(BUTLER_EVENTS.SAVE, DEFAULT_CONFIG);
        history.push('/home');
      }
    }
  };

  return (
    <PageWrapper>
      <Header />
      <ContentWrapper>
        <div className='title'>
          <h1>{`Welcome to Butler v${BUTLER_VERSION}`}</h1>
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
        <LoginButton onSubmitPassword={handlePasswordSubmission} />
      </ContentWrapper>
    </PageWrapper>
  );
};
