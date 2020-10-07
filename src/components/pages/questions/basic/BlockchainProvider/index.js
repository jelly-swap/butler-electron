import React, { useState, useEffect } from 'react';

import QuestionTitle from '../../../../common/QuestionTitle';
import Input from '../../../../common/Input';
import Button from '../../../../common/Button';

import { useButlerConfig, useConfig } from '../../../../../context/ConfigContext';
import { ERC20_TOKENS } from '../../../../../constants';
import { openLink } from '../../../../../utils/electronAPI';

import './style.scss';

const PROVIDERS = { INFURA: ['ETH', ...ERC20_TOKENS] };

const GENERATE_KEY_URL = {
  INFURA: 'https://medium.com/jelly-market/how-to-get-infura-api-key-e7d552dd396f',
};

const BlockchainProvider = ({ questionState }) => {
  const [config, updateConfig] = useButlerConfig();
  const pairs = useConfig('PAIRS');

  const [providersToShow, setProvidersToShow] = useState({});
  const [isValid, setIsValid] = useState(questionState);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    Object.keys(pairs).forEach(pair => {
      const split = pair.split('-');
      const [base, quote] = split;

      for (const provider in PROVIDERS) {
        if (PROVIDERS[provider].includes(base) || PROVIDERS[provider].includes(quote)) {
          setProvidersToShow({ ...providersToShow, [provider]: true });
          setEnabled(true);
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

    if (value) {
      setIsValid(true);
    }

    updateConfig({ BLOCKCHAIN_PROVIDER: { ...config.BLOCKCHAIN_PROVIDER, [name]: value } });
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
                  value={config.BLOCKCHAIN_PROVIDER[provider]}
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
