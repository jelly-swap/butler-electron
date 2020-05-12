import React, { useState, useEffect } from 'react';

import PairRow from './PairRow';
import QuestionTitle from '../../../../common/QuestionTitle';

import { useGetStateFromCP } from '../../../../../hooks/useGetStateFromCP';

import { PAIRS } from '../../../../../constants';

import './style.scss';
import Emitter from '../../../../../utils/emitter';

const pairDefaultState = {
  provide: 'ETH',
  receive: 'BTC',
  fee: '',
};

const TradingPairs = ({ selectedPairs, isButlerStarted, getState }) => {
  const [pairs, setPairs] = useState({
    0: { ...pairDefaultState },
  });
  const [existingPairs, setExistingPairs] = useState({});
  const [isInitialState, setIsInitialState] = useState(true);
  const [rowId, setRowId] = useState(0);

  useGetStateFromCP(isButlerStarted, getState, { PAIRS: pairs });

  useEffect(() => {
    const relevantPairsToWallets = Object.entries(existingPairs).filter(([pair, value]) => value > 0);

    new Emitter().emitAll('onReceiveChange', Object.fromEntries(relevantPairsToWallets));
  }, [existingPairs]);

  // Fill the state when is coming from config
  useEffect(() => {
    if (!selectedPairs) return;

    Object.keys(selectedPairs).forEach((pair, idx) => {
      const [provide, receive] = pair.split('-').reverse();
      const { FEE } = selectedPairs[pair];

      const key = provide + '-' + receive;

      setExistingPairs(prevExisting => ({
        ...prevExisting,
        [key]: 1,
      }));

      setPairs(prevPairs => ({
        ...prevPairs,
        [idx]: {
          provide,
          receive,
          fee: FEE,
        },
      }));

      setRowId(rowId => rowId + 1);
    });
  }, [selectedPairs]);

  // Fill the state on add row click
  useEffect(() => {
    if (isInitialState) return;

    setPairs(pairs => ({
      ...pairs,
      [rowId]: { ...pairDefaultState },
    }));

    setExistingPairs(existingPairs => ({
      ...existingPairs,
      'ETH-BTC': existingPairs['ETH-BTC'] ? existingPairs['ETH-BTC']++ : 1,
    }));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowId]);

  const handleProvideOnChange = (pairId, selectedNetwork) => {
    const receive = Object.keys(PAIRS[selectedNetwork])[0];

    const prevSelectedProvideNetwork = pairs[pairId].provide;
    const prevSelectedReceiveNetwork = pairs[pairId].receive;

    setPairs(allPairs => ({
      ...allPairs,
      [pairId]: { ...allPairs[pairId], provide: selectedNetwork, receive },
    }));

    handleExistingPair(prevSelectedProvideNetwork, prevSelectedReceiveNetwork, selectedNetwork, receive);
  };

  const handleReceiveOnChange = (pairId, selectedNetwork) => {
    const prevSelectedReceiveNetwork = pairs[pairId].receive;

    setPairs(allPairs => ({
      ...allPairs,
      [pairId]: { ...allPairs[pairId], receive: selectedNetwork },
    }));

    handleExistingPair(pairs[pairId].provide, prevSelectedReceiveNetwork, pairs[pairId].provide, selectedNetwork);
  };

  const handleFeeOnChange = (pairId, event) => {
    event.persist();

    setPairs(allPairs => ({
      ...allPairs,
      [pairId]: { ...allPairs[pairId], fee: event.target.value },
    }));
  };

  const addNewPair = () => {
    setIsInitialState(false);

    setRowId(rowId + 1);
  };

  const removePair = id => {
    const removedPair = pairs[id];

    /*eslint no-empty-pattern: "off"*/
    const {
      [id]: {},
      ...rest
    } = pairs;

    setPairs(rest);

    setExistingPairs(existingPairs => ({
      ...existingPairs,
      [removedPair.provide + '-' + removedPair.receive]: existingPairs[
        removedPair.provide + '-' + removedPair.receive
      ]--,
    }));
  };

  // Decrement previous pair and increment the new one
  const handleExistingPair = (prevSelectedProvideNetwork, prevSelectedReceiveNetwork, provide, receive) => {
    const currentPairKey = provide + '-' + receive;
    const prevPairKey = prevSelectedProvideNetwork + '-' + prevSelectedReceiveNetwork;

    setExistingPairs({
      ...existingPairs,
      [prevPairKey]: (existingPairs[prevPairKey] -= 1),
      [currentPairKey]: existingPairs[currentPairKey] ? (existingPairs[currentPairKey] += 1) : 1,
    });
  };

  return (
    <div className='trading-pairs-wrapper'>
      <QuestionTitle title='Traiding Pairs' />
      {Object.keys(pairs).map((id, idx) => {
        return (
          <PairRow
            key={id}
            id={id}
            pair={pairs[id]}
            numberOfRows={Object.keys(pairs).length}
            row={idx}
            handleProvideOnChange={handleProvideOnChange}
            handleReceiveOnChange={handleReceiveOnChange}
            handleFeeOnChange={handleFeeOnChange}
            addNewPair={addNewPair}
            removePair={removePair}
            existingPairs={existingPairs}
          />
        );
      })}
    </div>
  );
};

export default TradingPairs;
