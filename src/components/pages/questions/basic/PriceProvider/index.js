import React, { useState, useEffect } from 'react';

import Input from '../../../../common/Input';
import QuestionTitle from '../../../../common/QuestionTitle';

import { PRICE_PROVIERS } from '../../../../../constants';

import { useGetStateFromCP } from '../../../../../hooks/useGetStateFromCP';

import './style.scss';

/*eslint no-useless-concat: "off"*/

const PriceProvider = ({ selectedPriceProvider, isButlerStarted, getState }) => {
  const [priceProvider, setPriceProvider] = useState({});

  const getSelectedPriceProvider = () => {
    return Object.keys(priceProvider)[0];
  };

  useEffect(() => {
    if (!selectedPriceProvider) return;

    const { PROVIDER, API_KEY, SECRET_KEY, INTERVAL } = selectedPriceProvider;

    setPriceProvider({
      [PROVIDER]: {
        apiKey: API_KEY,
        secretKey: SECRET_KEY,
        interval: INTERVAL,
      },
    });
  }, [selectedPriceProvider]);

  useGetStateFromCP(isButlerStarted, getState, { PRICE_PROVIDER: priceProvider });

  const handleProviderOnChange = event => {
    event.persist();

    setPriceProvider({
      [event.target.value]: {
        apiKey: '',
        secretKey: '',
        interval: 30,
      },
    });
  };

  const handleInputOnChange = event => {
    event.persist();

    const {
      target: { name, value },
    } = event;

    const [priceProviderName, prop] = name.split(' - ');

    setPriceProvider({
      [priceProviderName]: {
        ...priceProvider[priceProviderName],
        [prop]: value,
      },
    });
  };

  return (
    <div className='price-provider'>
      <QuestionTitle title='Price Provider' />
      <div className='price-provider-wrapper'>
        {PRICE_PROVIERS.map((provider, idx) => {
          return (
            <div key={provider}>
              <Input
                id={provider}
                value={provider}
                type='radio'
                onChange={handleProviderOnChange}
                checked={getSelectedPriceProvider() === provider}
              />
              <label htmlFor={provider}>{provider}</label>
            </div>
          );
        })}
      </div>
      {getSelectedPriceProvider() && (
        <div className='price-provider-input-wrapper'>
          <Input
            type='text'
            value={priceProvider[getSelectedPriceProvider()].apiKey}
            onChange={handleInputOnChange}
            name={getSelectedPriceProvider() + ' - ' + 'apiKey'}
            placeholder='API KEY'
            className='price-provider-api'
          />
        </div>
      )}
      {getSelectedPriceProvider() === 'Binance' && (
        <div className='price-provider-input-wrapper'>
          <Input
            type='text'
            value={priceProvider[getSelectedPriceProvider()].secretKey}
            onChange={handleInputOnChange}
            name={getSelectedPriceProvider() + ' - ' + 'secretKey'}
            placeholder='SECRET KEY'
            className='price-provider-secret'
          />
        </div>
      )}
      {getSelectedPriceProvider() && (
        <div className='price-provider-input-wrapper'>
          <Input
            type='number'
            value={priceProvider[getSelectedPriceProvider()].interval}
            onChange={handleInputOnChange}
            name={getSelectedPriceProvider() + ' - ' + 'interval'}
            placeholder='Interval'
            className='price-provider-secret'
          />
        </div>
      )}
    </div>
  );
};

export default PriceProvider;
