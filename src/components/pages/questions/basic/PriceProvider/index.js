import React, { useState, useEffect } from 'react';

import Input from '../../../../common/Input';
import QuestionTitle from '../../../../common/QuestionTitle';

import { PRICE_PROVIERS } from '../../../../../constants';

import { useGetStateFromCP } from '../../../../../hooks/useGetStateFromCP';

import './style.scss';

const PriceProvider = ({ selectedPriceProvider, isButlerStarted, getState }) => {
  const [priceProvider, setPriceProvider] = useState({});

  const getSelectedPriceProvider = () => {
    return Object.keys(priceProvider)[0];
  };

  useEffect(() => {
    if (!selectedPriceProvider) return;

    const { PROVIDER, API_KEY, SECRET_KEY } = selectedPriceProvider;

    setPriceProvider({
      [PROVIDER]: {
        apiKey: API_KEY,
        secretKey: SECRET_KEY,
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
      },
    });
  };

  const handleApiKeyOnChange = event => {
    event.persist();

    const {
      target: { name, value },
    } = event;

    setPriceProvider({
      [name]: {
        ...priceProvider[name],
        apiKey: value,
      },
    });
  };

  const handleSecretKeyOnChange = event => {
    event.persist();

    const {
      target: { name, value },
    } = event;

    setPriceProvider({
      [name]: {
        ...priceProvider[name],
        secretKey: value,
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
      {getSelectedPriceProvider() === 'CryptoCompare' && (
        <div className='price-provider-input-wrapper'>
          <Input
            type='text'
            value={priceProvider[getSelectedPriceProvider()].apiKey}
            onChange={handleApiKeyOnChange}
            name={getSelectedPriceProvider()}
            placeholder='API KEY'
            className='price-provider-api'
          />
        </div>
      )}
      {getSelectedPriceProvider() === 'Binance' && (
        <div className='price-provider-input-wrapper'>
          <Input
            type='text'
            value={priceProvider[getSelectedPriceProvider()].apiKey}
            onChange={handleApiKeyOnChange}
            name={getSelectedPriceProvider()}
            placeholder='API KEY'
            className='price-provider-api'
          />
          <Input
            type='text'
            value={priceProvider[getSelectedPriceProvider()].secretKey}
            onChange={handleSecretKeyOnChange}
            name={getSelectedPriceProvider()}
            placeholder='SECRET KEY'
            className='price-provider-secret'
          />
        </div>
      )}
    </div>
  );
};

export default PriceProvider;
