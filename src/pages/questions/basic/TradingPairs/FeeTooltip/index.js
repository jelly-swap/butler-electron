import React from 'react';
import Tooltip from 'react-tooltip-lite';

import './_style.scss';

export default () => {
  return (
    <span className='tooltip'>
      <Tooltip
        direction='up-start'
        tipContentClassName='tip-content'
        content={
          <div>
            <p>
              <strong>Max fee 5%</strong>{' '}
            </p>
            <br></br>
            <p>
              <strong>Example:</strong> Entering "3" for fee, means 3% on top of the pair price fetched from the price
              provider.
            </p>
          </div>
        }
      >
        <i className='fas fa-info-circle'></i>
      </Tooltip>
    </span>
  );
};
