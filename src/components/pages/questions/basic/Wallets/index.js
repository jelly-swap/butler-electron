import React, { useState, useEffect } from 'react';

import Input from '../../../../common/Input';
import QuestionTitle from '../../../../common/QuestionTitle';

import { WALLETS } from '../../../../../constants';

import Emitter from '../../../../../utils/emitter';
import { getNetworkRegex } from '../../../../../utils/addressValidation';

import { useGetStateFromCP } from '../../../../../hooks/useGetStateFromCP';

import './style.scss';

const WalletsSetup = ({ selectedWallets, isButlerStarted, getState }) => {
  const [wallets, setWallets] = useState({});
  const [receiveCounter, setReceiveCounter] = useState({});

  new Emitter().on('onReceiveChange', payload => setReceiveCounter(payload));

  useGetStateFromCP(isButlerStarted, getState, { WALLETS: wallets });

  useEffect(() => {
    if (!selectedWallets) return;

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

  const onWalletSelected = event => {
    event.persist();
    const {
      target: { value, checked },
    } = event;

    if (checked) {
      setWallets({
        ...wallets,
        [value]: { address: '', secret: '' },
      });
    } else {
      const {
        [value]: {},
        ...rest
      } = wallets;

      setWallets(rest);
    }
  };

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

  return (
    <div className='wallets-wrapper'>
      <QuestionTitle title='Wallet Setup' />
      {WALLETS.map(wallet => {
        return (
          <div className='wallet-row' key={wallet}>
            <div className='wallet'>
              <Input
                id={wallet}
                type='checkbox'
                value={wallet}
                onChange={onWalletSelected}
                checked={wallets[wallet] ? wallets[wallet] : false}
              />
              <label
                htmlFor={wallet}
                className={
                  !receiveCounter[wallet]
                    ? 'default'
                    : (!wallets[wallet] && receiveCounter[wallet] >= 1) ||
                      (wallets[wallet] && !new RegExp(getNetworkRegex(wallet)).test(wallets[wallet].address)) ||
                      (wallets[wallet] && !wallets[wallet].secret)
                    ? 'invalid'
                    : 'valid'
                }
              >
                {wallet}
              </label>
            </div>
            {wallets[wallet] && (
              <div className='wallet-info-wrapper'>
                <div className='wallet-address'>
                  <Input
                    type='text'
                    placeholder='Address'
                    value={wallets[wallet].address}
                    onChange={event => handleAddressOnChange(wallet, event)}
                    name='address'
                  />
                  <span
                    className={`wallet-address-span ${
                      new RegExp(getNetworkRegex(wallet)).test(wallets[wallet].address) ? 'valid' : 'invalid'
                    }`}
                  >
                    Enter valid {wallet} address
                  </span>
                </div>
                <div className='wallet-private-key'>
                  <Input
                    type='text'
                    placeholder='Private Key'
                    value={wallets[wallet].secret}
                    onChange={event => handleSecretOnChange(wallet, event)}
                    name='privateKey'
                    wrapperClassName='wallet-input-wrapper'
                  />
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
