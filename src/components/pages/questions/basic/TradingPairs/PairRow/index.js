import React, { useState } from 'react';

import Input from '../../../../../common/Input';
import SelectMenu from '../../../../../common/SelectMenu';

import { PAIRS } from '../../../../../../constants';

import { validateCurrency } from '../../../../../../utils/enterNumbersOnly';

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
  const [isOpenLeftMenu, setIsOpenLeftMenu] = useState(false);
  const [isOpenRightMenu, setIsOpenRightMenu] = useState(false);

  const openLeftMenu = () => {
    setIsOpenRightMenu(false);
    setIsOpenLeftMenu(isOpen => !isOpen);
  };

  const openRightMenu = () => {
    setIsOpenLeftMenu(false);
    setIsOpenRightMenu(isOpen => !isOpen);
  };

  return (
    <>
      <div className={`pair-row ${isOpenLeftMenu || isOpenRightMenu ? 'row-focused' : null}`} id={id}>
        <div className='left-part'>
          <div className='select-menus'>
            <div className='field-wrapper'>
              <span className='label'>Provide</span>
              <div onClick={openLeftMenu} className={`left-select-menu ${isOpenLeftMenu ? 'opened' : null}`}>
                <div className='selected-asset'>
                  <img src={require(`../../../../../../images/tokens/${pair.provide}.svg`)} alt={pair.provide} />
                  <span>{pair.provide}</span>
                </div>
                <SelectMenu
                  options={Object.keys(PAIRS)}
                  onChange={handleProvideOnChange}
                  id={id}
                  value={pair.provide}
                  isOpen={isOpenLeftMenu}
                />
              </div>
            </div>
            <div className='field-wrapper'>
              <span className='label'>Receive</span>
              <div onClick={openRightMenu} className={`right-select-menu ${isOpenRightMenu ? 'opened' : null}`}>
                <div className='selected-asset'>
                  <img src={require(`../../../../../../images/tokens/${pair.receive}.svg`)} alt={pair.receive} />
                  <span>{pair.receive}</span>
                </div>
                <SelectMenu
                  options={Object.keys(PAIRS[pair.provide])}
                  onChange={handleReceiveOnChange}
                  id={id}
                  value={pair.receive}
                  isOpen={isOpenRightMenu}
                />
              </div>
            </div>
          </div>
          <div className='input-fields'>
            <div className='form-control fee-input'>
              <span>Fee</span>
              <Input
                type='text'
                value={pair.fee}
                onChange={value => handleFeeOnChange(id, value)}
                onKeyDown={validateCurrency}
                placeholder='Fee'
              />
              <span>%</span>
              {/* <span className={`pair-span ${!pair.fee ? 'invalid' : 'valid'}`}>Enter valid Fee</span> */}
            </div>
          </div>
          {((row >= 0 && row < numberOfRows - 1) || (row > 0 && row === numberOfRows - 1)) && (
            <div onClick={() => removePair(id)} className='remove-row-wrapper'>
              <span className='remove-row-btn'>x</span>
            </div>
          )}
        </div>
      </div>
      {existingPairs[pair.provide + '-' + pair.receive] > 1 ? <p className='errorMsg'>Pair already exists</p> : null}
    </>
  );
};

export default PairRow;
