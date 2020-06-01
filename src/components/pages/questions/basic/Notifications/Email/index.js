import React, { useState } from 'react';

import Input from '../../../../../common/Input';
import Button from '../../../../../common/Button';

import { REGEX_FOR_EMAIL } from '../../../../../../constants';

const CHANNEL = 'EMAIL';

const Email = ({ emailInfo, setChannelData }) => {
  const [isEmailOpened, setIsEmailOpened] = useState(false);

  const handleEmailEnabledOnChange = () => {
    const { USERNAME, PASSWORD, FROM, TO } = emailInfo;

    if (!USERNAME || !PASSWORD || !FROM || !TO) {
      setChannelData(CHANNEL, 'ENABLED', false);
    } else if (USERNAME && PASSWORD && FROM && TO) {
      setChannelData(CHANNEL, 'ENABLED', true);
    }

    setIsEmailOpened(false);
  };

  const handleEmailDataOnChange = event => {
    event.persist();

    const {
      target: { name, value },
    } = event;

    setChannelData(CHANNEL, name, value);
  };

  return (
    <div className='email-wrapper'>
      <div
        className={`${!isEmailOpened ? 'notification-not-opened' : null} email-checkbox-wrapper`}
        onClick={() => setIsEmailOpened(isEmailOpened => !isEmailOpened)}
      >
        <p>Email</p>
        <span className={isEmailOpened ? 'email-opened' : 'email-closed'}>{isEmailOpened ? '-' : '+'}</span>
      </div>
      {isEmailOpened && (
        <div className='email-info-wrapper'>
          <div className='username-wrapper'>
            <Input
              type='text'
              placeholder='Username'
              name='USERNAME'
              value={emailInfo.USERNAME}
              onChange={handleEmailDataOnChange}
            />
            <span
              className={
                emailInfo.USERNAME && !new RegExp(REGEX_FOR_EMAIL).test(emailInfo.USERNAME)
                  ? 'invalid-email'
                  : 'valid-email'
              }
            ></span>
          </div>
          <div className='password-wrapper'>
            <Input
              type='password'
              placeholder='Password'
              name='PASSWORD'
              value={emailInfo.PASSWORD}
              onChange={handleEmailDataOnChange}
            />
            <span
              className={
                !emailInfo.PASSWORD && (emailInfo.USERNAME || emailInfo.FROM || emailInfo.TO)
                  ? 'invalid-email'
                  : 'valid-email'
              }
            ></span>
          </div>
          <div className='from-to-wrapper'>
            <div className='from-wrapper'>
              <Input
                type='text'
                className={`from-field ${
                  emailInfo.FROM && !new RegExp(REGEX_FOR_EMAIL).test(emailInfo.FROM) ? 'invalid-email' : 'valid-email'
                }`}
                placeholder='From'
                name='FROM'
                value={emailInfo.FROM}
                onChange={handleEmailDataOnChange}
              />
              <span
                className={
                  emailInfo.FROM && !new RegExp(REGEX_FOR_EMAIL).test(emailInfo.FROM) ? 'invalid-email' : 'valid-email'
                }
              ></span>
            </div>
            <div className='to-wrapper'>
              <Input
                type='text'
                className={`to-field ${
                  emailInfo.TO && !new RegExp(REGEX_FOR_EMAIL).test(emailInfo.TO) ? 'invalid-email' : 'valid-email'
                }`}
                placeholder='To'
                name='TO'
                value={emailInfo.TO}
                onChange={handleEmailDataOnChange}
              />
              <span
                className={
                  emailInfo.TO && !new RegExp(REGEX_FOR_EMAIL).test(emailInfo.TO) ? 'invalid-email' : 'valid-email'
                }
              ></span>
              <Button btnText='Add' onClick={handleEmailEnabledOnChange} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Email;
