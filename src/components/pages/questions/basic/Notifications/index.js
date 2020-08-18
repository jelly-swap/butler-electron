import React, { useState, useEffect } from 'react';

import Email from './Email';
import QuestionTitle from '../../../../common/QuestionTitle';

import { useGetStateFromCP } from '../../../../../hooks/useGetStateFromCP';

import './style.scss';
import { REGEX_FOR_EMAIL } from '../../../../../constants';

const EMAIL_DEFAULT = {
  ENABLED: false,
  USERNAME: '',
  PASSWORD: '',
  FROM: '',
  TO: '',
  SERVICE: 'gmail',
  SUBJECT: 'JELLY',
};

const NOTIFICATIONS = {
  EMAIL: EMAIL_DEFAULT,
};

const Notifications = ({ selectedNotifications, isButlerStarted, getState }) => {
  const [notifications, setNotifications] = useState({ EMAIL: { ...EMAIL_DEFAULT } });
  const [isEmailValid, setIsEmailValid] = useState(true);

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

  useEffect(() => {
    const { EMAIL } = notifications;

    if (!EMAIL.ENALBED && (EMAIL.USERNAME || EMAIL.FROM || EMAIL.TO)) {
      setIsEmailValid(false);
    } else if (!EMAIL.ENABLED) {
      setIsEmailValid(true);
    }

    const emailRegex = new RegExp(REGEX_FOR_EMAIL);

    if (
      EMAIL.ENABLED &&
      (!emailRegex.test(EMAIL.USERNAME) ||
        !EMAIL.PASSWORD ||
        !emailRegex.test(EMAIL.FROM) ||
        !emailRegex.test(EMAIL.TO))
    ) {
      setIsEmailValid(false);
    } else if (EMAIL.ENABLED && EMAIL.USERNAME && EMAIL.PASSWORD && EMAIL.TO && EMAIL.FROM) {
      setIsEmailValid(true);
    }
  }, [notifications]);

  const setChannelData = (channel, prop, value) => {
    if (prop === 'ENABLED' && !value) {
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
      <QuestionTitle isValid={isEmailValid} title='Notifications' />
      <div className='notifications'>
        <Email emailInfo={notifications.EMAIL} setChannelData={setChannelData} />
      </div>
    </div>
  );
};

export default Notifications;
