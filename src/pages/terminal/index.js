import React, { useEffect, useRef } from 'react';

import Message from './Message';

import { useLogger } from '../../context/LoggerContext';

import './style.scss';
import PageWrapper from '../../components/common/PageWrapper';
import ContentWrapper from '../../components/common/ContentWrapper';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

export default () => {
  const [loggerData] = useLogger();

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [loggerData]);

  return (
    <PageWrapper>
      <Header displayNav={true} />
      <ContentWrapper>
        <div className='logs-wrapper'>
          {loggerData.map(log => (
            <Message key={log.id} level={log.level} message={log.msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ContentWrapper>
      <Footer />
    </PageWrapper>
  );
};
