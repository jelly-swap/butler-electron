import React, { useState } from 'react';

import './style.scss';
import { Register } from './Register/Register';

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
            return <Register />;
          default:
            return null;
        }
      })()}
    </div>
  );
};
