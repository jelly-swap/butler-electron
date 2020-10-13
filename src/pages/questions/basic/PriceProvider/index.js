import React, { useState, useEffect } from 'react';

import QuestionTitle from '../../../../components/common/QuestionTitle';
import Input from '../../../../components/common/Input';
import Button from '../../../../components/common/Button';

import { useButlerConfig, useConfig } from '../../../../context/ConfigContext';
import { openLink } from '../../../../utils/electronAPI';
import { DEFAULT_CONFIG } from '../../../../constants';

import './style.scss';

const PRICE_PROVIDERS = ['CryptoCompare', 'Binance'];
const SECRET_KEY = { Binance: true };
const PRICE_PROVIDER_INTERVALS = [10, 15, 30, 60, 90];

const GENERATE_KEY_URL = {
  CryptoCompare: 'https://www.cryptocompare.com/cryptopian/api-keys',
  Binance: 'https://binance.zendesk.com/hc/en-us/articles/360002502072-How-to-create-API',
};

const PriceProvider = () => {
  const [, updateConfig] = useButlerConfig();
  const priceProvider = useConfig('PRICE') || DEFAULT_CONFIG.PRICE;

  const [isIntervalOpen, setIsIntervalOpen] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    let valid = false;

    if (SECRET_KEY[priceProvider.PROVIDER]) {
      if (priceProvider.API_KEY && priceProvider.SECRET_KEY) {
        valid = true;
      }
    } else {
      if (priceProvider.API_KEY) {
        valid = true;
      }
    }

    setIsValid(valid);
  }, [priceProvider]);

  const handleInputOnChange = event => {
    event.persist && event.persist();

    const {
      target: { name, value },
    } = event;

    updateConfig({ PRICE: { ...priceProvider, [name]: value } });
  };

  return (
    <div className='price-provider'>
      <div className='title-and-provider-wrapper'>
        <QuestionTitle isValid={isValid} title='Price Provider' />

        <div className='price-provider-wrapper'>
          {PRICE_PROVIDERS.map(provider => {
            return (
              <div className='current-provider' key={provider}>
                <input
                  id={provider}
                  value={provider}
                  type='radio'
                  name='PROVIDER'
                  onChange={handleInputOnChange}
                  checked={priceProvider.PROVIDER === provider}
                />

                <label htmlFor={provider}>{provider}</label>
              </div>
            );
          })}
        </div>
      </div>
      <div className={`price-provider-inputs-wrapper ${SECRET_KEY[priceProvider.PROVIDER] ? "binance" : ""}`}>
        <div className='price-provider-input-wrapper'>
          <Input
            type='text'
            value={priceProvider.API_KEY}
            onChange={handleInputOnChange}
            name='API_KEY'
            text='API KEY'
          />
        </div>

        {SECRET_KEY[priceProvider.PROVIDER] && (
          <div className='price-provider-input-wrapper'>
            <Input
              type='text'
              value={priceProvider.SECRET_KEY}
              onChange={handleInputOnChange}
              name='SECRET_KEY'
              text='SECRET KEY'
            />
          </div>
        )}
      </div>

      <div className='bottom-row'>
        <div className='price-provider-input-wrapper'>
          <p>Price interval update</p>

          <p className={'selected-interval'} onClick={() => setIsIntervalOpen(isIntervalOpen => !isIntervalOpen)}>
            {priceProvider.UPDATE_INTERVAL} sec.
          </p>

          {isIntervalOpen && (
            <div className='interval-menu'>
              {PRICE_PROVIDER_INTERVALS.map(interval => (
                <div
                  onClick={() => {
                    if (interval) {
                      handleInputOnChange({ target: { name: 'UPDATE_INTERVAL', value: interval } });
                      setIsIntervalOpen(false);
                    }
                  }}
                  key={interval}
                >
                  <p>{interval}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className='generate-url'>
          <Button
            onClick={() => {
              openLink(GENERATE_KEY_URL[priceProvider.PROVIDER]);
            }}
            content={`Generate key for ${priceProvider.PROVIDER}`}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceProvider;
