import React, { useState, useRef } from 'react';

import { useClickOutsideElement } from '../../../hooks/useClickOutside';

import Arrow from '../../../images/purple-arrow.svg';
import Search from '../../../images/search.png';
import { getAssetImage } from '../../../images/tokens';

import './style.scss';

const listedItems = 7;

const toggleScroll = (dataLength, currencyListRef) => {
  dataLength < listedItems
    ? (currencyListRef.current.style.overflowY = 'hidden')
    : (currencyListRef.current.style.overflowY = 'scroll');
};

export default ({ className, currencies, currency, selectorUpdate }) => {
  const [availableCurrencies, setAvailableCurrencies] = useState(currencies);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [search, setSearch] = useState('');
  const currencyListRef = useRef(null);
  const menuWrapperRef = useRef(null);

  const handleClickOutside = event => {
    if (menuWrapperRef.current && !menuWrapperRef.current.contains(event.target)) {
      setIsOpenDropdown(false);
    }
  };

  useClickOutsideElement(handleClickOutside);

  const openCurrencyList = () => {
    setIsOpenDropdown(!isOpenDropdown);
    setAvailableCurrencies(currencies);
    setSearch('');
  };

  const setNewSelectedCurrency = value => {
    selectorUpdate(value);
    setIsOpenDropdown(false);
  };

  const handleInputOnChange = event => {
    const {
      target: { value },
    } = event;

    const data = value === '' ? currencies : currencies.filter(currency => currency.includes(value.toUpperCase()));

    toggleScroll(data.length, currencyListRef);

    setAvailableCurrencies(data);
    setSearch(value);
  };

  return (
    <>
      <div className='currency-wrapper'>
        <div onClick={openCurrencyList} className={`selected-currency ${className}`}>
          <img className='token-img' src={getAssetImage(currency)} alt='' />
          <img className={isOpenDropdown ? 'arrow open-dropdown' : 'arrow'} src={Arrow} alt='DropdownArrow' />
        </div>

        {isOpenDropdown && (
          <div ref={menuWrapperRef} className='menu-wrapper'>
            <div className='search-wrapper'>
              <button className='current-token' onClick={() => setIsOpenDropdown(!isOpenDropdown)}>
                <img src={getAssetImage(currency)} alt='' />
                <img className={'arrow'} src={Arrow} alt='DropdownArrow' />
              </button>
              <div className='search'>
                <input value={search} onChange={handleInputOnChange} />
                <img src={Search} alt='Search' />
              </div>
            </div>
            <div
              style={{
                overflowY: availableCurrencies.length > 6 ? 'scroll' : 'none',
              }}
              className='currency-list'
              ref={currencyListRef}
            >
              {Object.values(availableCurrencies).map((asset, idx) => {
                return (
                  <button className='currency-item' onClick={() => setNewSelectedCurrency(asset)} key={idx}>
                    <div>
                      <img
                        className='selector-options-logo'
                        src={getAssetImage(asset)}
                        alt={'token'}
                        draggable='false'
                      />
                      <p>{asset}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
