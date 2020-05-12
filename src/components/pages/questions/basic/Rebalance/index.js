import React, { useState, useEffect } from 'react';

import QuestionTitle from '../../../../common/QuestionTitle';
import Input from '../../../../common/Input';

import { useGetStateFromCP } from '../../../../../hooks/useGetStateFromCP';

import './style.scss';

const Rebalance = ({ selectedRebalance, isButlerStarted, getState }) => {
  const [rebalance, setRebalance] = useState();
  const [isChecked, setIsChecked] = useState(false);

  useGetStateFromCP(isButlerStarted, getState, { REBALANCE: rebalance });

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

  const handleOnChange = event => {
    event.persist();

    const {
      target: { checked, value },
    } = event;

    checked ? setRebalance({ [value]: { apiKey: '', secretKey: '' } }) : setRebalance({});
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
