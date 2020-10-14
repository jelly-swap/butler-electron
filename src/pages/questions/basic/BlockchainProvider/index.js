import React, { useState, useEffect } from 'react';

import QuestionTitle from '../../../../components/common/QuestionTitle';
import Input from '../../../../components/common/Input';
import Button from '../../../../components/common/Button';

import { useButlerConfig, useConfig } from '../../../../context/ConfigContext';
import { DEFAULT_CONFIG, ERC20_TOKENS } from '../../../../constants';
import { openLink } from '../../../../utils/electronAPI';

import './style.scss';

const PROVIDERS = { INFURA: ['ETH', ...ERC20_TOKENS] };

const GENERATE_KEY_URL = {
  INFURA: 'https://medium.com/jelly-market/how-to-get-infura-api-key-e7d552dd396f',
};

const BlockchainProvider = () => {
  const [, updateConfig] = useButlerConfig();
  const blockchainProviders = useConfig('BLOCKCHAIN_PROVIDER') || DEFAULT_CONFIG.BLOCKCHAIN_PROVIDER;
  const pairs = useConfig('PAIRS') || DEFAULT_CONFIG.PAIRS;

  const [providersToShow, setProvidersToShow] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useState(() => {
    let _isValid = true;
    for (const provider in PROVIDERS) {
      if (!blockchainProviders[provider]) {
        _isValid = false;
      }
    }
    setIsValid(_isValid);
  }, [blockchainProviders]);

  useEffect(() => {
    Object.keys(pairs).forEach(pair => {
      const split = pair.split('-');
      const [base, quote] = split;

      for (const provider in PROVIDERS) {
        if (PROVIDERS[provider].includes(base) || PROVIDERS[provider].includes(quote)) {
          setProvidersToShow({ ...providersToShow, [provider]: true });
          setEnabled(true);
        } else {
          setEnabled(false);
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pairs]);

  const handleProviderOnChange = event => {
    event.persist();

    const {
      target: { name, value },
    } = event;

    if (!value) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }

    updateConfig({ BLOCKCHAIN_PROVIDER: { ...blockchainProviders, [name]: value } });
  };

  return (
    enabled && (
      <div className='blockchain-provider-wrapper'>
        <QuestionTitle title='Blockchain provider' isValid={isValid} />

        {Object.keys(PROVIDERS).map(provider => {
          return (
            providersToShow[provider] && (
              <div key={provider} className='provider-wrapper'>
                <Input
                  type='text'
                  name={provider}
                  onChange={handleProviderOnChange}
                  errMessage={isValid ? '' : 'Please provide Infura url'}
                  value={blockchainProviders[provider]}
                  text={provider}
                />
                <Button
                  onClick={() => {
                    openLink(GENERATE_KEY_URL[provider]);
                  }}
                  content={`Generate key for ${provider}`}
                />
              </div>
            )
          );
        })}
      </div>
    )
  );
};

export default BlockchainProvider;
