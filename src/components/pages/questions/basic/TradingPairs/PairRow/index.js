import React from 'react';

import Input from '../../../../common/Input';
import TokensList from '../../../../common/TokensList';

// import JellyIcon from '../../../../../../common/Icons/JellyIcon';

import { TOKENS, QUOTES } from '../../../../../Swap/CurrencyInput/utils';

const PairRow = ({
  id,
  pair,
  numberOfRows,
  handleProvideOnChange,
  handleReceiveOnChange,
  handleFeeOnChange,
  handlePriceOnChange,
  handleRemoval,
  existingPairs,
}) => {
  return (
    <>
      <div className={'pair-row'} id={id}>
        <div className='row'>
          <div className='field-wrapper'>
            <span className='label'>Provide</span>
            <TokensList
              currencies={TOKENS}
              currency={pair.provide}
              selectorUpdate={network => handleProvideOnChange(id, network)}
            ></TokensList>
          </div>

          <div className='field-wrapper'>
            <span className='label'>Receive</span>
            <TokensList
              currencies={QUOTES[pair.provide]}
              currency={pair.receive}
              selectorUpdate={network => handleReceiveOnChange(id, network)}
            ></TokensList>
          </div>

          <div className='fee-input'>
            <span>Fee</span>
            <Input type='number' value={pair.fee} onChange={value => handleFeeOnChange(id, value)} text='0.0' />
          </div>

          <div className='price-input'>
            <span>Price</span>
            <Input type='number' value={pair.price} onChange={value => handlePriceOnChange(id, value)} text='0.0' />
          </div>

          {numberOfRows > 1 && (
            <span className='remove-row-btn' onClick={() => handleRemoval(id)}>
              <i class='fas fa-minus-square'></i>
            </span>
          )}

          {/* TODO: FIX THIS
          {existingPairs[pair.name] && (
            <JellyIcon className='trading-pairs-icon'>
              <p>Pair already exists</p>
            </JellyIcon>
          )} */}
        </div>
      </div>
    </>
  );
};

export default PairRow;
