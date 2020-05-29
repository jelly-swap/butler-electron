import React, { useState, useEffect } from 'react';

import QuestionTitle from '../../../../common/QuestionTitle';
import Port from './Port';
import AggregatorURL from './AggregatorURL';

import { useGetStateFromCP } from '../../../../../hooks/useGetStateFromCP';

import './style.scss';

const ServerOptions = ({ selectedAggregatorURL, selectedPort, isButlerStarted, getState }) => {
  const [serverOptions, setServerOptions] = useState({
    port: '9000',
    aggregatorUrl: 'https://network.jelly.market/api/v1/info',
  });

  useGetStateFromCP(isButlerStarted, getState, { SERVER_OPTIONS: serverOptions });

  useEffect(() => {
    if (selectedAggregatorURL) {
      setServerOptions(s => ({
        ...s,
        aggregatorUrl: selectedAggregatorURL,
      }));
    }

    if (selectedPort) {
      setServerOptions(s => ({
        ...s,
        port: selectedPort,
      }));
    }
  }, [selectedAggregatorURL, selectedPort]);

  const getPort = port => {
    setServerOptions({
      ...serverOptions,
      port,
    });
  };

  const getAggregatorUrl = aggregatorUrl => {
    setServerOptions({
      ...serverOptions,
      aggregatorUrl,
    });
  };

  return (
    <div className='server-options-wrapper'>
      <QuestionTitle isValid={true} title='Server options' />
      <div className='server-options'>
        <Port port={serverOptions.port} getPort={getPort} />
        <AggregatorURL aggregatorUrl={serverOptions.aggregatorUrl} getAggregatorUrl={getAggregatorUrl} />
      </div>
    </div>
  );
};

export default ServerOptions;
