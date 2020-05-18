import React from 'react';
import { useHttpGet } from '../../../hooks/useHttpGet';

const balanceEndpoint = '/api/v1/balance';

const BalanceOf = () => {
  console.log('render');

  useHttpGet(balanceEndpoint);

  return <div></div>;
};

export default BalanceOf;
