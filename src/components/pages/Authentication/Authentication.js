import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import { Register } from './Register/Register';
import { Login } from './Login/Login';

import { useUpdateUser } from '../../../context/UserContext';

import './style.scss';

const TABS = {
  REGISTER: 'Register',
  LOGIN: 'Login',
};

const { REGISTER, LOGIN } = TABS;

export const Authentication = () => {
  const [tab, setTab] = useState(REGISTER);

  const history = useHistory();
  const updateUser = useUpdateUser();

  const changeTab = tabToOpen => {
    setTab(tabToOpen);
  };

  const authenticateUser = async (endPoint, state) => {
    try {
      const { data } = await axios.post('http://localhost:9000' + endPoint, state);

      if (data.success && endPoint === '/login') {
        updateUser(data.user);
        history.push('/questions');
      }
    } catch (error) {
      console.log('Error', endPoint, error);
    }
  };

  return (
    <div className='authentication-wrapper'>
      <div className='title'>
        <h1>Welcome to the Butler!</h1>
      </div>
      <div className='authentication-tabs'>
        <p onClick={() => changeTab(REGISTER)}>{REGISTER}</p>
        <p onClick={() => changeTab(LOGIN)}>{LOGIN}</p>
      </div>
      {(() => {
        switch (tab) {
          case REGISTER:
            return <Register authenticateUser={authenticateUser} />;
          case LOGIN:
            return <Login authenticateUser={authenticateUser} />;
          default:
            return null;
        }
      })()}
    </div>
  );
};
