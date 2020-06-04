import React, { useState, useEffect } from 'react';

import Input from '../../../../common/Input';
import QuestionTitle from '../../../../common/QuestionTitle';

import Emitter from '../../../../../utils/emitter';
import { getNetworkRegex } from '../../../../../utils/addressValidation';

import { useGetStateFromCP } from '../../../../../hooks/useGetStateFromCP';

import { WALLETS } from '../../../../../constants';

import {
  checkIfETHAddressMatchERC20Address,
  checkIfETHSecretMatchERC20Secret,
  checkIfAddressessDoNotMatchRegex,
  checkIfSecretIsMissing,
  checkIfSeedPhraseIsInvalid,
} from '../../../../../utils/validateWalletData';

import './style.scss';

const isBTCWallet = wallet => wallet === 'BTC';

const WalletsSetup = ({ valid, selectedWallets, isButlerStarted, getState }) => {
  const [wallets, setWallets] = useState({});
  const [walletsToShow, setWalletsToShow] = useState([]);
  const [isValid, setIsValid] = useState();
  const [ERC20InvalidAddress, setERC20InvalidAddress] = useState({});
  const [ERC20InvalidSecret, setERC20InvalidSecret] = useState({});
  const [isPrivateKeyShown, setIsPrivateKeyShown] = useState(false);
  const [privateKeyValue, setPrivateKeyValue] = useState('');
  const [isSeedPhraseInvalid, setIsSeedPhraseInvalid] = useState(false);

  useGetStateFromCP(isButlerStarted, getState, { WALLETS: wallets });

  useEffect(() => {
    if (valid) {
      setIsValid(valid);
    }
  }, [valid]);

  useEffect(() => {
    if (
      checkIfAddressessDoNotMatchRegex(wallets) ||
      checkIfSecretIsMissing(wallets) ||
      checkIfETHAddressMatchERC20Address(wallets, setERC20InvalidAddress) ||
      checkIfETHSecretMatchERC20Secret(wallets, setERC20InvalidSecret)
    ) {
      setIsValid(false);
      return;
    }

    if (checkIfSeedPhraseIsInvalid(wallets?.BTC)) {
      setIsValid(false);
      setIsSeedPhraseInvalid(true);
      return;
    }

    setIsSeedPhraseInvalid(false);
    setIsValid(true);
  }, [wallets]);

  useEffect(() => {
    setWallets({});

    walletsToShow.forEach(wallet => {
      setWallets(wallets => ({
        ...wallets,
        ...{
          [wallet]: {
            address: wallets[wallet]?.address || selectedWallets?.[wallet]?.ADDRESS || '',
            secret: wallets[wallet]?.secret || selectedWallets?.[wallet]?.SECRET || '',
          },
        },
      }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletsToShow]);

  useEffect(() => {
    if (!selectedWallets) return;

    setIsValid(true);

    Object.keys(selectedWallets).forEach(wallet => {
      const { ADDRESS, SECRET } = selectedWallets[wallet];

      setWallets(wallets => ({
        ...wallets,
        [wallet]: {
          address: ADDRESS,
          secret: SECRET,
        },
      }));
    });
  }, [selectedWallets]);

  new Emitter().on('onPairAdded', payload => {
    const uniqueWallets = new Set();

    Object.keys(payload).forEach(key => {
      const [provide, receive] = key.split('-');

      uniqueWallets.add(WALLETS[provide]);
      uniqueWallets.add(WALLETS[receive]);
    });

    setWalletsToShow([...uniqueWallets]);
  });

  const handleAddressOnChange = (wallet, event) => {
    event.persist();

    setWallets(wallets => ({
      ...wallets,
      [wallet]: { ...wallets[wallet], address: event.target.value },
    }));
  };

  const handleSecretOnChange = (wallet, event) => {
    event.persist();

    setWallets(wallets => ({
      ...wallets,
      [wallet]: { ...wallets[wallet], secret: event.target.value },
    }));
  };

  const toggePrivateKey = privateKey => {
    setIsPrivateKeyShown(!isPrivateKeyShown);
    setPrivateKeyValue(privateKey);
  };

  return (
    <div className='wallets-wrapper'>
      <QuestionTitle isValid={isValid} title='Wallet Setup' />
      {walletsToShow &&
        walletsToShow.map((wallet, idx) => {
          return (
            <div className='wallet-row' key={idx}>
              <div className='wallet'>
                <img src={require(`../../../../../images/tokens/${wallet}.svg`)} alt={wallet} />
                <label htmlFor={wallet}>{wallet}</label>
              </div>

              {wallets[wallet] && (
                <div className='wallet-info-wrapper'>
                  <div className='wallet-address'>
                    <Input
                      type='text'
                      placeholder='Address'
                      value={wallets[wallet]?.address}
                      onChange={event => handleAddressOnChange(wallet, event)}
                      name='address'
                    />
                    {!new RegExp(getNetworkRegex(wallet)).test(wallets[wallet]?.address) && (
                      <p className='errorMsg'>Enter valid {wallet} address</p>
                    )}
                    {ERC20InvalidAddress[wallet] && (
                      <p className='errorMsg address'>Your {wallet} address cannot match ETH address</p>
                    )}
                  </div>
                  <div className='wallet-private-key'>
                    <Input
                      type={
                        isBTCWallet(wallet) || (isPrivateKeyShown && privateKeyValue === wallets[wallet]?.secret)
                          ? 'text'
                          : 'password'
                      }
                      placeholder={isBTCWallet(wallet) ? 'Seed phrase' : 'Private key'}
                      value={wallets[wallet]?.secret}
                      onChange={event => handleSecretOnChange(wallet, event)}
                      name='privateKey'
                      wrapperClassName='wallet-input-wrapper'
                    />
                    {!isBTCWallet(wallet) ? (
                      isPrivateKeyShown && privateKeyValue === wallets[wallet]?.secret ? (
                        <span>
                          <i className='fas fa-eye-slash' onClick={() => toggePrivateKey(wallets[wallet]?.secret)} />
                        </span>
                      ) : (
                        <span title='Reveal secret key' onClick={() => toggePrivateKey(wallets[wallet]?.secret)}>
                          <i className='fas fa-eye' />
                        </span>
                      )
                    ) : null}

                    {ERC20InvalidSecret[wallet] && (
                      <p className='errorMsg secret'>Your {wallet} secret cannot match ETH secret</p>
                    )}
                    {isBTCWallet(wallet) && isSeedPhraseInvalid && (
                      <p className='errorMsg btc-secret'>Please enter 12 words</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default WalletsSetup;
