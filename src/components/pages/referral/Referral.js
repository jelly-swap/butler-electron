import React from 'react';

import './style.scss';

const STATUSES = {
  1: 'Active',
};

export default ({ referral, idx }) => {
  const { email, status, progress, createdAt } = referral;

  return (
    <div className='referral'>
      <p>
        {idx + 1}. {email}
      </p>
      <p>Status: {STATUSES[status]}</p>
      <p>Registered at: {createdAt.split('T')[0]}</p>
    </div>
  );
};
