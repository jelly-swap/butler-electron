import React, { useState, useEffect } from 'react';

import Input from '../../../../components/common/Input';
import QuestionTitle from '../../../../components/common/QuestionTitle';
import TextHide from '../../../../components/common/TextHide';
import { getAssetImage } from '../../../../images/tokens';

import { useButlerConfig, useConfig } from '../../../../context/ConfigContext';

import { validateAddress } from '../../../../utils';
import { DEFAULT_CONFIG } from '../../../../constants';

import './style.scss';

const WalletsSetup = () => {
  const [, updateConfig] = useButlerConfig();
  const pairsConfig = useConfig('PAIRS') || DEFAULT_CONFIG.PAIRS;
  const walletsConfig = useConfig('WALLETS') || DEFAULT_CONFIG.WALLETS;

  const [walletsToShow, setWalletsToShow] = useState([]);
  const [displayPrivateKey, setPrivateKeyDisplayed] = useState(false);

  useEffect(() => {
    const wallets = {};
    for (const pair in pairsConfig) {
      const [base, quote] = pair.split('-');
      wallets[base] = { ADDRESS: '', SECRET: '', ...walletsConfig[base] };
      wallets[quote] = { ADDRESS: '', SECRET: '', ...walletsConfig[quote] };
    }
    updateConfig({ WALLETS: { ...wallets } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pairsConfig]);

  useEffect(() => {
    setWalletsToShow({ ...walletsConfig });
  }, [walletsConfig]);

  const handleAddressOnChange = (asset, event) => {
    event.persist();
    const address = event.target.value;
    walletsConfig[asset].ADDRESS = address;
    updateConfig({ WALLETS: { ...walletsConfig } });
  };

  const handleSecretOnChange = (asset, event) => {
    event.persist();
    const secret = event.target.value;
    walletsConfig[asset].SECRET = secret;
    updateConfig({ WALLETS: { ...walletsConfig } });
  };

  return (
    <div className='wallets-wrapper'>
      <QuestionTitle isValid={true} title='Wallet Setup' />
      {walletsToShow &&
        Object.entries(walletsToShow).map(([walletName, wallet], idx) => {
          const { ADDRESS, SECRET } = wallet;
          return (
            <div className='wallet-row' key={idx}>
              <div className='wallet'>
                <img src={getAssetImage(walletName)} alt={walletName} />
                <label htmlFor={walletName}>{walletName}</label>
              </div>

              <div className='wallet-info-wrapper'>
                <Input
                  className='address-input'
                  type='text'
                  text='Address'
                  value={ADDRESS}
                  errMessage={validateAddress(walletName, ADDRESS) && `Enter valid ${walletName} address`}
                  onChange={event => handleAddressOnChange(walletName, event)}
                />
                <Input
                  className='private-key-input'
                  type={displayPrivateKey ? 'text' : 'password'}
                  text='Secret'
                  value={SECRET}
                  onChange={event => handleSecretOnChange(walletName, event)}
                />
                {SECRET && (
                  <TextHide display={displayPrivateKey} callback={() => setPrivateKeyDisplayed(!displayPrivateKey)} />
                )}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default WalletsSetup;
