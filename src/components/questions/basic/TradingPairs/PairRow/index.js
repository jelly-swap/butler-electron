import React from 'react';

import Input from '../../../../common/Input';
import SelectMenu from '../../../../common/SelectMenu';
import Button from '../../../../common/Button';

import { PAIRS } from '../../../../../constants';

import { validateCurrency } from '../../../../../utils/enterNumbersOnly';

const PairRow = ({
  id,
  pair,
  row,
  numberOfRows,
  handleProvideOnChange,
  handleReceiveOnChange,
  handleFeeOnChange,
  addNewPair,
  removePair,
  existingPairs,
}) => {
  return (
    <div className='pair-row' id={id}>
      <div className='left-part'>
        <div className='select-menus'>
          <div className='field-wrapper'>
            <span className='label'>Provide</span>
            <SelectMenu options={Object.keys(PAIRS)} onChange={handleProvideOnChange} id={id} value={pair.provide} />
          </div>
          <div className='field-wrapper'>
            <span className='label'>Receive</span>
            <SelectMenu
              options={Object.keys(PAIRS[pair.provide])}
              onChange={handleReceiveOnChange}
              id={id}
              value={pair.receive}
            />
          </div>
          {existingPairs[pair.provide + '-' + pair.receive] > 1 ? (
            <span className='more-than-one-pair'> Pair already exists</span>
          ) : null}
        </div>
        <div className='input-fields'>
          <div className='field-wrapper'>
            <div className='form-control fee-input'>
              <Input
                type='text'
                value={pair.fee}
                onChange={value => handleFeeOnChange(id, value)}
                onKeyDown={validateCurrency}
                placeholder='Fee'
              />
              <span className={`pair-span ${!pair.fee ? 'invalid' : 'valid'}`}>Enter valid Fee</span>
            </div>
          </div>
        </div>
      </div>
      {numberOfRows === 1 && (
        <div className='button-wrapper'>
          <Button onClick={addNewPair} btnText='+' />
        </div>
      )}
      {row >= 0 && row < numberOfRows - 1 && (
        <div className='button-wrapper'>
          <Button onClick={() => removePair(id)} btnText='-' />
        </div>
      )}
      {row > 0 && row === numberOfRows - 1 && (
        <div className='button-wrapper'>
          <Button onClick={() => removePair(id)} btnText='-' />
          <Button onClick={addNewPair} btnText='+' />
        </div>
      )}
    </div>
  );
};

export default PairRow;
