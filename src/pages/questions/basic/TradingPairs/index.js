import React, { useEffect, useState } from 'react';

import PairRow from './PairRow';
import QuestionTitle from '../../../../components/common/QuestionTitle';

import { useButlerConfig, useConfig } from '../../../../context/ConfigContext';
import { DEFAULT_CONFIG } from '../../../../constants';

import './style.scss';

const defaultPair = { name: 'BTC-ETH', provide: 'ETH', receive: 'BTC', fee: '', price: '' };

const TradingPairs = () => {
  const [, updateConfig] = useButlerConfig();
  const pairsConfig = useConfig('PAIRS') || DEFAULT_CONFIG.PAIRS;

  const [pairs, setPairs] = useState(parsePairs(pairsConfig));
  const [existingPairs, setExistingPairs] = useState({});

  useEffect(() => {
    const result = pairs.reduce(
      (result, pair) => {
        if (result.pairs[pair.name]) {
          result.duplicates[pair.name] = true;
        } else {
          result.pairs[pair.name] = { FEE: pair.fee || 0, PRICE: pair.price || 0 };
        }

        return result;
      },
      { pairs: {}, duplicates: {} },
    );

    setExistingPairs({ ...result.duplicates });
    updateConfig({ PAIRS: fixPairsFee(result.pairs) });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pairs]);

  const handleProvideOnChange = (id, provide) => {
    const newPairs = [...pairs];
    newPairs[id] = { ...newPairs[id], provide, name: `${newPairs[id].receive}-${provide}` };
    setPairs(newPairs);
  };

  const handleReceiveOnChange = (id, receive) => {
    const newPairs = [...pairs];
    newPairs[id] = { ...newPairs[id], receive, name: `${receive}-${newPairs[id].provide}` };
    setPairs(newPairs);
  };

  const handleFeeOnChange = (id, event) => {
    const fee = event.target.value;
    const newPairs = [...pairs];
    newPairs[id] = { ...newPairs[id], fee };
    setPairs(newPairs);
  };

  const handlePriceOnChange = (id, event) => {
    const price = event.target.value;
    const newPairs = [...pairs];
    newPairs[id] = { ...newPairs[id], price };
    setPairs(newPairs);
  };

  const addNewPair = () => setPairs(oldArray => [...oldArray, defaultPair]);

  const handleRemoval = id => {
    const newPairs = [...pairs];
    newPairs.splice(id, 1);
    setPairs(newPairs);
  };

  return (
    <div className='trading-pairs-wrapper'>
      <div className='title-wrapper'>
        <QuestionTitle title='Traiding Pairs' isValid={true} />
        <span className='add-new-pair' onClick={addNewPair}>
          Add new pair +
        </span>
      </div>

      {pairs.map((pair, idx) => {
        return (
          <PairRow
            key={idx}
            id={idx}
            pair={pair}
            numberOfRows={pairs.length}
            handleProvideOnChange={handleProvideOnChange}
            handleReceiveOnChange={handleReceiveOnChange}
            handleFeeOnChange={handleFeeOnChange}
            handlePriceOnChange={handlePriceOnChange}
            handleRemoval={handleRemoval}
            existingPairs={existingPairs}
          />
        );
      })}
    </div>
  );
};

export default TradingPairs;

const parsePairs = pairs => {
  return Object.keys(pairs).reduce((result, pairName) => {
    const pair = pairs[pairName];
    const [receive, provide] = pairName.split('-');
    result.push({
      provide,
      receive,
      fee: pair.FEE * 100,
      price: pair.PRICE,
      name: `${receive}-${provide}`,
    });
    return result;
  }, []);
};

const fixPairsFee = pairs => {
  const fixedPairs = { ...pairs };
  for (const pair in pairs) {
    const fee = pairs[pair].FEE / 100;
    fixedPairs[pair].FEE = fee;
  }

  return fixedPairs;
};
