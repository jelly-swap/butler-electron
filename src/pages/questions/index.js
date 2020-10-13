import React from 'react';

import BasicOptions from './basic';
import AdvancedOptions from './advanced';

import StopButton from '../../components/StopButton';
import StartButton from '../../components/StartButton';
import PageWrapper from '../../components/common/PageWrapper';
import ContentWrapper from '../../components/common/ContentWrapper';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

import { useApp } from '../../context/AppContext';

import './style.scss';

export default () => {
  const [app] = useApp();

  return (
    <PageWrapper>
      <Header displayNav={true} />
      <ContentWrapper className='content-wrapper'>
        <BasicOptions />
        <AdvancedOptions />
      </ContentWrapper>
      <Footer>{!app.serverStarted ? <StartButton /> : <StopButton />}</Footer>
    </PageWrapper>
  );
};
