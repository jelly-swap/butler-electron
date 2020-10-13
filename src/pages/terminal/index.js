import React, { useEffect, useRef } from 'react';

import Message from './Message';

import { useLogger } from '../../context/LoggerContext';

import './style.scss';
import PageWrapper from '../../components/common/PageWrapper';
import ContentWrapper from '../../components/common/ContentWrapper';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import EmptyPage from '../../components/common/EmptyPage';
import StopButton from '../../components/StopButton';
import { useApp } from '../../context/AppContext';

export default () => {
  const [loggerData] = useLogger();
  const [app] = useApp();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (loggerData.length > 0 && messagesEndRef.current) {
      scrollToBottom();
    }
  }, [loggerData]);

  return (
    <PageWrapper>
      <Header displayNav={true} />
      <ContentWrapper>
        {!loggerData.length || !app.serverStarted ? (
          <EmptyPage />
        ) : (
          <div className='logs-wrapper'>
            {loggerData.map(log => (
              <Message key={log.id} level={log.level} message={log.msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </ContentWrapper>
      <Footer>{app.serverStarted && <StopButton />}</Footer>
    </PageWrapper>
  );
};
