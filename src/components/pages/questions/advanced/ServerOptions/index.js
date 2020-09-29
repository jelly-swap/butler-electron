import React, { useState, useEffect } from 'react';

import QuestionTitle from '../../../../common/QuestionTitle';
import Port from './Port';
import ProviderUrl from './ProviderUrl';

import { useGetStateFromCP } from '../../../../../hooks/useGetStateFromCP';

import './style.scss';
import { CONFIG_VERSION } from '../../../../../constants';

const ServerOptions = ({
  version,
  selectedAggregatorURL,
  selectedPort,
  selectedTrackerUrl,
  selectedJellyPriceUrl,
  isButlerStarted,
  getState,
}) => {
  if (version !== CONFIG_VERSION) {
    selectedPort = '9000';
    selectedAggregatorURL = 'https://network.weidex.market/api/v1/info';
    selectedTrackerUrl = 'tracker.weidex.market';
  }

  const [serverOptions, setServerOptions] = useState({
    port: '',
    aggregatorUrl: '',
    trackerUrl: '',
    jellyPriceProvider: '',
  });

  useGetStateFromCP(isButlerStarted, getState, { VERSION: CONFIG_VERSION });
  useGetStateFromCP(isButlerStarted, getState, { SERVER_OPTIONS: serverOptions });

  useEffect(() => {
    if (selectedAggregatorURL) {
      setServerOptions(s => ({ ...s, aggregatorUrl: selectedAggregatorURL }));
    }

    if (selectedPort) {
      setServerOptions(s => ({ ...s, port: selectedPort }));
    }

    if (selectedTrackerUrl) {
      setServerOptions(s => ({ ...s, trackerUrl: selectedTrackerUrl }));
    }

    if (selectedJellyPriceUrl) {
      setServerOptions(s => ({ ...s, jellyPriceProvider: selectedJellyPriceUrl }));
    }
  }, [selectedAggregatorURL, selectedPort, selectedTrackerUrl, selectedJellyPriceUrl]);

  const getPort = port => setServerOptions({ ...serverOptions, port });

  const getAggregatorUrl = aggregatorUrl => setServerOptions({ ...serverOptions, aggregatorUrl });

  const getTrackerUrl = trackerUrl => setServerOptions({ ...serverOptions, trackerUrl });

  const getJellyPriceProvider = jellyPriceProvider => setServerOptions({ ...serverOptions, jellyPriceProvider });

  return (
    <div className='server-options-wrapper'>
      <QuestionTitle isValid={true} title='Server options' />
      <div className='server-options'>
        <Port port={serverOptions.port} getPort={getPort} />

        <ProviderUrl url={serverOptions.aggregatorUrl} getUrl={getAggregatorUrl} name={'Jelly Aggregator'} />

        <ProviderUrl url={serverOptions.trackerUrl} getUrl={getTrackerUrl} name={'Jelly Tracker'} />

        <ProviderUrl
          url={serverOptions.jellyPriceProvider}
          getUrl={getJellyPriceProvider}
          name={'Jelly Price Provider'}
        />
      </div>
    </div>
  );
};

export default ServerOptions;
