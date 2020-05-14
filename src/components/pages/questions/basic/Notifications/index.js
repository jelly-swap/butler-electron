import React, { useState, useEffect } from 'react';

import Email from './Email';
import Slack from './Slack';
import QuestionTitle from '../../../../common/QuestionTitle';

import { useGetStateFromCP } from '../../../../../hooks/useGetStateFromCP';

import './style.scss';
import { REGEX_FOR_EMAIL } from '../../../../../constants';

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

const Notifications = ({ valid, selectedNotifications, isButlerStarted, getState }) => {
  const [notifications, setNotifications] = useState({
    EMAIL: { ...EMAIL_DEFAULT },
    SLACK: { ...SLACK_DEFAULT },
  });
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isSlackValid, setIsSlackValid] = useState(true);

  useGetStateFromCP(isButlerStarted, getState, { NOTIFICATIONS: notifications });

  useEffect(() => {
    console.log(valid);
  }, [valid]);

  useEffect(() => {
    console.log('email valid', isEmailValid);
    console.log('slack valid', isSlackValid);
  }, [isEmailValid, isSlackValid]);

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

  useEffect(() => {
    const { EMAIL, SLACK } = notifications;

    if (!EMAIL.enabled) {
      setIsEmailValid(true);
    }

    if (!SLACK.enabled) {
      setIsSlackValid(true);
    }

    const emailRegex = new RegExp(REGEX_FOR_EMAIL);

    if (
      EMAIL.enabled &&
      (!emailRegex.test(EMAIL.username) ||
        !EMAIL.password ||
        !emailRegex.test(EMAIL.to) ||
        !emailRegex.test(EMAIL.from))
    ) {
      setIsEmailValid(false);
    } else if (EMAIL.enabled && EMAIL.username && EMAIL.password && EMAIL.to && EMAIL.from) {
      setIsEmailValid(true);
    }

    if (SLACK.enabled && !SLACK.webhookUrl) {
      setIsSlackValid(false);
    } else if (SLACK.enabled && SLACK.webhookUrl) {
      setIsSlackValid(true);
    }
  }, [notifications]);

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
      <QuestionTitle isValid={isEmailValid && isSlackValid} title='Notifications' />
      <div className='notifications'>
        <Email emailInfo={notifications.EMAIL} setChannelData={setChannelData} />
        <Slack slackInfo={notifications.SLACK} setChannelData={setChannelData} />
      </div>
    </div>
  );
};

export default Notifications;
