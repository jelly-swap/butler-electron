import React from 'react';

import { BASE_ASSETS, QUOTE_ASSETS } from '../../../../../constants';
import Input from '../../../../../components/common/Input';
import TokensList from '../../../../../components/common/TokenList';

const PairRow = ({
  id,
  pair,
  numberOfRows,
  handleProvideOnChange,
  handleReceiveOnChange,
  handleFeeOnChange,
  handlePriceOnChange,
  handleRemoval,
}) => {
  return (
    <>
      <div className={'pair-row'} id={id}>
        <div className='row'>
          <div className='field-wrapper'>
            <span className='label'>Provide:</span>
            <TokensList
              currencies={BASE_ASSETS}
              currency={pair.provide}
              selectorUpdate={network => handleProvideOnChange(id, network)}
            ></TokensList>
          </div>

          <div className='field-wrapper'>
            <span className='label'>Receive:</span>
            <TokensList
              currencies={QUOTE_ASSETS[pair.provide]}
              currency={pair.receive}
              selectorUpdate={network => handleReceiveOnChange(id, network)}
            ></TokensList>
          </div>

          <div className='fee-input'>
            <span className='label'>Fee:</span>
            <Input type='number' value={pair.fee} onChange={value => handleFeeOnChange(id, value)} text='0.0' />
          </div>

          <div className='price-input'>
            <span className='label'>Price:</span>
            <Input type='number' value={pair.price} onChange={value => handlePriceOnChange(id, value)} text='0.0' />
          </div>

          {numberOfRows > 1 && (
            <span className='remove-row-btn' onClick={() => handleRemoval(id)}>
              <i className='fas fa-minus-square'></i>
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default PairRow;
