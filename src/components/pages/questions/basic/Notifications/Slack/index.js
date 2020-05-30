import React, { useState } from 'react';

import Input from '../../../../../common/Input';
import Button from '../../../../../common/Button';

const CHANNEL = 'SLACK';

const Slack = ({ slackInfo, setChannelData }) => {
  const [isSlackOpened, setIsSlackOpened] = useState(false);

  const handleSlackEnabledOnChange = event => {
    const { WEBHOOK_URL } = slackInfo;

    if (!WEBHOOK_URL) {
      setChannelData(CHANNEL, 'ENABLED', false);
    } else {
      setChannelData(CHANNEL, 'ENABLED', true);
    }

    setIsSlackOpened(false);
  };

  const handleUrlOnChange = event => {
    event.persist();

    const {
      target: { value },
    } = event;

    setChannelData(CHANNEL, 'WEBHOOK_URL', value);
  };

  return (
    <div className='slack-wrapper'>
      <div
        onClick={() => setIsSlackOpened(isSlackOpened => !isSlackOpened)}
        className={`slack-checkbox-wrapper ${!isSlackOpened ? 'notification-not-opened' : null}`}
      >
        <p>Slack</p>
        <span>{isSlackOpened ? '-' : '+'}</span>
      </div>
      {isSlackOpened && (
        <div className='slack-info-wrapper'>
          <Input
            className='hook-url'
            type='text'
            placeholder='Hook URL'
            name='WEBHOOK_URL'
            onChange={handleUrlOnChange}
            value={slackInfo.WEBHOOK_URL}
          />
          <Button btnText='Add' onClick={handleSlackEnabledOnChange} />
        </div>
      )}
    </div>
  );
};

export default Slack;
