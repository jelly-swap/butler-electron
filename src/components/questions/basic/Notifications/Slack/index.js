import React from 'react';

import Input from '../../../../common/Input';

const CHANNEL = 'SLACK';

const Slack = ({ slackInfo, setChannelData }) => {
  const handleSlackEnabledOnChange = event => {
    event.persist();

    const {
      target: { checked },
    } = event;

    setChannelData(CHANNEL, 'enabled', checked);
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
      <div className='slack-checkbox-wrapper'>
        <Input id='slack' type='checkbox' checked={slackInfo.enabled} onChange={handleSlackEnabledOnChange} />
        <label className='slack-label' htmlFor='slack'>
          Slack
        </label>
      </div>
      {slackInfo.enabled && (
        <Input
          className='hook-url'
          type='text'
          placeholder='Hook URL'
          name='webhookUrl'
          onChange={handleUrlOnChange}
          value={slackInfo.webhookUrl}
        />
      )}
    </div>
  );
};

export default Slack;
