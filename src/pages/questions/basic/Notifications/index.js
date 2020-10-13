import React, { useState, useEffect } from 'react';

import QuestionTitle from '../../../../components/common/QuestionTitle';
import Input from '../../../../components/common/Input';

import { useButlerConfig, useConfig } from '../../../../context/ConfigContext';
import { DEFAULT_CONFIG, REGEX_FOR_EMAIL } from '../../../../constants';

import './style.scss';

const Notifications = () => {
  const [, updateConfig] = useButlerConfig();
  const emailConfig = useConfig('NOTIFICATIONS', 'EMAIL') || DEFAULT_CONFIG.NOTIFICATIONS.EMAIL;
  const [isValid, setIsValid] = useState(true);

  const handleEmailDataOnChange = event => {
    event.persist && event.persist();

    const {
      target: { name, value },
    } = event;

    updateConfig({ NOTIFICATIONS: { EMAIL: { ...emailConfig, [name]: value } } });
  };

  useEffect(() => {
    if (emailConfig.ENABLED) {
      const valid =
        emailConfig.PASSWORD &&
        new RegExp(REGEX_FOR_EMAIL).test(emailConfig.USERNAME) &&
        new RegExp(REGEX_FOR_EMAIL).test(emailConfig.FROM) &&
        new RegExp(REGEX_FOR_EMAIL).test(emailConfig.TO);
      setIsValid(valid);
    }
  }, [emailConfig]);

  return (
    <div className='notifications-wrapper'>
      <QuestionTitle isValid={isValid} title='Notifications' />
      <div>
        <div className={'email-checkbox-wrapper'}>
          <input
            id='open-email-data'
            type='checkbox'
            onChange={event => {
              handleEmailDataOnChange({ ...event, target: { name: 'ENABLED', value: !emailConfig.ENABLED } });
            }}
          />
          <label htmlFor='open-email-data'>Email</label>
        </div>

        <div className='email-info-wrapper'>
          <div className='email-info-inputs'>
            <Input
              type='text'
              text='Username'
              name='USERNAME'
              value={emailConfig.USERNAME}
              onChange={handleEmailDataOnChange}
              disabled={!emailConfig.ENABLED}
            />

            <Input
              type='password'
              text='Password'
              name='PASSWORD'
              value={emailConfig.PASSWORD}
              onChange={handleEmailDataOnChange}
              disabled={!emailConfig.ENABLED}
            />

            <Input
              type='text'
              text='From'
              name='FROM'
              value={emailConfig.FROM}
              onChange={handleEmailDataOnChange}
              disabled={!emailConfig.ENABLED}
            />

            <Input
              type='text'
              text='To'
              name='TO'
              value={emailConfig.TO}
              onChange={handleEmailDataOnChange}
              disabled={!emailConfig.ENABLED}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
