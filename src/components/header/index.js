import React from 'react';

import Logo from '../../images/jelly-butler.svg';

import './style.scss';

const Header = () => {
  return (
    <div className='header-wrapper'>
      <img className='logo' src={Logo} alt='logo' />
    </div>
  );
};

export default Header;
