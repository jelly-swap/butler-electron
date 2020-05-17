import React, { useState } from 'react';

import Input from '../../../../../common/Input';
import Button from '../../../../../common/Button';

const CHANNEL = 'EMAIL';

const Email = ({ emailInfo, setChannelData }) => {
  const [isEmailOpened, setIsEmailOpened] = useState(false);

  const handleEmailEnabledOnChange = () => {
    const { username, password, from, to } = emailInfo;

    if (!username || !password || !from || !to) {
      setChannelData(CHANNEL, 'enabled', false);
    } else if (username && password && from && to) {
      setChannelData(CHANNEL, 'enabled', true);
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
          <Input
            type='text'
            placeholder='Username'
            name='username'
            value={emailInfo.username}
            onChange={handleEmailDataOnChange}
          />
          <Input
            type='text'
            placeholder='Password'
            name='password'
            value={emailInfo.password}
            onChange={handleEmailDataOnChange}
          />
          <div className='from-to-wrapper'>
            <Input
              type='text'
              className='from-field'
              placeholder='From'
              name='from'
              value={emailInfo.from}
              onChange={handleEmailDataOnChange}
            />
            <div className='to-wrapper'>
              <Input
                type='text'
                className='to-field'
                placeholder='To'
                name='to'
                value={emailInfo.to}
                onChange={handleEmailDataOnChange}
              />
              <Button btnText='Add' onClick={handleEmailEnabledOnChange} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Email;
