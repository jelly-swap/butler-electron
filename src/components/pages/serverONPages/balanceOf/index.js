import React from 'react';

import { useHttpGet } from '../../../../hooks/useHttpGet';

import './style.scss';
import { formatAddress } from '../../../../utils/formatter';

const balanceEndpoint = '/api/v1/balanceAll';

const BalanceOf = () => {
  const { data, isLoading } = useHttpGet(balanceEndpoint);

  return (
    !isLoading && (
      <div className='balance-of-wrapper'>
        <h2>Balance</h2>
        {Object.keys(data).map((key, idx) => (
          <div key={idx} className='row-balance-of'>
            <div className='address-wrapper'>
              <p>Address:</p> <span>{formatAddress(data[key].address)}</span>
            </div>
            <div className='balance-wrapper'>
              <p>Balance:</p> <span>{data[key].balance}</span>
              <div className='img-wrapper'>
                <img className='token-img' src={require(`../../../../images/tokens/${key}.svg`)} alt={key} />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default BalanceOf;
