import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

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

import Emitter from '../../../utils/emitter';

import { generateConfig } from '../../../utils/generateConfig';
import { getConfigPath } from '../../../utils/resolvePath';

import ScrollToTop from '../../../images/scroll-to-top.svg';
import DownArrow from '../../../images/down-arrow.svg';

import Collapsible from 'react-collapsible';

import './style.scss';

const Questions = () => {
  const [writeConfig, setWriteConfig] = useState({});
  const [readConfig, setReadConfig] = useState({});
  const [isButlerStarted, setIsButlerStarted] = useState(false);
  const [isScrollToTopVisible, setIsScrollToTopVisible] = useState(false);
  const appWrapperRef = useRef();
  const collapseRef = useRef();

  const history = useHistory();

  new Emitter().on('startButler', () => {
    setIsButlerStarted(true);
  });

  const getState = state => {
    setWriteConfig(prevState => ({
      ...prevState,
      ...state,
    }));
  };

  useEffect(() => {
    const { ipcRenderer } = window.require('electron');

    ipcRenderer.on('butlerHasBeenKilled', (message, pathname) => {
      history.push(pathname);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Write the config when butler button is pressed and config is not empty object
  useEffect(() => {
    if (history.location.pathname === '/' && isButlerStarted && Object.keys(writeConfig).length) {
      const config = generateConfig(writeConfig);

      const configFile = getConfigPath();
      window.require('fs').writeFile(configFile, JSON.stringify(config), err => {
        if (err) {
          console.log('Error creating config');
        }
      });

      setIsButlerStarted(false);

      const electron = require('electron');

      electron.ipcRenderer.send('start-butler', JSON.stringify(config));

      history.push('/terminal');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [writeConfig, isButlerStarted]);

  // Read from the config when app is started
  useEffect(() => {
    try {
      const configFile = getConfigPath();
      const file = window.require('fs').readFileSync(configFile, '');
      setReadConfig(JSON.parse(file || {}));
    } catch (error) {
      console.log(error);
    }
  }, []);

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
        ref={collapseRef}
        trigger={
          <div className='advanced-options-wrapper'>
            <span>Advanced options</span>
            <img src={DownArrow} alt='advanced-options' />
          </div>
        }
        className='collapsible-style'
        triggerOpenedClassName='collapsible-style-opened'
        onOpen={() => {
          setTimeout(() => {
            appWrapperRef.current.scrollTo({
              left: 0,
              top: appWrapperRef.current.scrollHeight,
              behavior: 'smooth',
            });
          }, 100);
        }}
      >
        <Database selectedDatabase={readConfig.DATABASE} isButlerStarted={isButlerStarted} getState={getState} />
        <ServerOptions
          selectedAggregatorURL={readConfig.AGGREGATOR_URL}
          selectedPort={readConfig.SERVER && readConfig.SERVER.PORT}
          isButlerStarted={isButlerStarted}
          getState={getState}
        />
      </Collapsible>
      {isScrollToTopVisible && (
        <img className='scroll-to-top-img' alt='scroll-to-top' onClick={scrollToTop} src={ScrollToTop}></img>
      )}
    </div>
  );
};

export default Questions;
