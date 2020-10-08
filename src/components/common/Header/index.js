import React from 'react';
import Logo from '../../../images/jelly-butler.svg';

import './_style.scss';

export default ({ children }) => {
  return (
    <div className={`header`}>
      <img src={Logo} alt='logo' />
      {children}
    </div>
  );
};
