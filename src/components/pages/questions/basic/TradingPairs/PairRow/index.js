import React, { useState, useRef } from 'react';

import Input from '../../../../../common/Input';
import SelectMenu from '../../../../../common/SelectMenu';
import Button from '../../../../../common/Button';

import { PAIRS } from '../../../../../../constants';

import { validateCurrency } from '../../../../../../utils/enterNumbersOnly';

import { useListenForClickOutsideElement } from '../../../../../../hooks/useListenForClickOutsideElement';

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
  // const leftSelectMenuRef = useRef(null);
  // const rightSelectMenuRef = useRef(null);

  const openLeftMenu = () => {
    setIsOpenRightMenu(false);
    setIsOpenLeftMenu(isOpen => !isOpen);
  };

  const openRightMenu = () => {
    setIsOpenLeftMenu(false);
    setIsOpenRightMenu(isOpen => !isOpen);
  };

  const handleClickOutside = () => {
    setIsOpenLeftMenu(false);
    setIsOpenRightMenu(false);
  };

  // useListenForClickOutsideElement(handleClickOutside);

  return (
    <div className={`pair-row ${isOpenLeftMenu || isOpenRightMenu ? 'row-focused' : null}`} id={id}>
      <div className='left-part'>
        <div className='select-menus'>
          <div className='field-wrapper'>
            <span className='label'>Provide</span>
            <div onClick={openLeftMenu} className={`left-select-menu ${isOpenLeftMenu ? 'opened' : null}`}>
              <div className='selected-asset'>
                <img src={require(`../../../../../../images/tokens/${pair.provide}.svg`)} />
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
                <img src={require(`../../../../../../images/tokens/${pair.receive}.svg`)} />
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
              <span>%</span>
              {/* <span className={`pair-span ${!pair.fee ? 'invalid' : 'valid'}`}>Enter valid Fee</span> */}
            </div>
          </div>
        </div>
      </div>
      {((row >= 0 && row < numberOfRows - 1) || (row > 0 && row === numberOfRows - 1)) && (
        <div onClick={() => removePair(id)} className='remove-row-wrapper'>
          <span className='remove-row-btn'>x</span>
        </div>
      )}
    </div>
  );
};

export default PairRow;
