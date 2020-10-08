import React, { useState, useEffect } from 'react';

import QuestionTitle from '../../../../components/common/QuestionTitle';
import Input from '../../../../components/common/Input';

import { useButlerConfig, useConfig } from '../../../../context/ConfigContext';
import { DEFAULT_CONFIG } from '../../../../constants';

import './style.scss';

const EXCHANGES = ['Binance'];

const Rebalance = () => {
  const [, updateConfig] = useButlerConfig();
  const exchangeConfig = useConfig('EXCHANGE') || DEFAULT_CONFIG.EXCHANGE;

  const [isChecked, setIsChecked] = useState(false);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (isChecked) {
      let valid = false;
      if (exchangeConfig.API_KEY && exchangeConfig.SECRET_KEY && exchangeConfig.NAME) {
        valid = true;
      }
      setIsValid(valid);
    }
  }, [isChecked, exchangeConfig]);

  const handleOnChange = event => {
    event.persist();

    const {
      target: { name, value },
    } = event;

    updateConfig({ EXCHANGE: { ...exchangeConfig, [name]: value } });
  };

  return (
    <div className='rebalance-wrapper'>
      <div className='title-and-rebalance-wrapper'>
        <QuestionTitle isValid={isValid} title='Rebalance' />

        <div className='price-provider-wrapper'>
          {EXCHANGES.map(exchange => {
            return (
              <div className='rebalance-checkbox-wrapper' key={exchange}>
                <label className={isChecked ? 'mark-label' : null} htmlFor='binance'>
                  <input
                    type='checkbox'
                    id='binance'
                    value={exchange}
                    name='NAME'
                    onChange={event => {
                      handleOnChange(event);
                      setIsChecked(!isChecked);
                    }}
                    checked={isChecked}
                  />
                  {exchange}
                  <span className='checkmark'></span>
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {isChecked && (
        <div className='rebalance-input-wrapper'>
          <Input type='text' text='API KEY' name='API_KEY' value={exchangeConfig.API_KEY} onChange={handleOnChange} />

          <Input
            type='text'
            text='SECRET KEY'
            name='SECRET_KEY'
            value={exchangeConfig.SECRET_KEY}
            onChange={handleOnChange}
          />
        </div>
      )}
    </div>
  );
};

export default Rebalance;
