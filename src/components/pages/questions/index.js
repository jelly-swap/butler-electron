import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Collapsible from 'react-collapsible';

// Basic
import ButlerName from './basic/ButlerName';
import TradingPairs from './basic/TradingPairs';
import WalletsSetup from './basic/Wallets';
import PriceProvider from './basic/PriceProvider';
import Rebalance from './basic/Rebalance';
import Notifications from './basic/Notifications';
import BlockchainProvider from './basic/BlockchainProvider';

// Advanced
import Database from './advanced/Database';
import ServerOptions from './advanced/ServerOptions';

// Context
import { useUpdateServerPort } from '../../../context/ServerPortContext';

import Button from '../../common/Button';
import Emitter from '../../../utils/emitter';
import DownArrow from '../../../images/down-arrow.svg';

import { readCFGFromFS, writeCFGOnFS } from '../../../utils/accessConfigOnFS';

import './style.scss';

import { Password } from './Password/Password';

const { ipcRenderer } = window.require('electron');

let [enteredPassword, isAppOpenForFirstTime] = ['', true];

const Questions = () => {
  const [writeConfig, setWriteConfig] = useState({});
  const [readConfig, setReadConfig] = useState({});
  const [validatedConfig, setValidatedConfig] = useState({});
  const [isButlerStarted, setIsButlerStarted] = useState(false);
  const [isScrollToTopVisible, setIsScrollToTopVisible] = useState(false);
  const [shouldCloseModal, setShouldCloseModal] = useState(false);
  const appWrapperRef = useRef();
  const collapseRef = useRef();

  const history = useHistory();

  const updateServerPort = useUpdateServerPort();

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
    ipcRenderer.on('butlerHasBeenKilled', (__message, pathname) => {
      history.push(pathname);
    });

    const getConfig = async () => {
      if (!isAppOpenForFirstTime) {
        const config = await readCFGFromFS(enteredPassword);

        setReadConfig(config);
      }
    };

    getConfig();

    return () => {
      isAppOpenForFirstTime = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // SAVE CFG

  useEffect(() => {
    if (isButlerStarted && history.location.pathname === '/' && Object.keys(writeConfig).length) {
      setIsButlerStarted(false);

      const saveConfig = async () => {
        const { validatedConfig, allQuestionsAreValid, serverPort } = await writeCFGOnFS(writeConfig, enteredPassword);

        if (!allQuestionsAreValid) {
          return;
        }

        updateServerPort(serverPort);
        setValidatedConfig(validatedConfig);

        history.push('/terminal');
      };

      saveConfig();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [writeConfig]);

  const handleOnScroll = () => {
    appWrapperRef.current.scrollTop > 100 ? setIsScrollToTopVisible(true) : setIsScrollToTopVisible(false);
  };

  const scrollToTop = () => {
    appWrapperRef.current.scrollTop = 0;
  };

  const submitModal = async password => {
    const config = await readCFGFromFS(password);

    if (!Object.keys(config).length) {
      setShouldCloseModal(true);
    }

    setReadConfig(config);

    enteredPassword = password;
  };

  return (
    <>
      <Password submitModal={submitModal} shouldCloseModal={shouldCloseModal} />
      <div ref={appWrapperRef} className='app-wrapper' onScroll={handleOnScroll}>
        <div className='questions-wrapper'>
          <ButlerName
            valid={validatedConfig.NAME}
            selectedName={readConfig.NAME}
            isButlerStarted={isButlerStarted}
            getState={getState}
          />
          <TradingPairs
            valid={validatedConfig.PAIRS}
            selectedPairs={readConfig.PAIRS}
            isButlerStarted={isButlerStarted}
            getState={getState}
          />
          <WalletsSetup
            valid={validatedConfig.WALLETS}
            selectedWallets={readConfig.WALLETS}
            isButlerStarted={isButlerStarted}
            getState={getState}
          />
          <BlockchainProvider
            valid={validatedConfig.BLOCKCHAIN_PROVIDER}
            selectedBlockchainProviders={readConfig.BLOCKCHAIN_PROVIDER}
            isButlerStarted={isButlerStarted}
            getState={getState}
          />
          <PriceProvider
            valid={validatedConfig.PRICE}
            selectedPriceProvider={readConfig.PRICE}
            isButlerStarted={isButlerStarted}
            getState={getState}
          />
          <Rebalance
            valid={validatedConfig.REBALANCE}
            selectedRebalance={readConfig.EXCHANGE}
            isButlerStarted={isButlerStarted}
            getState={getState}
          />
          <Notifications
            valid={validatedConfig.NOTIFICATIONS}
            selectedNotifications={readConfig.NOTIFICATIONS}
            isButlerStarted={isButlerStarted}
            getState={getState}
          />

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
            <div className='scroll-to-top-img-wrapper'>
              <Button onClick={scrollToTop} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Questions;
