import React from 'react';

import Logo from '../../images/new-logo.svg';

import './style.scss';

const Header = () => {
  return (
    <div className='header-wrapper'>
      <img className='logo' src={Logo} alt='logo' />
    </div>
  );
};

export default Header;
