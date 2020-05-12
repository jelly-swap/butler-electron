import React from 'react';

import Input from '../../../../../common/Input';

const AggregatorURL = ({ aggregatorUrl, getAggregatorUrl }) => {
  const handleAggregatorUrlOnChange = event => {
    event.persist();

    const {
      target: { value },
    } = event;

    getAggregatorUrl(value);
  };

  return (
    <div className='aggregator-url-wrapper'>
      <span>Aggregator URL</span>
      <Input
        type='text'
        placeholder='www.aggregatorurl.com'
        value={aggregatorUrl}
        onChange={handleAggregatorUrlOnChange}
      />
    </div>
  );
};

export default AggregatorURL;
