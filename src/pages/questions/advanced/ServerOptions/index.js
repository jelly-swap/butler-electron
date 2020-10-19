import React from 'react';

import AdvancedInput from './ProviderUrl';
import QuestionTitle from '../../../../components/common/QuestionTitle';

import { useButlerConfig } from '../../../../context/ConfigContext';

import './style.scss';

export default ({ bottomRef }) => {
  const [config, updateConfig] = useButlerConfig();

  return (
    <div className='server-options-wrapper'>
      <QuestionTitle isValid={true} title='Server options' />
      <div className='server-options'>
        <AdvancedInput
          value={config.SERVER.PORT}
          handler={e => updateConfig({ SERVER: { PORT: e.target.value } })}
          name='Port'
        />

        <AdvancedInput
          value={config.AGGREGATOR_URL}
          handler={e => updateConfig({ AGGREGATOR_URL: e.target.value })}
          name={'Jelly Aggregator'}
        />

        <AdvancedInput
          value={config.TRACKER_URL}
          handler={e => updateConfig({ TRACKER_URL: e.target.value })}
          name={'Jelly Tracker'}
        />

        <AdvancedInput
          bottomRef={bottomRef}
          id='bottom'
          value={config.JELLY_PRICE_PROVIDER}
          handler={e => updateConfig({ JELLY_PRICE_PROVIDER: e.target.value })}
          name={'Jelly Price Provider'}
        />
      </div>
    </div>
  );
};
