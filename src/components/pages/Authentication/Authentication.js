import React, { useState } from 'react';
import axios from 'axios';

import { Register } from './Register/Register';
import { Login } from './Login/Login';

import './style.scss';

const TABS = {
  REGISTER: 'Register',
  LOGIN: 'Login',
};

const { REGISTER, LOGIN } = TABS;

export const Authentication = () => {
  const [tab, setTab] = useState(REGISTER);

  const changeTab = tabToOpen => {
    setTab(tabToOpen);
  };

  const authenticateUser = async (endPoint, state) => {
    try {
      const data = await axios.post('http://localhost:9000' + endPoint, state);

      console.log(data);
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
