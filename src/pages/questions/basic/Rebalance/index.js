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

  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (exchangeConfig.NAME) {
      let valid = false;
      if (exchangeConfig.API_KEY && exchangeConfig.SECRET_KEY) {
        valid = true;
      }
      setIsValid(valid);
    }
  }, [exchangeConfig]);

  const handleOnChange = event => {
    event.persist && event.persist();

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
                <label className={exchangeConfig.NAME ? 'mark-label' : null} htmlFor='binance'>
                  <input
                    type='checkbox'
                    id='binance'
                    onChange={event => {
                      handleOnChange({
                        ...event,
                        target: { name: 'NAME', value: exchangeConfig.NAME ? '' : exchange },
                      });
                    }}
                    checked={exchangeConfig.NAME && true}
                  />
                  {exchange}
                  <span className='checkmark'></span>
                </label>
              </div>
            );
          })}
        </div>
      </div>

      <div className='rebalance-input-wrapper'>
        <Input
          type='text'
          text='API KEY'
          name='API_KEY'
          value={exchangeConfig.API_KEY}
          errMessage={
            exchangeConfig.NAME && !exchangeConfig.API_KEY ? `Please enter ${exchangeConfig.NAME} Api Key` : ''
          }
          onChange={handleOnChange}
          disabled={!exchangeConfig.NAME}
        />

        <Input
          type='text'
          text='SECRET KEY'
          name='SECRET_KEY'
          value={exchangeConfig.SECRET_KEY}
          errMessage={
            exchangeConfig.NAME && !exchangeConfig.SECRET_KEY ? `Please enter ${exchangeConfig.NAME} Secret Key` : ''
          }
          onChange={handleOnChange}
          disabled={!exchangeConfig.NAME}
        />
      </div>
    </div>
  );
};

export default Rebalance;
