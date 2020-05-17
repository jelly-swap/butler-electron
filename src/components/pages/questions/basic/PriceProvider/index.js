import React, { useState, useEffect } from 'react';

import Input from '../../../../common/Input';
import QuestionTitle from '../../../../common/QuestionTitle';

import { PRICE_PROVIERS } from '../../../../../constants';

import { useGetStateFromCP } from '../../../../../hooks/useGetStateFromCP';

import './style.scss';
import Emitter from '../../../../../utils/emitter';

/*eslint no-useless-concat: "off"*/

const PriceProvider = ({ valid, selectedPriceProvider, isButlerStarted, getState }) => {
  const [priceProvider, setPriceProvider] = useState({
    CryptoCompare: {
      apiKey: '',
      interval: 30,
    },
  });
  const [apiFromRebalance, setApiFromRebalance] = useState('');
  const [secretFromRebalance, setSecretFromRebalance] = useState('');
  const [isValid, setIsValid] = useState();

  useEffect(() => {
    if (valid) {
      setIsValid(valid);
    }
  }, [valid]);

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

  useEffect(() => {
    new Emitter().on('onRebalanceChange', rebalance => {
      if (rebalance && Object.keys(rebalance).length) {
        const { apiKey, secretKey } = rebalance.Binance;

        setApiFromRebalance(apiKey);
        setSecretFromRebalance(secretKey);
      } else if (!rebalance && getSelectedPriceProvider() !== 'Binance') {
        setApiFromRebalance('');
        setSecretFromRebalance('');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const keys = priceProvider && Object.keys(priceProvider);

    if (keys.length && keys[0] === 'Binance') {
      setPriceProvider({
        Binance: {
          interval: priceProvider.Binance.interval,
          apiKey: apiFromRebalance,
          secretKey: secretFromRebalance,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiFromRebalance, secretFromRebalance]);

  useEffect(() => {
    new Emitter().emitAll('onPriceProviderChange', priceProvider);

    if (
      getSelectedPriceProvider() === 'Binance' &&
      (!priceProvider.Binance.secretKey || !priceProvider.Binance.apiKey || !priceProvider.Binance.interval)
    ) {
      setIsValid(false);
      return;
    }

    if (
      getSelectedPriceProvider() &&
      (!priceProvider[getSelectedPriceProvider()].apiKey || !priceProvider[getSelectedPriceProvider()].interval)
    ) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
  }, [priceProvider]);

  useGetStateFromCP(isButlerStarted, getState, { PRICE_PROVIDER: priceProvider });

  const handleProviderOnChange = event => {
    event.persist();

    const {
      target: { value },
    } = event;

    setPriceProvider({
      [value]: {
        apiKey: value === 'Binance' ? apiFromRebalance : '',
        secretKey: value === 'Binance' ? secretFromRebalance : '',
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
      <div className='title-and-provider-wrapper'>
        <QuestionTitle title='Price Provider' />
        <div className='price-provider-wrapper'>
          {PRICE_PROVIERS.map((provider, idx) => {
            return (
              <div className='current-provider' key={provider}>
                <Input
                  id={provider}
                  value={provider}
                  type='radio'
                  onChange={handleProviderOnChange}
                  checked={getSelectedPriceProvider() === provider}
                />
                <label htmlFor={provider}>{provider}</label>
                <div className={`check`}></div>
              </div>
            );
          })}
        </div>
      </div>
      <div className='price-provider-inputs-wrapper'>
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
    </div>
  );
};

export default PriceProvider;
