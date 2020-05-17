import React, { useState } from 'react';

import Input from '../../../../../common/Input';
import Button from '../../../../../common/Button';

const CHANNEL = 'SLACK';

const Slack = ({ slackInfo, setChannelData }) => {
  const [isSlackOpened, setIsSlackOpened] = useState(false);

  const handleSlackEnabledOnChange = event => {
    const { webhookUrl } = slackInfo;

    if (!webhookUrl) {
      setChannelData(CHANNEL, 'enabled', false);
    } else {
      setChannelData(CHANNEL, 'enabled', true);
    }

    setIsSlackOpened(false);
  };

  const handleUrlOnChange = event => {
    event.persist();

    const {
      target: { value },
    } = event;

    setChannelData(CHANNEL, 'webhookUrl', value);
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
            name='webhookUrl'
            onChange={handleUrlOnChange}
            value={slackInfo.webhookUrl}
          />
          <Button btnText='Add' onClick={handleSlackEnabledOnChange} />
        </div>
      )}
    </div>
  );
};

export default Slack;
