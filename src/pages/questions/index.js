import React from 'react';

import BasicOptions from './basic';
import AdvancedOptions from './advanced';

import PageWrapper from '../../components/common/PageWrapper';
import ContentWrapper from '../../components/common/ContentWrapper';
import Header from '../../components/common/Header';
import Button from '../../components/common/Button';
import CoinImage from '../../css/background-coins/Coins-button.svg';
import Footer from '../../components/common/Footer';

import './style.scss';
import { sendFromRenderer } from '../../utils/electronAPI';
import { BUTLER_EVENTS } from '../../constants';
import { useButlerConfig } from '../../context/ConfigContext';

export default () => {
  const [config] = useButlerConfig();

  const handleOnClick = () => {
    sendFromRenderer(BUTLER_EVENTS.START, config);
  };

  return (
    <PageWrapper>
      <Header></Header>
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

      <div></div>
    </PageWrapper>
  );
};
