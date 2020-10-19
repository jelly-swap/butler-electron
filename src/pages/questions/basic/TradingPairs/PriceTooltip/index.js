import React from 'react';
import Tooltip from 'react-tooltip-lite';

import './_style.scss';

export default ({ pair }) => {
  return (
    <span className='tooltip'>
      <Tooltip
        direction='up-start'
        tipContentClassName='tip-content'
        content={
          <div>
            <p>
              <strong>Use with cautious!</strong>{' '}
            </p>
            <p>
              {`Setting the price for ${pair.receive}-${pair.provide} will ignore the price fetched from the price provider and will use this price
              instead.`}
            </p>
            <br></br>
            <p>
              <strong>Example 1:</strong> If you provide USDC and you want to receive BTC, you have to put the price in
              USDC for 1 BTC (e.g. 11300 USDC)
            </p>
            <br></br>
            <p>
              <strong>Example 2:</strong> If you provide BTC and you want to receive USDC, you have to put the price in
              BTC for 1 USDC (e.g. 0.00008635 BTC)
            </p>
            <br></br>
            <p>
              <strong>Example 3:</strong> If you set the price for BTC-USDC to 11000 and the current market price is
              10000, users will not be able to swap with you (unless you're the only LP for that pair and they agree on
              the price). If the price changes to 12000, users will most likely want to swap with you, because you
              provide a price which is better than the current market price.
            </p>
          </div>
        }
      >
        <i className='fas fa-info-circle'></i>
      </Tooltip>
    </span>
  );
};
