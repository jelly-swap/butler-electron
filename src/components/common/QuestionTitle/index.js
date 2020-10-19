import React from 'react';

import './style.scss';

export default ({ title, isValid }) => {
  return <h3 className={`${isValid ? 'valid-q' : 'invalid-q'}`}>{title}</h3>;
};
