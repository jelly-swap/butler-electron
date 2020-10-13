import React from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../../../images/jelly-butler.svg';

import './_style.scss';

export default ({ hideLogout, displayNav }) => {
  return (
    <div className={`header`}>
      <img src={Logo} alt='logo' />
      <div className='nav-bar'>
        {displayNav && <NavLink to={'/home'}>Settings</NavLink>}
        {displayNav && <NavLink to={'/balance'}>Wallets</NavLink>}
        {displayNav && <NavLink to={'/transactions'}>Transactions</NavLink>}
        {displayNav && <NavLink to={'/terminal'}>Logs</NavLink>}
        {!hideLogout && <div className="logout"> <NavLink  to={'/login'}>Logout</NavLink></div>}
      </div>
    </div>
  );
};
