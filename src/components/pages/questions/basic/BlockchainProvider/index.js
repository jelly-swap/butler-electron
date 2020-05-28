import React, { useState, useEffect } from 'react';

import Input from '../../../../common/Input';
import QuestionTitle from '../../../../common/QuestionTitle';

import { useGetStateFromCP } from '../../../../../hooks/useGetStateFromCP';
import { BLOCKCHAIN_PROVIDERS } from '../../../../../constants';

import Emitter from '../../../../../utils/emitter';

import './style.scss';
import Button from '../../../../common/Button';

const GENERATE_KEY_URL = {
  INFURA: 'https://medium.com/jelly-market/how-to-get-infura-api-key-e7d552dd396f',
};

const BlockchainProvider = ({ valid, selectedBlockchainProviders, isButlerStarted, getState }) => {
  const [blockchainProviders, setBlockchainProviders] = useState({});
  const [providersToShow, setProvidersToShow] = useState([]);
  const [isValid, setIsValid] = useState(valid);

  useGetStateFromCP(isButlerStarted, getState, { BLOCKCHAIN_PROVIDER: blockchainProviders });

  useEffect(() => {
    Object.keys(blockchainProviders).forEach(provider => {
      if (!providersToShow.includes(provider)) {
        const {
          [provider]: {},
          ...rest
        } = blockchainProviders;

        setBlockchainProviders({
          ...rest,
        });
      }
    });
    /*eslint no-empty-pattern: "off"*/
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providersToShow]);

  useEffect(() => {
    if (!selectedBlockchainProviders) {
      return;
    }

    setBlockchainProviders({
      ...selectedBlockchainProviders,
    });
  }, [selectedBlockchainProviders]);

  new Emitter().on('updateBlockchainProvider', payload => {
    const uniqueProviders = new Set();

    Object.keys(payload).forEach(key => {
      const [provide, receive] = key.split('-');

      if (BLOCKCHAIN_PROVIDERS[provide]) {
        uniqueProviders.add(BLOCKCHAIN_PROVIDERS[provide]);
      }

      if (BLOCKCHAIN_PROVIDERS[receive]) {
        uniqueProviders.add(BLOCKCHAIN_PROVIDERS[receive]);
      }
    });

    uniqueProviders.forEach(provider => {
      setBlockchainProviders(providers => ({
        ...providers,
        [provider]: blockchainProviders[provider] ? blockchainProviders[provider] : '',
      }));
    });

    setProvidersToShow([...uniqueProviders]);
  });

  useEffect(() => {
    const values = Object.values(blockchainProviders);

    for (const enteredValue of values) {
      if (!enteredValue) {
        setIsValid(false);
        return;
      }
    }

    setIsValid(true);
  }, [blockchainProviders]);

  const handleProviderOnChange = event => {
    event.persist();

    const {
      target: { name, value },
    } = event;

    setBlockchainProviders({
      ...blockchainProviders,
      [name]: value,
    });
  };

  return providersToShow.length ? (
    <div className='blockchain-provider-wrapper'>
      <QuestionTitle title='Blockchain provider' isValid={isValid} />
      <div className='providers-wrapper'>
        {providersToShow.map(provider => {
          return (
            <div key={provider} className='provider-wrapper'>
              <Input
                type='text'
                name={provider}
                onChange={handleProviderOnChange}
                value={blockchainProviders[provider]}
                placeholder={provider}
              />
              <Button
                onClick={() => {
                  const { shell } = window.require('electron');
                  shell.openExternal(GENERATE_KEY_URL[provider]);
                }}
                btnText={`Generate key for ${provider}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  ) : null;
};

export default BlockchainProvider;
