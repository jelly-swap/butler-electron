import React from 'react';
import { useHistory } from 'react-router-dom';

import BasicOptions from './basic';
import AdvancedOptions from './advanced';

import PageWrapper from '../../components/common/PageWrapper';
import ContentWrapper from '../../components/common/ContentWrapper';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import CoinImage from '../../css/background-coins/Coins-button.svg';
import Footer from '../../components/common/Footer';

import { useButlerConfig } from '../../context/ConfigContext';
import { usePassword } from '../../context/PasswordContext';

import { encrypt } from '../../utils/crypto';
import { sendFromRenderer } from '../../utils/electronAPI';
import { BUTLER_EVENTS } from '../../constants';

import './style.scss';

export default () => {
  const history = useHistory();
  const [password] = usePassword();
  const [config] = useButlerConfig();

  const handleOnClick = () => {
    sendFromRenderer(BUTLER_EVENTS.START, config);
    sendFromRenderer(BUTLER_EVENTS.SAVE, encryptSecrets(config, password));
    history.push('/terminal');
  };

  return (
    <PageWrapper>
      <Header displayNav={true} />
      <ContentWrapper className='content-wrapper'>
        <BasicOptions />
        <AdvancedOptions />
      </ContentWrapper>
      <Footer>
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
      </Footer>
    </PageWrapper>
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
