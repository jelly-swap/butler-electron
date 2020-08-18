import React, { useState, useEffect } from 'react';

import QuestionTitle from '../../../../common/QuestionTitle';
import Port from './Port';
import AggregatorURL from './AggregatorURL';
import TrackerURL from './TrackerURL';

import { useGetStateFromCP } from '../../../../../hooks/useGetStateFromCP';

import './style.scss';

const ServerOptions = ({ selectedAggregatorURL, selectedPort, selectedTrackerUrl, isButlerStarted, getState }) => {
  const [serverOptions, setServerOptions] = useState({
    port: '',
    aggregatorUrl: '',
    trackerUrl: '',
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

    if (selectedTrackerUrl) {
      setServerOptions(s => ({
        ...s,
        trackerUrl: selectedTrackerUrl,
      }));
    }
  }, [selectedAggregatorURL, selectedPort, selectedTrackerUrl]);

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

  const getTrackerUrl = trackerUrl => {
    setServerOptions({
      ...serverOptions,
      trackerUrl,
    });
  };

  return (
    <div className='server-options-wrapper'>
      <QuestionTitle isValid={true} title='Server options' />
      <div className='server-options'>
        <Port port={serverOptions.port} getPort={getPort} />
        <AggregatorURL aggregatorUrl={serverOptions.aggregatorUrl} getAggregatorUrl={getAggregatorUrl} />
        <TrackerURL trackerUrl={serverOptions.trackerUrl} getTrackerUrl={getTrackerUrl} />
      </div>
    </div>
  );
};

export default ServerOptions;
