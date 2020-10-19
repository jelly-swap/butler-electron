import React from 'react';

import './_style.scss';

export default ({ children, className }) => {
  return <div className={`content-wrapper ${className || ''}`}>{children}</div>;
};
