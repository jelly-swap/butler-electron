import React from 'react';
import { BUTLER_EVENTS } from '../../constants';
import { useButlerConfig } from '../../context/ConfigContext';
import { usePassword } from '../../context/PasswordContext';
import { encrypt } from '../../utils/crypto';
import { sendFromRenderer } from '../../utils/electronAPI';

import Button from '../common/Button';
import CoinImage from '../../css/background-coins/Coins-button.svg';

import './_style.scss';

export default () => {
  const [password] = usePassword();
  const [config] = useButlerConfig();

  const handleOnClick = () => {
    sendFromRenderer(BUTLER_EVENTS.START, config);
    sendFromRenderer(BUTLER_EVENTS.SAVE, encryptSecrets(config, password));
  };

  return (
    <Button
      color='red'
      className='start-button'
      content={
        <>
          <span>Start</span>
          <img src={CoinImage} alt='coin' />
        </>
      }
      onClick={handleOnClick}
    />
  );
};

const encryptSecrets = (config, password) => {
  const decryptedConfig = { ...config };

  if (config.WALLETS) {
    for (const asset in config.WALLETS) {
      const secret = config.WALLETS[asset]?.SECRET;
      if (secret) {
        const result = encrypt(secret, password);
        if (result) {
          decryptedConfig.WALLETS[asset].SECRET = result;
        } else {
          throw new Error('ERROR_ENCRYPTING');
        }
      }
    }
  }

  return decryptedConfig;
};
