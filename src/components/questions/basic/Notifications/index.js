import React, { useState, useEffect } from 'react';

import Email from './Email';
import Slack from './Slack';
import QuestionTitle from '../../../common/QuestionTitle';

import { useGetStateFromCP } from '../../../../hooks/useGetStateFromCP';

import './style.scss';

const EMAIL_DEFAULT = {
  enabled: false,
  username: '',
  password: '',
  from: '',
  to: '',
};

const SLACK_DEFAULT = {
  enabled: false,
  webhookUrl: '',
};

const NOTIFICATIONS = {
  EMAIL: EMAIL_DEFAULT,
  SLACK: SLACK_DEFAULT,
};

const Notifications = ({ selectedNotifications, isButlerStarted, getState }) => {
  const [notifications, setNotifications] = useState({
    EMAIL: { ...EMAIL_DEFAULT },
    SLACK: { ...SLACK_DEFAULT },
  });

  useGetStateFromCP(isButlerStarted, getState, { NOTIFICATIONS: notifications });

  useEffect(() => {
    if (!selectedNotifications) return;

    Object.keys(selectedNotifications).forEach(channel => {
      setNotifications(prevNotifications => ({
        ...prevNotifications,
        [channel]: {
          ...selectedNotifications[channel],
        },
      }));
    });
  }, [selectedNotifications]);

  const setChannelData = (channel, prop, value) => {
    if (prop === 'enabled' && !value) {
      resetStateForChannel(channel);
      return;
    }

    setNotifications({
      ...notifications,
      [channel]: {
        ...notifications[channel],
        [prop]: value,
      },
    });
  };

  const resetStateForChannel = channel => {
    setNotifications({
      ...notifications,
      [channel]: {
        ...NOTIFICATIONS[channel],
      },
    });
  };

  return (
    <div className='notifications-wrapper'>
      <QuestionTitle title='Notifications' />
      <div className='notifications'>
        <Email emailInfo={notifications.EMAIL} setChannelData={setChannelData} />
        <Slack slackInfo={notifications.SLACK} setChannelData={setChannelData} />
      </div>
    </div>
  );
};

export default Notifications;
