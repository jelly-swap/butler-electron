import React, { useState, useEffect, useRef } from 'react';

// Basic
import ButlerName from './basic/ButlerName';
import TradingPairs from './basic/TradingPairs';
import WalletsSetup from './basic/Wallets';
import PriceProvider from './basic/PriceProvider';
import Rebalance from './basic/Rebalance';
import Notifications from './basic/Notifications';

// Advanced
import Database from './advanced/Database';
import ServerOptions from './advanced/ServerOptions';

import Emitter from '../../utils/emitter';

import { generateConfig } from '../../utils/generateConfig';

import ScrollToTop from '../../images/scroll-to-top.svg';

import Collapsible from 'react-collapsible';

import './style.scss';

const Questions = () => {
  const [writeConfig, setWriteConfig] = useState({});
  const [readConfig, setReadConfig] = useState({});
  const [isButlerStarted, setIsButlerStarted] = useState(false);
  const [isScrollToTopVisible, setIsScrollToTopVisible] = useState(false);
  const appWrapperRef = useRef();

  new Emitter().on('startButler', () => {
    setIsButlerStarted(true);
  });

  const getState = state => {
    setWriteConfig(prevState => ({
      ...prevState,
      ...state,
    }));
  };

  // Write the config when butler button is pressed and config is not empty object
  useEffect(() => {
    if (isButlerStarted && Object.keys(writeConfig).length) {
      const config = generateConfig(writeConfig);

      window.require('fs').writeFile('config.json', JSON.stringify(config), err => {
        if (err) {
          console.log('Error creating config');
        }

        // Fire the server
      });

      setIsButlerStarted(false);
    }
  }, [writeConfig, isButlerStarted]);

  // Read from the config when app is started
  useEffect(() => {
    try {
      const file = window.require('fs').readFileSync('config.json', '');
      setReadConfig(JSON.parse(file));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    console.log('read config', readConfig);
  }, [readConfig]);

  const handleOnScroll = () => {
    appWrapperRef.current.scrollTop > 100 ? setIsScrollToTopVisible(true) : setIsScrollToTopVisible(false);
  };

  const scrollToTop = () => {
    appWrapperRef.current.scrollTop = 0;
  };

  return (
    <div ref={appWrapperRef} className='app-wrapper' onScroll={handleOnScroll}>
      <div>
        <ButlerName selectedName={readConfig.NAME} isButlerStarted={isButlerStarted} getState={getState} />
        <TradingPairs selectedPairs={readConfig.PAIRS} isButlerStarted={isButlerStarted} getState={getState} />
        <WalletsSetup selectedWallets={readConfig.WALLETS} isButlerStarted={isButlerStarted} getState={getState} />
        <PriceProvider selectedPriceProvider={readConfig.PRICE} isButlerStarted={isButlerStarted} getState={getState} />
        <Rebalance selectedRebalance={readConfig.EXCHANGE} isButlerStarted={isButlerStarted} getState={getState} />
        <Notifications
          selectedNotifications={readConfig.NOTIFICATIONS}
          isButlerStarted={isButlerStarted}
          getState={getState}
        />
      </div>
      <Collapsible
        trigger='Advanced options'
        className='collapsible-style'
        triggerOpenedClassName='collapsible-style-opened'
      >
        <Database selectedDatabase={readConfig.DATABASE} isButlerStarted={isButlerStarted} getState={getState} />
        <ServerOptions
          selectedAggregatorURL={readConfig.AGGREGATOR_URL}
          selectedPort={readConfig.SERVER && readConfig.SERVER.PORT}
          isButlerStarted={isButlerStarted}
          getState={getState}
        />
      </Collapsible>
      {isScrollToTopVisible && <img className='scroll-to-top-img' onClick={scrollToTop} src={ScrollToTop}></img>}
    </div>
  );
};

export default Questions;
