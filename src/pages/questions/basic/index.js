import React from 'react';

import ButlerName from './ButlerName';
import TradingPairs from './TradingPairs';
import WalletsSetup from './Wallets';
import PriceProvider from './PriceProvider';
import Rebalance from './Rebalance';
import Notifications from './Notifications';
import BlockchainProvider from './BlockchainProvider';

export default () => {
  return (
    <>
      <ButlerName />
      <TradingPairs />
      <WalletsSetup />
      <BlockchainProvider />
      <PriceProvider />
      <Rebalance />
      <Notifications />
    </>
  );
};
