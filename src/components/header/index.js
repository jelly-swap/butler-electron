import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import Logo from '../../images/jelly-butler.svg';

import './style.scss';

const Header = () => {
  const history = useHistory();
  const location = useLocation();

  const navigateTo = event => {
    const {
      target: { name },
    } = event;

    history.push(name);
  };

  return (
    <div className='header-wrapper'>
      <div className='img-wrapper'>
        <img className='logo' src={Logo} alt='logo' />
      </div>
      {location.pathname !== '/' && (
        <div className='nav-links-wrapper'>
          <button
            className={`${location.pathname === '/terminal' ? 'active' : null}`}
            onClick={navigateTo}
            name='/terminal'
          >
            Logs
          </button>
          <button
            className={`${location.pathname === '/balanceOf' ? 'active' : null}`}
            onClick={navigateTo}
            name='/balanceOf'
          >
            Wallets
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
