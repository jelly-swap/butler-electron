import React, { useState, useEffect } from 'react';

import QuestionTitle from '../../../../common/QuestionTitle';
import Input from '../../../../common/Input';

import { useGetStateFromCP } from '../../../../../hooks/useGetStateFromCP';

import './style.scss';
import Emitter from '../../../../../utils/emitter';

const Rebalance = ({ selectedRebalance, isButlerStarted, getState }) => {
  const [rebalance, setRebalance] = useState();
  const [isChecked, setIsChecked] = useState(false);
  const [selectedPriceProvider, setSelectedPriceProvider] = useState('');
  const [apiFromPriceProvider, setApiFromPriceProvider] = useState('');
  const [secretFromPriceProvider, setSecretFromPriceProvider] = useState('');

  useGetStateFromCP(isButlerStarted, getState, { EXCHANGE: rebalance });

  useEffect(() => {
    if (!selectedRebalance) return;

    const { NAME, API_KEY, SECRET_KEY } = selectedRebalance;

    setRebalance({
      [NAME]: {
        apiKey: API_KEY,
        secretKey: SECRET_KEY,
      },
    });
    setIsChecked(true);
  }, [selectedRebalance]);

  useEffect(() => {
    new Emitter().emitAll('onRebalanceChange', rebalance);

    new Emitter().on('onPriceProviderChange', priceProvider => {
      const _selectedPriceProvider = Object.keys(priceProvider)[0];

      setSelectedPriceProvider(_selectedPriceProvider);

      if (_selectedPriceProvider === 'Binance') {
        const { apiKey, secretKey } = priceProvider.Binance;

        setApiFromPriceProvider(apiKey);
        setSecretFromPriceProvider(secretKey);
      }
    });
  }, [rebalance]);

  useEffect(() => {
    if (selectedPriceProvider !== 'Binance' && rebalance && !Object.keys(rebalance).length) {
      setApiFromPriceProvider('');
      setSecretFromPriceProvider('');
    }
  }, [selectedPriceProvider, rebalance]);

  useEffect(() => {
    if (rebalance) {
      setRebalance({
        Binance: {
          apiKey: apiFromPriceProvider,
          secretKey: secretFromPriceProvider,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiFromPriceProvider, secretFromPriceProvider]);

  const handleOnChange = event => {
    event.persist();

    const {
      target: { checked, value },
    } = event;

    checked
      ? setRebalance({ [value]: { apiKey: apiFromPriceProvider, secretKey: secretFromPriceProvider } })
      : setRebalance({});
    setIsChecked(checked);
  };

  const handleKeyOnChange = event => {
    event.persist();

    const {
      target: { name, value },
    } = event;

    setRebalance({
      Binance: {
        ...rebalance['Binance'],
        [name]: value,
      },
    });
  };

  return (
    <div className='rebalance-wrapper'>
      <QuestionTitle title='Rebalance' />
      <div className='rebalance-checkbox-wrapper'>
        <Input type='checkbox' id='binance' value='Binance' onChange={handleOnChange} checked={isChecked} />
        <label htmlFor='binance'>Binance</label>
      </div>
      {isChecked && (
        <div className='rebalance-input-wrapper'>
          <Input
            type='text'
            placeholder='API_KEY'
            name='apiKey'
            value={rebalance['Binance'].apiKey}
            onChange={handleKeyOnChange}
          />
          <Input
            type='text'
            placeholder='SECRET KEY'
            name='secretKey'
            value={rebalance['Binance'].secretKey}
            onChange={handleKeyOnChange}
          />
        </div>
      )}
    </div>
  );
};

export default Rebalance;
