import React, { useState } from 'react';

import Input from '../../../../../common/Input';
import SelectMenu from '../../../../../common/SelectMenu';

import { PAIRS } from '../../../../../../constants';

import { validateCurrency } from '../../../../../../utils/enterNumbersOnly';
import Tooltip from 'react-tooltip-lite';

const PairRow = ({
  id,
  pair,
  row,
  numberOfRows,
  handleProvideOnChange,
  handleReceiveOnChange,
  handleFeeOnChange,
  handlePriceOnChange,
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
            <div className='fee-input'>
              <span>Fee</span>
              <Input
                type='text'
                value={pair.fee}
                onChange={value => handleFeeOnChange(id, value)}
                onKeyDown={validateCurrency}
                placeholder='Fee'
              />
              <span>%</span>
            </div>

            <div className='price-input'>
              <span>Price</span>

              <Input
                type='text'
                value={pair.price}
                onChange={value => handlePriceOnChange(id, value)}
                onKeyDown={validateCurrency}
                placeholder='Price'
              />
            </div>
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
                      <strong>Example 1:</strong> If you provide USDC and you want to receive BTC, you have to put the
                      price in USDC for 1 BTC (e.g. 11300 USDC)
                    </p>
                    <br></br>
                    <p>
                      <strong>Example 2:</strong> If you provide BTC and you want to receive USDC, you have to put the
                      price in BTC for 1 USDC (e.g. 0.00008635 BTC)
                    </p>
                    <br></br>
                    <p>
                      <strong>Example 3:</strong> If you set the price for BTC-USDC to 11000 and the current market
                      price is 10000, users will not be able to swap with you (unless you're the only LP for that pair
                      and they agree on the price). If the price changes to 12000, users will most likely want to swap
                      with you, because you provide a price which is better than the current market price.
                    </p>
                  </div>
                }
              >
                <i class='fas fa-info-circle'></i>
              </Tooltip>
            </span>
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
